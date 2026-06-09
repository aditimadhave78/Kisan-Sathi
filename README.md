# 🌱 Kisan Sathi

A full-stack web application for farmers — real-time mandi prices, crop management, and secure login system.

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express.js |
| Database | MySQL |
| Auth | JWT (JSON Web Token) + bcryptjs |

---

## 📁 Project Structure

```
kisan-sathi/
├── public/                  # Frontend (HTML files)
│   ├── index.html           # Home page
│   ├── login.html           # Login page
│   ├── signup.html          # Registration page
│   └── dashboard.html       # Farmer dashboard
│
├── server/                  # Backend
│   ├── server.js            # Express server entry point
│   ├── db.js                # MySQL database connector
│   └── routes/              # API route handlers
│       ├── auth.js          # Signup / Login routes
│       ├── crops.js         # Crop management routes
│       └── market.js        # Mandi price routes
│
├── .env.example             # Environment variables template
├── .gitignore
└── package.json
```

---

## 🔌 How Frontend connects to Backend to Database

```
Browser (HTML/JS)
      |
      | fetch('http://localhost:3000/api/...')
      ↓
Express Server (server.js)
      |
      | require('./routes/auth')
      ↓
Route Handler (auth.js / crops.js / market.js)
      |
      | const db = require('../db')
      ↓
db.js — mysql2 connection using .env variables
      |
      ↓
MySQL Database (kisan_sathi)
```

---

## ⚙️ Setup & Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/kisan-sathi.git
cd kisan-sathi
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
# Ab .env file mein apni MySQL details bharo
```

### 4. Create MySQL Database
```sql
CREATE DATABASE kisan_sathi;
USE kisan_sathi;

CREATE TABLE farmers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(15),
  location VARCHAR(100),
  state VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id INT,
  name VARCHAR(100),
  land_area DECIMAL(10,2),
  season VARCHAR(50),
  sowing_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id)
);
```

### 5. Start the server
```bash
npm start
```

### 6. Open in browser
```
http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new farmer |
| POST | `/api/auth/login` | Login & get JWT token |
| GET | `/api/crops/my-crops` | Get logged-in farmer's crops |
| POST | `/api/crops/add` | Add a new crop |
| GET | `/api/market/prices` | Get mandi prices by state |

---

## ✨ Features

- 🔒 Secure signup/login with JWT authentication
- 🌾 Add and track your crops (season, area, sowing date)
- 💰 Real-time mandi bhav (market prices) by state
- 📱 Responsive design — works on mobile too

---

## 👨‍💻 Author

Made with ❤️ for Indian farmers.
