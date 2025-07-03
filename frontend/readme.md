# 🍽️ Meal Calorie Tracker – Frontend

A modern, responsive frontend interface for searching food items and calculating their calories using the USDA API via our backend service. Built with React and TypeScript, this app supports authentication, calorie estimation, and smooth user interactions.

---

## 🚀 Features

- 🔐 JWT-based **login & registration**
- 🥘 Calorie estimator for common dishes
- 💡 Intelligent fuzzy search powered by USDA
- ✅ Zod form validation
- 🌙 Dark/light mode toggle (optional)
- ⚡ Snappy UI with Toast notifications
- 🔄 Axios interceptor for auth + error handling
- 📦 Modular file structure with clean components

---

## 🛠 Tech Stack

- **React.js / Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **React Hook Form + Zod**
- **React Router or App Router (if using Next 13+)**
- **React Toastify** (or shadcn/ui alerts)
- **JWT Auth Middleware**
- (Optional: Zustand/Redux for global state)

---

## 📁 Folder Structure

```

src/
├── components/         # UI Components (Buttons, Inputs, Card)
├── pages/              # Routes (login, register, dashboard)
├── services/           # Axios API handlers
├── hooks/              # Custom hooks (auth, form, etc.)
├── utils/              # Token helpers, error handlers
├── schemas/            # Zod validation schemas
├── context/            # Auth context (if used)
└── styles/             # Tailwind/custom CSS

````

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/yourname/meal-calorie-frontend.git
cd meal-calorie-frontend
npm install
````

### 2. Environment Variables

Create a `.env.local` file based on this:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the base URL to point to your hosted backend when deploying.

---

## 🧪 Example Usage

### 🔐 Register

```json
POST /auth/register
{
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@example.com",
  "password": "securepass"
}
```

### 🔐 Login

```json
POST /auth/login
{
  "email": "jane@example.com",
  "password": "securepass"
}
```

Saves token to `localStorage` or app context.

---

### 🍛 Get Calorie Info

```json
POST /get-calories
Authorization: Bearer <token>

{
  "dish_name": "chicken biryani",
  "servings": 2
}
```

Displays total and per-serving calories in UI.

---

## ✅ Scripts

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start dev server          |
| `npm run build`  | Build for production      |
| `npm start`      | Start production server   |
| `npm run lint`   | Run ESLint                |
| `npm run format` | Format code with Prettier |

---

## 💡 Future Enhancements

* Meal history log
* Macronutrient breakdown (Protein, Carbs, Fat)
* PWA Support
* Mobile App with React Native

---

## 🔐 Auth Flow

* Token stored in localStorage (or cookies for SSR)
* Axios interceptor injects token into headers
* Protected routes redirect unauthenticated users


## 🧠 Developer Tips

* Use `Zod` + `React Hook Form` for best DX in forms
* Tailwind UI + Headless UI can accelerate design
* Keep token expiry and refresh logic in mind for production

---
