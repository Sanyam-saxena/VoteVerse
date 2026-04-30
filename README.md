# 🗳️ VoteVerse

Welcome to **VoteVerse**! This project is an interactive, AI-powered election education platform designed to make learning about the voting process engaging, accessible, and fun. Built as a Minimum Viable Product (MVP), VoteVerse aims to demystify elections through a blend of chat interactions, simulations, timelines, quizzes, and scenarios.

---

## 🚀 Features

- **Interactive Election Simulator:** Walk through the entire voting process step-by-step.
- **AI Chat Assistant:** Get immediate, accurate answers to your election-related questions.
- **Educational Modules:** Dive deep with historical timelines, interactive quizzes, and hypothetical scenarios.
- **Privacy-First Analytics:** Includes an optional, privacy-safe Google Analytics integration that tracks module usage without storing personal data or chat messages.
- **Accessible & Responsive:** Designed with inclusivity in mind, featuring semantic HTML and extensive ARIA support.

## 🛠️ Tech Stack

**Frontend:**
- **React.js & Vite:** For a blazing-fast, modern development experience.
- **React Router:** For seamless single-page application (SPA) navigation.

**Backend:**
- **Node.js & Express:** Lightweight, fast, and robust API handling.
- **Modular Architecture:** Utilizes static JSON data to simulate database responses, making the MVP fast and easy to maintain.

---

## 📂 Project Structure

```text
VoteVerse/
├── backend/
│   ├── controllers/      # Business logic & request handling
│   ├── routes/           # API endpoint definitions
│   ├── test/             # Native Node.js test suites
│   ├── app.js            # Express app configuration & middleware
│   └── server.js         # Server entry point
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── hooks/        # Custom React hooks (e.g., Theme management)
    │   ├── pages/        # Main application views
    │   ├── data/         # Static JSON data for the MVP
    │   ├── services/     # API and third-party integrations
    │   └── styles/       # Global styling & CSS variables
    └── index.html        # Application entry point
```

---

## 💻 Getting Started

Follow these steps to get VoteVerse up and running on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### 1. Start the Backend API

Navigate to the backend directory, install the dependencies, and start the development server:

```bash
cd backend
npm install
npm run dev
```
> **Note:** The API server runs on `http://localhost:5001` by default.

### 2. Start the Frontend Application

Open a new terminal window, navigate to the frontend directory, install the dependencies, and start Vite:

```bash
cd frontend
npm install
npm run dev
```
> **Note:** Open your browser and navigate to `http://localhost:5174` (or the port specified by Vite) to explore VoteVerse.

---

## 🧪 Testing

We value reliability. You can run our backend API validation tests using the native Node.js test runner:

```bash
cd backend
npm test
```
*Tests cover health endpoints, security headers, data fetching, and input validation.*

---

## 📊 Optional: Google Analytics

VoteVerse includes an optional Google Analytics integration to track page views and module engagement. To enable this:

1. Navigate to the `frontend` directory.
2. Copy `.env.example` to a new file named `.env`.
3. Add your measurement ID:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

*Rest assured: No chat messages or personally identifiable information are sent to Google Analytics. We only track privacy-safe interactions.*

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, improving the documentation, or proposing new features, feel free to open an issue or submit a pull request.

---

*Built with ❤️ to make election education accessible to everyone.*
