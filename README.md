# 🏏 CricketZone

CricketZone is a full-stack cricket statistics web application built using React and FastAPI.

Users can:
- View all cricket players
- View detailed player statistics
- Filter players by country
- View different stats based on player role

This project uses MongoDB Atlas as the database and Beanie ODM for database management.

---

# 🚀 Technologies Used

## Frontend
- React
- React Router DOM
- Axios
- Vite

## Backend
- FastAPI
- Beanie ODM
- MongoDB Atlas
- Motor

---

# 📂 Project Structure

CricketZone/

├── backend/
│
│   ├── app/
│   │
│   ├── config/
│   ├── constants/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   │
│   └── main.py
│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md

---

# ✨ Features

✅ Display all cricket players

✅ View full player profile

✅ Filter players by country

✅ Role-based stats display

✅ Loading state handling

✅ Error handling

✅ React Router navigation

✅ Service-based API architecture

✅ MongoDB Atlas integration

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /players | Get all players |
| GET | /players/{id} | Get single player |
| GET | /players/country/{country} | Get players by country |
| GET | /teams | Get all teams |
| POST | /players | Add new player |

---

# 🧠 React Concepts Used

- useState
- useEffect
- useParams
- React Router
- Axios
- Component Reusability
- Service Layer Pattern

---

# ⚙️ Backend Setup

## 1. Move to backend folder

```bash
cd backend
```

## 2. Install dependencies

```bash
uv sync
```

## 3. Run backend server

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

---

# ⚙️ Frontend Setup

## 1. Move to frontend folder

```bash
cd frontend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🌐 Database

This project uses MongoDB Atlas cloud database with Beanie ODM.
