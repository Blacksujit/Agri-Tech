# Arogya Krishi Frontend

Modern Next.js frontend for the Arogya Krishi AI Agriculture Platform.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand + TanStack React Query
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your Flask backend URL.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    dashboard/           # Dashboard layout and pages
      disease-detection/
      soil-prediction/
      fertilizer-recommendation/
  components/
    layout/              # Layout components (Sidebar, Navbar)
    ui/                  # shadcn/ui components
    providers/           # React providers
  features/              # Feature-based modules
    disease-detection/
      components/
      services/
      hooks/
      types/
    soil-prediction/
    fertilizer-recommendation/
  lib/                   # Utilities (axios, utils)
  store/                 # Zustand store
  types/                 # Shared type definitions
```

## Features

- **Disease Detection**: Upload plant images for AI-powered disease identification
- **Soil Prediction**: Analyze soil images for type and crop recommendations
- **Fertilizer Recommendations**: Get personalized fertilizer advice based on nutrient levels
- **Modern UI**: Responsive design with loading states, error handling, and toast notifications

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the Flask backend via these endpoints:
- `POST /api/disease-detection` - Disease detection
- `POST /api/soil-prediction` - Soil type prediction
- `POST /api/fertilizer-recommendation` - Fertilizer recommendations

Make sure your Flask backend is running and CORS is configured properly.
