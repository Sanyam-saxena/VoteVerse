# 🗳️ VoteVerse 2.0

Welcome to **VoteVerse**! This project is a production-grade, AI-powered election education platform designed to make learning about the voting process engaging, accessible, and secure.

VoteVerse has been significantly upgraded from an MVP to a robust application with a focus on security, accessibility, and real-time AI.

---

## 🚀 Key Upgrades

- **🤖 Google Gemini AI:** Real-time, context-aware election assistant powered by `gemini-1.5-flash`.
- **💎 TypeScript Core:** Completely migrated to TypeScript for both frontend and backend for superior code reliability.
- **🛡️ Production Security:** Implemented `helmet`, `cors`, and `zod` for professional-grade request validation and security headers.
- **🧪 Comprehensive Testing:** Full test suites using native Node.js runner (Backend) and Vitest (Frontend).
- **♿ Advanced Accessibility:** Features ARIA-live regions for dynamic content and "Skip to Main Content" for keyboard users.
- **⚡ Performance Optimized:** Implemented route-based code splitting (Lazy Loading) and backend response compression.

---

## 🛠️ Tech Stack

**Frontend:**
- **React 19 & TypeScript:** Modern, type-safe UI development.
- **Vite:** Lightning-fast build tool and dev server.
- **Vitest:** Blazing fast unit testing.
- **Lucide React:** Premium iconography.

**Backend:**
- **Node.js (v20+) & Express 5:** Fast, modular API.
- **Google Generative AI SDK:** Integration with Gemini.
- **Zod:** Strict type-safe schema validation.
- **Security Suite:** Helmet, CORS, and Compression.

---

## 📂 Project Structure

```text
VoteVerse/
├── backend/
│   ├── controllers/      # Type-safe logic & Gemini integration
│   ├── routes/           # API endpoint definitions
│   ├── test/             # Native Node.js TS test suites
│   ├── app.ts            # Secure Express app configuration
│   └── server.ts         # Server entry point
└── frontend/
    ├── src/
    │   ├── components/   # Accessible UI components
    │   ├── hooks/        # Custom TS hooks
    │   ├── pages/        # Lazy-loaded views
    │   ├── services/     # Type-safe API & Analytics services
    │   └── styles/       # Modern CSS with A11y support
    └── index.html        # Application entry point
```

---

## 💻 Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Add GEMINI_API_KEY to .env
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

We take reliability seriously. 

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

---

*Built with ❤️ to make election education accessible and secure for everyone.*

