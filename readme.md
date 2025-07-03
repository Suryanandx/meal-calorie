# 🛠️ Meal Calorie Tracker – Getting Started

A full-stack calorie tracking app that lets users estimate calories using the USDA FoodData Central API.

- **Frontend:** [`frontend`](https://meal-calorie.vercel.app) – React + TypeScript (deployed on Vercel)
- **Backend:** [`backend`](https://meal-calorie-production.up.railway.app) – Node.js + Express + MongoDB (deployed on Railway)

---

## 🔧 Prerequisites

Ensure you have the following installed:

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [USDA API Key](https://fdc.nal.usda.gov/api-key-signup.html)

---

## 📁 Folder Structure

```

meal-calorie/
├── frontend         # React + TypeScript frontend
└── backend          # Express + MongoDB backend

````

---

## 🌐 Live URLs

- **Frontend** → [`https://meal-calorie.vercel.app`](https://meal-calorie.vercel.app)
- **Backend** → [`https://meal-calorie-production.up.railway.app`](https://meal-calorie-production.up.railway.app)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/Suryanandx/meal-calorie.git
cd meal-calorie
````

---

### 2️⃣ Backend Setup

```bash
cd backend
cp .env.example .env           # Fill in Mongo URI, JWT secret, and USDA key
npm install
npm run dev                    # Starts on http://localhost:8000
```

#### ✅ Sample `.env` for Backend

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/meal-calorie-db
JWT_SECRET=your_jwt_secret
USDA_API_KEY=your_usda_api_key
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
cp .env.example .env           # Set your API base URL
npm install
npm run dev                    # Starts on http://localhost:3000
```

#### ✅ Sample `.env` for Frontend

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

> For production:
>
> `NEXT_PUBLIC_API_BASE_URL=https://meal-calorie-production.up.railway.app`

---

## 🏗️ Production Build

### 🔧 Backend

```bash
cd backend
npm run build                  # TypeScript → dist/
node dist/server.js            # Run production server
```

### 🌐 Frontend

```bash
cd frontend
npm run build
npm start                      # Serves optimized frontend
```

---

## 🔐 API Routes

### ✅ Auth

* `POST /auth/register` → Register new user
* `POST /auth/login` → Login and receive JWT

### ✅ Calories

* `POST /get-calories`
  Headers: `Authorization: Bearer <token>`
  Body: `{ "foodItem": "Banana" }`

---

## 📌 Notes

* Modular, scalable architecture with OOP and validation
* Uses **Zod** for request validation
* CORS enabled (open for dev)
* Fully deployable via **Railway** + **Vercel**


