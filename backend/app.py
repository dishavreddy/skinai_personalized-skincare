import math
import cv2
import numpy as np
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        'hydration': clamp(brightness * .58 + (100 - saturation) * .18 + 25),
        'glow': clamp(brightness * .70 + (100 - min(100, brightness_std * 2)) * .30),
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
    routine = {'AM':['Gentle gel cleanser','Vitamin C or antioxidant serum','Lightweight moisturizer','Broad-spectrum SPF 30+'], 'PM':['Gentle cleanser','Niacinamide serum','Hyaluronic acid serum','Ceramide moisturizer']}
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

if __name__ == '__main__': app.run(host='0.0.0.0', port=5000, debug=True)
