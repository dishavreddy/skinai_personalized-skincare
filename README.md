
# SkinAI — AI-Powered Personalized Skincare Analysis
<img width="1900" height="923" alt="image" src="https://github.com/user-attachments/assets/014eb7f2-4088-44a1-bc0a-0b4b1a3f6b64" />

A Vite + React skincare analysis demo with a Flask/OpenCV API. The analysis is derived from uploaded image pixels (brightness, color balance, red-spot signal, highlight signal, contrast, and Laplacian texture); it is informative only and not medical advice.

SkinAI analyzes a user's selfie and returns image-derived skincare insights — hydration, glow, acne, redness, tone evenness, texture, dark circles, oiliness, and smoothness — then builds a personalized routine and product recommendations around the results. Includes account login, saved scan history, and before/after comparison.

> **Disclaimer:** This is a portfolio/demo project. All scores are derived purely from uploaded image pixel data (brightness, saturation, red-channel/redness signal, highlight/specular signal, contrast, and Laplacian texture variance) using OpenCV — it is **informational only, not medical advice**, and is not a substitute for a dermatologist.

---

## ✨ Features

- 📸 Upload or capture a selfie (camera + file picker) for analysis
- ⚡ Fast image-based scan across 9 skin metrics, returned in one API call
- 🧑‍⚕️ Face-region detection via OpenCV Haar cascade (falls back to a center-face crop if no face is detected)
- 🔁 Optional baseline-image comparison to see score changes over time
- 🧴 Personalized AM/PM routine and product recommendations matched to your scores
- 🔐 Account login with per-user scan history and recommendations pages
- 📊 Results dashboard, history view, and recommendations view

---

## 🧠 How the Analysis Works

Rather than a trained classifier, the Flask backend derives skin metrics directly from image pixels with OpenCV:

1. The image is decoded, size-validated, and resized (max 900px wide).
2. A face region is detected with a Haar cascade classifier; if no face is found, a centered crop is used instead so the method stays fully image-derived either way.
3. From that region, the backend computes:

   | Signal | What it measures |
   |---|---|
   | Brightness (LAB L-channel) | Overall exposure/lightness of skin |
   | Saturation (HSV) | Color intensity, used in hydration/oiliness scoring |
   | Laplacian texture variance | Edge/frequency detail → texture & smoothness |
   | Redness | Red channel minus avg(green, blue) → acne/redness proxy |
   | Highlights | Bright, low-saturation pixels → oiliness proxy |
   | Under-eye brightness delta | Eye-band vs. overall brightness → dark circle proxy |

4. These combine into 9 scores (`acne`, `redness`, `hydration`, `glow`, `tone_evenness`, `texture`, `dark_circles`, `oiliness`, `smoothness`), an overall score, plain-language insights, an AM/PM routine, and matched product recommendations.
5. If a baseline image is also submitted, the API returns a metric-by-metric score delta.

---

## 🏗️ Tech Stack

**Frontend**
- React + Vite, React Router
- Deployed on **Vercel** (SPA rewrite configured in `vercel.json`)

**Backend**
- Python + Flask, Flask-CORS
- OpenCV (`opencv-python-headless`) + NumPy for image analysis
- Gunicorn for production serving
- Deployed on **Render**

---

## 📁 Project Structure

```
skinai_personalized-skincare/
├── backend/
│   ├── app.py                     # Flask API: /health, /analyze
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Hero.jsx / Features.jsx / HowItWorks.jsx
│   │   ├── Testimonials.jsx / Pricing.jsx / Footer.jsx
│   │   ├── DashboardSection.jsx / BeforeAfter.jsx
│   │   ├── AuthModal.jsx          # Login / sign-up modal
│   │   └── PhotoModal.jsx         # Camera capture + file upload modal
│   ├── context/
│   │   ├── AuthContext.jsx        # Demo auth + per-user scan history (localStorage)
│   │   └── ScanContext.jsx        # Current scan/analysis state
│   ├── pages/
│   │   ├── Home.jsx / ScanPage.jsx / ResultsPage.jsx
│   │   ├── HistoryPage.jsx / RecommendationsPage.jsx
│   ├── App.jsx / main.jsx / styles.css / account.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---
## 📸 Screenshots

### Landing Page
![SkinAI Home]<img width="1900" height="923" alt="image" src="https://github.com/user-attachments/assets/014eb7f2-4088-44a1-bc0a-0b4b1a3f6b64" />
##Login
<img width="1917" height="925" alt="image" src="https://github.com/user-attachments/assets/9578ca36-8221-40f2-a9cb-68b19b5091b1" />

<img width="1916" height="923" alt="image" src="https://github.com/user-attachments/assets/045b2894-61db-46a6-bec7-55b60ab11b0a" />
<img width="1917" height="858" alt="image" src="https://github.com/user-attachments/assets/364bd8e7-d4cd-460d-89c2-70818c5f0119" />
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/145955e6-6651-4b10-a92d-a7176ddee98c" />
<img width="1917" height="868" alt="image" src="https://github.com/user-attachments/assets/1dd2833c-6686-4441-b0e8-4f4a21c17ce0" />

### Scan Flow
![Photo capture/upload modal]<img width="1916" height="918" alt="image" src="https://github.com/user-attachments/assets/d26ebe1e-e943-483e-b5bb-266bc12c4b3c" />
<img width="1896" height="922" alt="image" src="https://github.com/user-attachments/assets/e7eb106f-f19a-4c5f-8f00-a8168f6be62f" />
<img width="1902" height="922" alt="image" src="https://github.com/user-attachments/assets/627a0b25-2f00-4f42-a07b-07792f761d13" />
Compare two Scans
<img width="1917" height="861" alt="image" src="https://github.com/user-attachments/assets/90a6d03b-3e52-4329-8649-1189607ff3e9" />


### Results Dashboard
![Skin analysis results]
<img width="1916" height="920" alt="image" src="https://github.com/user-attachments/assets/95bc5e94-e41c-4a1a-9183-b55e4ded78c2" />
<img width="1917" height="925" alt="image" src="https://github.com/user-attachments/assets/6a552ce0-6855-43ce-ac51-2ecbf4e4160e" />
Compare two scans
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/bb7a0876-483a-4a8b-96b5-4c1bdddbd945" />




### Scan History
![Saved scan history]<img width="1915" height="917" alt="image" src="https://github.com/user-attachments/assets/618210a6-6da8-4b76-a1da-14360c8b0e10" />
Scan Recommendations
<img width="1913" height="922" alt="image" src="https://github.com/user-attachments/assets/7e617640-5ba8-4cbe-9c83-a7820bd6c8dd" />



## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.9+

### 1. Clone the repo
```bash
git clone https://github.com/dishavreddy/skinai_personalized-skincare.git
cd skinai_personalized-skincare
```

### 2. Frontend
```bash
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### 3. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
Runs at `http://localhost:5000` by default (or `$PORT` if set).

### 4. Environment variables
**Frontend** — point the app at your backend, e.g. `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```
**Backend** — no required env vars beyond `PORT` (used by Render); add any you introduce later (e.g. a real database URI) and keep them out of git.

---

## 📡 API Reference

### `GET /health`
Returns `{ "status": "ok" }` — used for uptime checks.

### `POST /analyze`
`multipart/form-data` with:
- `image` (required) — JPG/PNG/WEBP, at least 80×80px
- `baseline` (optional) — a prior scan image to diff against

**Response**
```json
{
  "scores": { "acne": 82, "hydration": 67, "glow": 74, ... },
  "overall_score": 75,
  "insights": ["..."],
  "routine": { "AM": ["..."], "PM": ["..."] },
  "recommendations": [{ "name": "...", "reason": "...", "match": 88 }],
  "comparison": { "overall_change": 4, "metric_changes": { "hydration": 3, ... } }
}
```
`comparison` is only present if a `baseline` image was submitted.

---

## 🔐 Auth & History (current implementation)

Login is currently a **lightweight demo auth**: `AuthContext.jsx` stores the logged-in user and their scan history in the browser's `localStorage`, keyed by email (`skinai-history:{email}`, capped at the last 30 scans). There's no password verification or server-side account store.

This is fine for a demo/portfolio deployment, but **before any real users' data is involved**, swap this for a real backend auth system (e.g. Supabase Auth, Firebase Auth, or a Flask + Postgres user table) so credentials and history are actually secured and persist across devices.

---

## 🌐 Live Deployment

- **Frontend (Vercel):** [skinai-personalized-skincare.vercel.app](https://skinai-personalized-skincare.vercel.app/)
- **Backend (Render):** [skinai-personalized-skincare.onrender.com](https://skinai-personalized-skincare.onrender.com/) — `/health` confirms the service is live

Make sure `VITE_API_BASE_URL` in the frontend's Vercel environment variables points to the Render backend URL above, and that CORS on the backend allows the Vercel domain (Flask-CORS is currently wide open — consider restricting `origins` to the production frontend domain before treating this as production-ready).

> **Note:** If the backend is on Render's free tier, it spins down after inactivity — the first `/analyze` request after idle time can take 20–50s while the service wakes up. This isn't a bug; consider a paid instance or a periodic health-check ping if that delay matters for demos.

---

## 🗺️ Future Improvements

- [ ] Replace demo auth/history with a real authenticated backend + database
- [ ] Trained ML model for more accurate skin classification
- [ ] Expanded, curated product recommendation database
- [ ] Multi-scan progress analytics beyond single-baseline comparison
- [ ] Restrict backend CORS to the production frontend origin

---

## 📄 License

Developed for educational and portfolio purposes.

## 🙋 Author

**Disha V Reddy** — Engineering Student | AI & Full-Stack Developer
GitHub: [github.com/dishavreddy](https://github.com/dishavreddy)
