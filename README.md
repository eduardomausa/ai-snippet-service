# 📘 Snippet Summarizer Project

This is a full-stack application that summarizes text using Google's Gemini API and stores the results in MongoDB. It consists of a **Node.js Express API** (backend) and a **React frontend** that communicates with the API to display summarized text.

---

## 🌍 Project Structure

- **Backend**: A Node.js + Express REST API that handles text summarization via the Gemini API and stores the results in MongoDB.

  - **Backend Repository**: [Link to Backend](https://github.com/eduardomausa/ai-snippet-service/tree/master/backend)

- **Frontend**: A React web application that allows users to input text, which is then summarized and displayed.
  - **Frontend Repository**: [Link to Frontend](https://github.com/eduardomausa/ai-snippet-service/tree/master/frontend)

---

## ⚙️ Requirements

- **Docker** (for running both frontend and backend together)
- **Docker Compose** (to simplify the setup)
- Node.js ≥ 22

---

## 🛠️ How to Run Both Frontend and Backend Using Docker

1. **Clone the repository**:
   ```bash
   git clone https://github.com/eduardomausa/ai-snippet-service.git
   cd ai-snippet-service
   ```

## Set up the environment variables:

- Create .env files in both frontend and backend folders.
- For backend (backend/.env), add:

1. **Clone the repository**:

   ```bash
   PORT=3000
   GEMINI_API_KEY=your_google_gemini_api_key
   MONGODB_URI=mongodb://mongo:27017/snippets
   ```

- For frontend (frontend/.env), add:

  ```bash
  REACT_APP_API_URL=http://localhost:3000
  PORT=3030
  ```

## Run the backend using Docker Compose:

- Make sure you have Docker and Docker Compose installed.

- In the root directory of the backend project (where docker-compose.yml is located), run:

```bash
   docker-compose up --build
```

## Run the frontend using npm:

- In the root directory of the frontend project run:

```bash
   npm start
```

### You can find more details in the README of each specific project folder (backend and frontend).
