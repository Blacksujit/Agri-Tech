# Arogya Krishi - AI Agriculture Platform

A modern web application for AI-powered crop disease detection, soil prediction, and fertilizer recommendations.

## Architecture

- **Backend**: Flask with ML models (Python)
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- Flask backend dependencies
- ML model files in `/model` directory

### 1. Start the Backend

```bash
cd ArogyaKrishi
python app.py
```

The Flask server will start on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The Next.js app will start on `http://localhost:3000`

### 3. Access the Application

Open `http://localhost:3000` in your browser. The app will automatically redirect to `/dashboard`.

## Features

### 1. Disease Detection
- Upload plant leaf images
- AI-powered disease identification
- Confidence scores and fertilizer recommendations
- Image preview with results

### 2. Soil Prediction
- Upload soil images
- Automatic soil type classification
- Crop recommendations based on soil type
- Analysis details and next steps

### 3. Fertilizer Recommendations
- Input crop name and nutrient levels (N, P, K)
- Get personalized fertilizer advice
- Nutrient status indicators
- Detailed recommendations and analysis

## API Endpoints

### New JSON APIs (for Next.js frontend)
- `POST /api/disease-detection` - Disease detection with image upload
- `POST /api/soil-prediction` - Soil type prediction with image upload
- `POST /api/fertilizer-recommendation` - Fertilizer recommendations

### Legacy Template APIs (still available)
- `POST /predict` - Disease detection (returns HTML)
- `POST /soil-predict` - Soil prediction (returns HTML)
- `POST /fertilizer-predict` - Fertilizer recommendations (returns HTML)

## Frontend Structure

```
frontend/src/
  app/                    # Next.js App Router pages
    dashboard/           # Dashboard layout and feature pages
  components/
    layout/              # Sidebar, Navbar, AppShell
    ui/                  # shadcn/ui components
    common/              # Reusable components
    providers/           # React providers
  features/              # Feature-based modules
    disease-detection/
    soil-prediction/
    fertilizer-recommendation/
  lib/                   # Utilities
  store/                 # Zustand state management
  types/                 # TypeScript definitions
```

## Development

### Backend Development
- Flask app in `ArogyaKrishi/app.py`
- ML models loaded lazily on first use
- CORS enabled for frontend integration
- Session-based authentication (login/signup)

### Frontend Development
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS + shadcn/ui for styling
- React Query for API state management
- Zustand for client state
- React Hook Form + Zod for form validation

### Environment Variables

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Deployment

### Backend Deployment
- Use WSGI server (Gunicorn, uWSGI)
- Configure proper CORS for production domain
- Set up SSL/HTTPS
- Configure proper file upload limits

### Frontend Deployment
- Build: `npm run build`
- Start: `npm start`
- Deploy to Vercel, Netlify, or any Node.js hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
