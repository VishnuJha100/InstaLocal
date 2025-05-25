# InstaLocal
# Local Stores Marketplace

A full-stack e-commerce platform where local stores can register, manage their inventory, and sell products. Customers can browse nearby shops, place orders, and leave reviews.

---

## Tech Stack

### **Frontend**
- React.js
- Tailwind CSS

### **Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## Features

### User
- Sign up / Login with JWT
- Browse stores and products
- Place orders
- Leave reviews (ONLY if product purchased)

### Store Owner
- Register and manage a store
- Add / edit / delete products
- View orders for their store

### Admin
- Manage users, stores, and products
- Update order status

---

## Getting Started

### Clone the repo
```bash
git clone https://github.com/VishnuJha100/InstaLocal.git
cd InstaLocal
cd backend
npm install
cp .env.example .env
# Fill in your mongoDB URI, JWT secret, etc.

# Start backend
npm run dev
```

# License
MIT © 2025 Vishnu Deb Jha