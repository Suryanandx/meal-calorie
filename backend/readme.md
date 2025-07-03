# 🍽️ Meal Calorie API

A scalable, class-based Node.js + TypeScript backend for calculating meal calories using the USDA FoodData Central API. Built with best practices including full OOP architecture, JWT-based authentication, Zod validation, rate limiting, and modular services.

---

## 🛠 Tech Stack

- **Node.js + Express** (API framework)
- **TypeScript** (strictly typed)
- **MongoDB + Mongoose** (database + schema)
- **Zod** (runtime request validation)
- **JWT Auth** (secure access)
- **Axios + USDA API** (external meal data)
- **Fuzzysort** (fuzzy dish matching)
- **Pino** (structured logging)
- **Rate Limiting** (IP & User-based)
- **Husky + Lint Staged** (Git hooks)

---

## 📁 Folder Structure

```

src/
├── config/                 # Environment & app config
├── controllers/            # Route controllers
├── middlewares/            # Auth, rate limiting, validation
├── models/                 # Mongoose models (User)
├── routes/                 # Express routers
├── services/               # Business logic (Auth, Calories)
├── types/                  # Global interfaces (USDA, etc.)
├── utils/                  # JWT, hashing, logger
├── validators/             # Zod schemas
└── index.ts                # App entry point

````

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/Suryanandx/meal-calorie
cd backend
npm install
````

### 2. Environment Variables

Create a `.env` file based on the `.env.example`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/calorie-tracker
JWT_SECRET=your_jwt_secret_key
USDA_API_KEY=your_usda_api_key
```

### 3. Run Dev Server

```bash
npm run dev
```

---

## 🔐 Auth API

### Register

`POST /api/auth/register`

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "password": "securepass"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "securepass"
}
```

*Response includes JWT token.*

---

## 🥗 Calorie Endpoint

### Get Calories

`POST /api/get-calories` *(Requires Bearer Token)*

```json
{
  "dish_name": "Grilled Salmon",
  "servings": 2
}
```

**Success Response**

```json
{
  "dish_name": "Grilled Salmon",
  "servings": 2,
  "calories_per_serving": 233,
  "total_calories": 466,
  "source": "USDA FoodData Central"
}
```

---

## 🧪 Validations

All request bodies are validated using **Zod** before controller execution. Invalid payloads return:

```json
{
  "error": "dish_name is required, servings must be a positive number"
}
```

---

## 🚧 Rate Limiting

* **/auth/** routes: IP-based (max 10/min)
* **/get-calories**: Authenticated user-based rate limit (10/min)

---

## 📌 Features

* Full **OOP architecture** with interfaces and classes
* Modular controllers, services, and middleware
* **Zod** validation for all incoming data
* **Fuzzy matching** of dish names for better accuracy
* **In-memory caching** for USDA lookups
* Fully secured **JWT Auth** system
* **Pino logger** for fast structured logs
* Ready for production deployment (Docker optional)

---

## ✅ Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start dev server (nodemon) |
| `npm run build`  | Compile TypeScript         |
| `npm start`      | Run compiled build         |
| `npm run lint`   | Run ESLint                 |
| `npm run format` | Format code with Prettier  |

---

## 👨‍💻 Developer Notes

* Default port: `5000`
* DB: MongoDB (`/models/user.model.ts`)
* Meal data: [USDA FoodData Central API](https://fdc.nal.usda.gov/api-key-signup.html)

---
