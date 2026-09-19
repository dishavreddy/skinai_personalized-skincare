import os
import cv2
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Lock CORS to explicit origins. Set ALLOWED_ORIGINS as a comma-separated env var
# in production (e.g. "https://your-app.vercel.app"). Falls back to localhost for dev.
_origins = [o.strip() for o in os.environ.get('ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:5174,http://localhost:4173').split(',') if o.strip()]
CORS(app, origins=_origins)

def clamp(value): return int(max(0, min(100, round(float(value)))))

def read_image(upload):
    raw = np.frombuffer(upload.read(), np.uint8)
    image = cv2.imdecode(raw, cv2.IMREAD_COLOR)
    if image is None: raise ValueError('Please upload a valid JPG, PNG, or WEBP image.')
    if image.shape[0] < 80 or image.shape[1] < 80: raise ValueError('Please upload an image at least 80 pixels wide and high.')
    return cv2.resize(image, (min(900, image.shape[1]), int(image.shape[0] * min(900, image.shape[1]) / image.shape[1])))

def face_region(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = cascade.detectMultiScale(gray, 1.1, 5, minSize=(80, 80))
    if len(faces):
        x, y, w, h = max(faces, key=lambda r: r[2] * r[3])
        return image[y:y+h, x:x+w]
    h, w = image.shape[:2]
    return image[int(h*.12):int(h*.88), int(w*.18):int(w*.82)]

def build_routine(scores):
    """Build a personalized AM/PM routine based on the user's actual scores."""
    s = scores

    # ── AM routine ──────────────────────────────────────────────────────────
    am = []

    # Cleanser: foaming/gel for oily skin, gentle cream for dry/sensitive
    if s['oiliness'] < 50:
        am.append('Foaming or salicylic acid cleanser (BHA — targets excess oil)')
    elif s['acne'] < 60:
        am.append('Gentle salicylic acid cleanser (BHA — calms active breakouts)')
    else:
        am.append('Gentle gel or cream cleanser')

    # Treatment serum: Vitamin C for glow/tone; niacinamide for oiliness/redness
    if s['glow'] < 70 or s['tone_evenness'] < 65:
        am.append('Vitamin C serum 10–15% (brightening + antioxidant protection)')
    if s['oiliness'] < 55 or s['redness'] < 65:
        am.append('Niacinamide serum 5–10% (pore tightening + redness reduction)')

    # Eye cream: only if dark circles are a concern
    if s['dark_circles'] < 60:
        am.append('Caffeine eye cream (reduces under-eye puffiness and discoloration)')

    # Moisturiser: gel for oily, rich cream for dry
    if s['oiliness'] < 50:
        am.append('Oil-free gel moisturizer (lightweight, non-comedogenic)')
    elif s['hydration'] < 60:
        am.append('Hyaluronic acid moisturizer (replenishes moisture barrier)')
    else:
        am.append('Lightweight hydrating moisturizer')

    # SPF — always
    am.append('Broad-spectrum SPF 30+ sunscreen (non-negotiable daily step)')

    # ── PM routine ──────────────────────────────────────────────────────────
    pm = []

    # Double cleanse if oily / heavy sunscreen use
    if s['oiliness'] < 55:
        pm.append('Oil cleanser or micellar water (first cleanse — dissolves sunscreen)')
    pm.append('Gentle cream or gel cleanser (second cleanse)')

    # Exfoliant: AHA for texture/tone, BHA for acne/oiliness — not both on same night
    if s['acne'] < 65 or s['oiliness'] < 55:
        pm.append('BHA (salicylic acid 1–2%) exfoliant — 2–3×/week, not every night')
    elif s['texture'] < 65 or s['smoothness'] < 65:
        pm.append('AHA (glycolic or lactic acid) exfoliant — 2–3×/week, not every night')

    # Targeted treatments
    if s['redness'] < 65 or s['acne'] < 65:
        pm.append('Niacinamide or azelaic acid serum (calms redness + post-acne marks)')
    if s['hydration'] < 65:
        pm.append('Hyaluronic acid serum (apply to damp skin for best absorption)')
    if s['dark_circles'] < 60:
        pm.append('Retinol eye cream — start 0.025%, 2×/week (builds collagen over time)')

    # Moisturiser: barrier repair at night
    if s['smoothness'] < 65 or s['hydration'] < 60:
        pm.append('Ceramide-rich repair cream (restores skin barrier overnight)')
    else:
        pm.append('Ceramide or peptide night moisturizer')

    # Occlusive if very dry
    if s['hydration'] < 50:
        pm.append('Thin layer of petroleum jelly or squalane as final occlusive (slugging)')

    return {'AM': am, 'PM': pm}

def analyze(image):
    roi = face_region(image)
    hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(roi, cv2.COLOR_BGR2LAB)
    gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    height, width = gray.shape
    brightness = float(lab[:,:,0].mean()) / 255 * 100
    saturation = float(hsv[:,:,1].mean()) / 255 * 100
    texture = min(100, cv2.Laplacian(gray, cv2.CV_64F).var() / 6)
    brightness_std = gray.std()
    red = roi[:,:,2].astype(np.float32); green = roi[:,:,1].astype(np.float32); blue = roi[:,:,0].astype(np.float32)
    redness = np.maximum(0, red - (green + blue) / 2)
    red_spots = float((redness > 24).mean() * 100)
    highlights = float(((hsv[:,:,2] > 220) & (hsv[:,:,1] < 75)).mean() * 100)
    # The upper middle face has most reliable under-eye signal when a face is detected;
    # fallback crop keeps the method image-derived for images without a detected face.
    eye_band = gray[int(height*.32):int(height*.58), int(width*.15):int(width*.85)]
    dark_delta = max(0, gray.mean() - eye_band.mean())
    scores = {
        'acne': clamp(100 - (red_spots * 2.4 + texture * .28)),
        'redness': clamp(100 - red_spots * 2.7),
        'hydration': clamp(brightness * .58 + (100 - saturation) * .18 + 25),
        'glow': clamp(brightness * .70 + (100 - min(100, brightness_std * 2)) * .30),
        'tone_evenness': clamp(100 - min(100, brightness_std * 1.8 + red_spots * .22)),
        'texture': clamp(100 - texture * .72),
        'dark_circles': clamp(100 - dark_delta * 2.5),
        'oiliness': clamp(100 - highlights * 2.1 - saturation * .12 + 20),
        'smoothness': clamp(100 - texture * .62 - red_spots * .18)
    }
    overall = clamp(np.mean(list(scores.values())))
    insights = []
    insights.append(f"Hydration visual signal is {scores['hydration']}/100; use a gentle humectant-focused routine." if scores['hydration'] < 65 else f"Hydration visual signal is {scores['hydration']}/100; maintain your barrier-supporting routine.")
    insights.append(f"Glow score is {scores['glow']}/100; daily sunscreen and antioxidant support may help." if scores['glow'] < 75 else f"Glow score is {scores['glow']}/100; your image has consistent brightness and tone.")
    insights.append(f"Texture/smoothness signals are {scores['texture']}/{scores['smoothness']}; introduce exfoliating actives slowly if desired.")
    routine = build_routine(scores)
    recommendations = [
      {'name':'Hydra Boost Serum','reason':'hydration support','match':clamp(100 - abs(scores['hydration'] - 55))},
      {'name':'Glow Renewal Vitamin C','reason':'brightness support','match':clamp(100 - abs(scores['glow'] - 72))},
      {'name':'Calm Niacinamide 10%','reason':'oil and redness support','match':clamp(100 - abs(scores['oiliness'] - 65))},
      {'name':'Ceramide Night Cream','reason':'barrier support','match':clamp(100 - abs(scores['smoothness'] - 72))}
    ]
    return {'scores':scores, 'overall_score':overall, 'insights':insights, 'routine':routine, 'recommendations':recommendations}

@app.get('/health')
def health(): return {'status':'ok'}

@app.post('/analyze')
def endpoint():
    if 'image' not in request.files: return jsonify(error='An image field is required.'), 400
    try:
        result = analyze(read_image(request.files['image']))
        if 'baseline' in request.files and request.files['baseline'].filename:
            baseline = analyze(read_image(request.files['baseline']))
            changes = {k: result['scores'][k] - baseline['scores'][k] for k in result['scores']}
            result['comparison'] = {'overall_change':result['overall_score'] - baseline['overall_score'], 'metric_changes':changes}
        return jsonify(result)
    except ValueError as error: return jsonify(error=str(error)), 400
    except Exception as error:
        app.logger.exception('Analysis failed')
        return jsonify(error='Unable to analyze this image.'), 500

if __name__ == '__main__': app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
