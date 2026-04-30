# VoteVerse

VoteVerse is an AI-powered interactive election education MVP built with React, Vite, React Router, Node.js, Express, and modular JSON data.

## Folder Structure

```text
/frontend
  /src
    /components
    /hooks
    /pages
    /data
    /services
    /styles
/backend
  /routes
  /controllers
```

## Run Locally

Install and run the API:

```bash
cd backend
npm install
npm run dev
```

Install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL at `http://localhost:5174`. The API runs on `http://localhost:5001` by default.

## Tests

Run backend API validation:

```bash
cd backend
npm test
```

## Optional Google Analytics

VoteVerse includes an optional Google Analytics integration for page views and module usage events. Create `frontend/.env` from `frontend/.env.example` and set:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

No chat message text is sent to analytics; the app only tracks privacy-safe module events.
