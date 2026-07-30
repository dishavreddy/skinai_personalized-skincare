# SkinAI

A Vite + React skincare analysis demo with a Flask/OpenCV API. The analysis is derived from uploaded image pixels (brightness, color balance, red-spot signal, highlight signal, contrast, and Laplacian texture); it is informative only and not medical advice.

## Local development

Requirements: Node.js 20+ and Python 3.10+.

```bash
# terminal 1 — frontend
npm install
npm run dev

# terminal 2 — API
cd backend
python -m venv .venv
.venv\Scripts\activate       # Windows PowerShell
pip install -r requirements.txt
python app.py
```

Open `http://localhost:5173`. The frontend calls `http://localhost:5000/analyze` by default. To use another API URL, create a root `.env` file:

```bash
VITE_API_URL=https://your-api.example.com
```

## Flow

1. Landing page CTAs open `/scan`.
2. Upload a current facial image; optionally add a baseline image.
3. The React client posts both files as multipart form data to Flask.
4. OpenCV derives the seven visual scores and the API returns routine, insights, recommendations, and optional score deltas.
5. `/results` renders the score rings, metric bars, progress graph, routines, products, and before/after comparison.

## Deploy for free

### Backend — Render

1. Push this repository to GitHub.
2. In Render, create a **Web Service** from the repository.
3. Set the root directory to `backend`.
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn --bind 0.0.0.0:$PORT app:app`
6. Copy the public Render service URL.

### Frontend — Vercel or Netlify

1. Import the same GitHub repository.
2. Use build command `npm run build` and publish directory `dist`.
3. Add environment variable `VITE_API_URL` with the public Render URL, for example `https://skinai-api.onrender.com`.
4. Redeploy the frontend after adding the variable.

The Flask service enables CORS, so the deployed Vercel/Netlify frontend can call it directly. For a real product, restrict CORS to your frontend domain and add rate limiting, authentication, and a privacy policy.
