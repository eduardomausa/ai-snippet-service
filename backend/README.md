# 📘 Snippet Summarizer API

A Node.js + Express REST API that summarizes text using Google's Gemini model and stores snippets in MongoDB.

---

## 🌍 Repository

**Public URL:** [https://github.com/eduardomausa/ai-snippet-service/tree/master/backend](https://github.com/eduardomausa/ai-snippet-service/tree/master/backend)

---

## ⚙️ Requirements

- Node.js ≥ 22
- npm
- MongoDB (local or Docker)
- Gemini API Key from Google AI Studio

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
MONGODB_URI=mongodb://mongo:27017/snippets
```

## 1. Install dependencies

npm install

## 2. Run the app and MongoDB via Docker Compose

docker-compose up --build

## ➕ POST /snippets — Create a Snippet

Summarizes a given text using the Gemini API and stores the result in MongoDB.

### Request body

{
"text": "This is a long text that needs to be summarized."
}

### Curl Example

curl -X POST http://localhost:3000/snippets \
 -H "Content-Type: application/json" \
 -d '{"text": "This is a long text that needs to be summarized."}'

## 📄 GET /snippets/:id — Get a Snippet by ID

Retrieves the full snippet object (original + summary) from the database.

### URL Params

id: string - The ID of the snippet

### Curl Example

curl -X GET http://localhost:3000/snippets/663f7b5d59fd3a45c5f0c102 \
 -H "Content-Type: application/json"
