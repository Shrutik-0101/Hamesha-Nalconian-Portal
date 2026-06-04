# NALCO Portal

A full-stack web application with a React frontend, Node.js backend, and a Python-based Chatbot/RAG component.

## Technologies Used

### Frontend
- **React 19** (UI Framework)
- **Vite** (Build Tool)
- **React Router Dom** (Routing)
- **Axios** (API Requests)

### Backend
- **Node.js & Express.js** (Server)
- **MongoDB / Mongoose** (Database)
- **JWT (JSON Web Tokens)** (Authentication)
- **Bcrypt.js** (Password Hashing)
- **Nodemailer** (Email Services)

### Chatbot / AI
- **Python**
- **Jupyter Notebook (RAG.ipynb)**

---

## Project Structure

```text
nalco-portal/
├── backend/            # Express.js backend server code
├── chatbot/            # Python-based chatbot files
├── public/             # Static frontend assets
├── src/                # React frontend source code
│   ├── components/     # Reusable React components
│   └── ...             # Other React application files
├── .env                # Environment variables configuration
├── package.json        # Frontend configuration and dependencies
└── RAG.ipynb           # Retrieval-Augmented Generation notebook
```

---

## Getting Started

### 1. Start the Backend

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the backend dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   *(The backend server will start running, usually on port 5000 depending on your `.env` configuration).*

### 2. Start the Frontend

1. Open a **new** terminal (keep the backend running in the other one) and make sure you are in the project root directory (`nalco-portal`):
2. Install the frontend dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend will start running and give you a local URL, e.g., `http://localhost:5173`)*
