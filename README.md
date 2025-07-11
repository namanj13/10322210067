# React URL Shortener Web Application

A fully client-side URL Shortener app built using **React** and **Material UI**, featuring:

- 🔗 URL shortening with optional custom codes
- ⏱️ Expiry time management (default 30 minutes)
- 📊 Click analytics (timestamp, source, location)
- 🔒 Custom-built logging middleware (no console.log)
- 🔁 React Router redirection for short URLs

---

## 📁 Folder Structure

```
root/
├── logging-middleware/
│   └── LoggerMiddleware.js
│
└── frontend-test-submission/
    ├── public/
    ├── src/
    │   ├── pages/
    │   │   ├── ShortenerPage.jsx
    │   │   ├── RedirectHandler.jsx
    │   │   └── StatisticsPage.jsx
    │   ├── utils/
    │   │   └── helpers.js
    │   └── App.js
    ├── package.json
    └── README.md
```

---

## 🛠️ Installation & Running

1. **Install dependencies**:

```bash
cd frontend-test-submission
npm install
```

2. **Start the app**:

```bash
npm start
```

3. Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧩 Pages Overview

### 🔹 Shortener Page (`ShortenerPage.jsx`)
- Input up to 5 long URLs with:
  - Optional expiry in minutes
  - Optional custom shortcode
- Validates inputs before shortening
- Displays shortened URLs with expiry

### 🔹 Redirect Page (`RedirectHandler.jsx`)
- Redirects users from short URL to original long URL
- Checks expiry and logs click event:
  - Time
  - Referrer
  - Location (set to "Unknown")

### 🔹 Statistics Page (`StatisticsPage.jsx`)
- Lists all created short links (from localStorage)
- Displays:
  - Original and short URLs
  - Created and expiry time
  - Click count
  - Detailed click logs

---

## 🧠 Design Choices

| Component | Reason |
|----------|--------|
| React Router | For managing short link redirection |
| Material UI | Clean, responsive, evaluation-required styling |
| LocalStorage | Lightweight session storage for URLs and logs |
| Logging Middleware | Mandatory log tracking (replaces `console.log`) |

---

## 🔐 Logging Middleware

- Used to log all important actions like:
  - Shortening a URL
  - Invalid input
  - Shortcode conflicts
  - Redirect clicks

```js
import { logEvent } from '../../logging-middleware/LoggerMiddleware';
logEvent("ACTION_NAME", { data });
```

---

## ⚠️ Input Validations

- Long URL must be a valid URL format
- Validity must be an integer
- Custom shortcode must be 3–10 alphanumeric characters
- Custom shortcodes must be unique

---

## ✅ Evaluation Constraints Met

- ✅ Fully working React frontend
- ✅ Short link uniqueness
- ✅ Validity defaults to 30 minutes
- ✅ Custom shortcodes allowed
- ✅ Client-side routing & redirection
- ✅ Robust error handling
- ✅ Clean Material UI interface
- ✅ Mandatory logging integration
- ✅ URL statistics with click tracking

---

## 👨‍💻 Author

**Naman Jain**  

---

## 📄 License

This project is submitted for evaluation purposes only.
