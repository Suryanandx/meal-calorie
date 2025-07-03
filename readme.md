# 🛠️ Meal Calorie Tracker – Getting Started

This project is split into two folders:

- **Frontend:** `calorie-tracker` – built with React + TypeScript
- **Backend:** `meal-calorie-backend` – built with Node.js + Express + MongoDB

---

## 🔧 Prerequisites

Make sure you have the following installed:

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- `.env` file for each project

---

## 📁 Folder Structure

```

.
├── calorie-tracker         # Frontend (React/Next.js)
└── meal-calorie-backend    # Backend (Express, MongoDB)

````

---

## ⚙️ Setup Instructions

### ⬇️ Clone the Repo

```bash
git clone https://github.com/Suryanandx/meal-calorie.git
cd meal-calorie-tracker
````

---

### 🔙 Backend Setup

```bash
cd meal-calorie-backend
cp .env.example .env         # fill in your MongoDB URI and USDA API key
npm install
npm run dev
```

API is served at `http://localhost:5000/api`

---

### 🎯 Frontend Setup

```bash
cd calorie-tracker
cp .env.example .env         # point NEXT_PUBLIC_API_URL to backend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## 🔐 Auth Routes

* POST `/auth/register`
* POST `/auth/login`

---

## 🍽️ Calories Route

* POST `/get-calories` (requires Bearer Token)

---

## 📌 Notes

* Both apps are modular and OOP-based.
* All validation is handled via Zod.
* You must add a valid `USDA_API_KEY` in the backend `.env`.
