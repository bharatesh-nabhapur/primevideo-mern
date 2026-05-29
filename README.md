# 🎬 Amazon Prime Video — Subscription & Watchlist System (MERN)

## Project Structure
```
WT/
├── server/          ← Node.js + Express backend
│   ├── models/      ← MongoDB schemas (User, Subscription, Watchlist)
│   ├── routes/      ← REST API routes
│   ├── middleware/  ← JWT auth middleware
│   ├── .env         ← MongoDB Atlas URI + JWT secret
│   └── index.js     ← Entry point
└── client/          ← React frontend
    └── src/
        ├── pages/   ← Home, Login, Register, Dashboard
        ├── App.js
        └── api.js   ← Axios instance
```

---

## ⚙️ Setup Instructions

### Step 1 — MongoDB Atlas
1. Go to https://cloud.mongodb.com and sign in / create account
2. Create a **free cluster** (M0)
3. Under **Database Access** → Add a user with username & password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect** → **Drivers** → copy the connection string
6. Open `server/.env` and replace the MONGO_URI:
   ```
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/primevideo?retryWrites=true&w=majority
   ```

### Step 2 — Install & Run Backend
```bash
cd server
npm install
npm run dev
```
Server runs at: http://localhost:5000

### Step 3 — Install & Run Frontend
```bash
cd client
npm install
npm start
```
App opens at: http://localhost:3000

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| POST | /api/subscribe | Subscribe to a plan |
| GET | /api/subscriptions | Get user subscriptions |
| PUT | /api/subscription/renew | Renew subscription |
| POST | /api/watchlist/add | Add movie to watchlist |
| GET | /api/watchlist | Get watchlist |

---

## 📋 Plans

| Plan | Price | Quality | Devices | Watchlist |
|------|-------|---------|---------|-----------|
| Mini | ₹149/mo | SD | 1 | 10 |
| Family | ₹299/mo | Full HD | 3 | 30 |
| Ultra | ₹599/mo | 4K Ultra HD | 6 | 100 |
