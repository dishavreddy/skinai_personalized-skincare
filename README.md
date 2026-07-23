# SkinAI — AI-Powered Skin Analysis & Personalized Skincare

SkinAI is an AI-powered skincare analysis platform designed to help users understand their skin through computer vision and machine learning. The platform analyzes facial images to generate skin insights, visual scores, and personalized skincare recommendations.

---

## Overview

SkinAI combines **computer vision, machine learning, and an interactive skincare dashboard** to provide users with a personalized understanding of their skin.

Users can upload a facial image and receive AI-assisted insights into various skin characteristics, explore personalized skincare routines, and track their skin progress over time.

The application focuses on creating a simple, human-friendly experience that transforms complex skin analysis into easy-to-understand visual insights.

---

## Features

### AI Skin Analysis

* Acne detection
* Hydration analysis
* Glow score
* Skin texture analysis
* Dark circle detection
* Oiliness analysis
* Skin smoothness insights

### Personalized Insights

* Personalized skincare routines
* Smart skincare recommendations
* Daily skin insights
* Progress tracking
* Before-and-after comparison

### Premium UI/UX

* Clean and minimal design
* Floating glassmorphism navigation
* Smooth animations and transitions
* Pseudo-3D dashboard effects
* Responsive mobile-first layout
* Human-friendly interface
* Realistic skincare dashboard visuals

### Interactive Experience

* Animated charts
* Circular skin score indicators
* Floating UI cards
* Scroll reveal animations
* Hover interactions
* Mouse-follow effects
* Cinematic page transitions

---

## How It Works

```text
User Uploads Facial Image
          ↓
Image Processing
          ↓
Computer Vision Analysis
          ↓
AI-Based Skin Assessment
          ↓
Skin Metrics & Scores
          ↓
Personalized Insights
          ↓
Skincare Routine & Recommendations
          ↓
Progress Tracking
```

---

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* React
* Tailwind CSS
* Framer Motion

### Backend

* Python
* Flask

### AI & Computer Vision

* OpenCV
* NumPy
* Scikit-learn

### Database

* MongoDB Atlas

---

## Key Analysis Metrics

| Metric          | Description                                          |
| --------------- | ---------------------------------------------------- |
| Acne            | Provides insights into visible acne-related concerns |
| Hydration       | Estimates the skin's hydration level                 |
| Glow Score      | Provides an overall visual skin glow score           |
| Skin Texture    | Analyzes visible skin texture characteristics        |
| Dark Circles    | Provides insights into the under-eye area            |
| Oiliness        | Analyzes visible oiliness levels                     |
| Skin Smoothness | Provides insights into overall skin smoothness       |

---

## Application Screenshots

### Home Page

![SkinAI Home Page](screenshots/home.png)

### AI Skin Analysis

![SkinAI AI Skin Analysis](screenshots/analysis.png)

---

## Project Demo

The complete SkinAI workflow:

```text
Upload Facial Image
        ↓
AI Skin Analysis
        ↓
View Skin Scores
        ↓
Explore Personalized Insights
        ↓
Get Skincare Recommendations
        ↓
Track Skin Progress
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dishavreddy/skinai.git
```

### 2. Navigate to the Project

```bash
cd skinai
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Start the React Frontend

```bash
npm run dev
```

### 5. Set Up the Python Backend

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

### 6. Activate the Virtual Environment

For Windows:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
source venv/bin/activate
```

### 7. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### 8. Start the Flask Backend

```bash
python app.py
```

The frontend and backend should now be running locally.

---

## Environment Variables

Create a `.env` file in the appropriate project directory and add your required environment variables.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
```

Add any additional API keys or configuration variables required by your implementation.

**Important:** Never commit API keys, database credentials, or other sensitive information to GitHub.

Add `.env` to your `.gitignore` file:

```gitignore
.env
```

---

## Future Improvements

* Improve AI skin analysis accuracy
* Add secure user authentication
* Add personalized product recommendations
* Implement advanced skin progress analytics
* Add real-time skin tracking
* Improve before-and-after image comparison
* Integrate dermatologist consultation features
* Deploy the application for public access

---

## Disclaimer

SkinAI provides AI-assisted skincare insights for informational purposes only. The results generated by the application are not intended to replace professional medical advice, diagnosis, or treatment from a qualified dermatologist or healthcare professional.

---

## Author

**Disha V Reddy**

Engineering Student | AI & Full-Stack Developer

GitHub: [github.com/dishavreddy](https://github.com/dishavreddy)

---

## License

This project is developed for educational and portfolio purposes.
