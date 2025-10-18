# 🛍️ Mini Merchant Dashboard

A simple **React + Express** application for managing products with authentication, a dashboard view, and responsive design.  

## 🚀 Features

- 🔐 **Login / Logout** with JWT (stored in localStorage)  
- 📦 **Product Management** – add, edit, delete, and list products  
- 📊 **Dashboard Analytics** – total products, total value, categories count  
- 🎨 **Responsive UI** – clean layout with modal forms

- ## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Abhinav-mad/merchant-dashboard.git
```
2️⃣ Backend Setup

```bash
cd backend
npm install
```
add .env ,
 env example
 ```
 PORT=5000
 JWT_SECRET=your_secret_key
 JWT_EXPIRES_IN=2h
 ```
```bash
npm start
```
Runs backend on http://localhost:5000

3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```
Runs frontend on http://localhost:3000
