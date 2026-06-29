# 💰 Expense Tracker API

A full-stack Personal Finance Tracker built with **Go (Gin)**, **React**, **MySQL**, and **Docker**. The application enables users to securely manage income and expenses, visualize financial summaries, and export transaction reports as PDFs.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected API Routes

### 💳 Transaction Management
- Add Income
- Add Expense
- Edit Transactions
- Delete Transactions
- View Transaction History

### 📊 Dashboard
- Total Income
- Total Expenses
- Current Balance
- Recent Transactions

### 📈 Analytics
- Category-wise Expense Summary
- Monthly Summary
- Income vs Expense Analysis
- Interactive Charts

### 📄 PDF Export
- Export transaction history as PDF

### 🐳 Docker Support
- Dockerized Backend
- Dockerized Frontend
- MySQL Container
- Docker Compose configuration

---

# 🛠️ Tech Stack

### Backend
- Go
- Gin Framework
- GORM
- MySQL
- JWT Authentication

### Frontend
- React
- React Router
- Axios
- CSS

### Database
- MySQL

### DevOps
- Docker
- Docker Compose

---

# 📁 Project Structure

```
expense-tracker-api
│
├── config/
├── handlers/
├── middleware/
├── models/
├── repositories/
├── services/
├── utils/
├── docs/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Dockerfile
├── docker-compose.yml
├── main.go
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/sandhyatigadolli/expense-tracker-api.git
cd expense-tracker-api
```

---

## Backend Setup

Create a `.env` file:

```env
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=3306
DB_NAME=expense_tracker_go

JWT_SECRET=your_secret

PORT=8082
```

Run backend:

```bash
go mod tidy
go run main.go
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8082
```

Swagger:

```
http://localhost:8082/swagger/index.html
```

---

# 🐳 Run with Docker

```bash
docker compose up --build
```

Frontend:

```
http://localhost:5173
```

Backend:

```
http://localhost:8082
```

Swagger:

```
http://localhost:8082/swagger/index.html
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /register |
| POST | /login |

---

## Transactions

| Method | Endpoint |
|---------|----------|
| GET | /transactions |
| POST | /transactions |
| PUT | /transactions/{id} |
| DELETE | /transactions/{id} |
| GET | /transactions/{id} |

---

## Analytics

| Method | Endpoint |
|---------|----------|
| GET | /summary |
| GET | /category-summary |
| GET | /monthly-summary |

---

# 📷 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- Add Transaction Modal
- Analytics Page
- Swagger UI

---

# 🔒 Authentication

This project uses JWT (JSON Web Tokens).

After login, every protected API requires:

```
Authorization: Bearer <token>
```

---

# Future Improvements

- Email Verification
- Password Reset
- Recurring Transactions
- Budget Planning
- Expense Goals
- Dark/Light Theme
- Multi-currency Support
- Notifications

---

# Learning Outcomes

This project helped me gain hands-on experience with:

- REST API Development using Go
- Gin Framework
- GORM ORM
- JWT Authentication
- Repository-Service Architecture
- React Frontend Development
- API Integration using Axios
- Docker & Docker Compose
- MySQL Database Design
- PDF Generation
- Full Stack Application Development

---

# Author

**Sandhya Tigadolli**

GitHub:
https://github.com/sandhyatigadolli
