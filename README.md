<![CDATA[<div align="center">

# 🗳️ Chunav Sahayak — चुनाव सहायक

### *Your AI-Powered Indian Election Awareness Assistant*

**Understand. Participate. Empower.**

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

*Chunav Sahayak is a comprehensive, interactive web platform designed to educate Indian citizens about the democratic election process. Powered by **Google Gemini AI**, it provides accurate, factual, and **nonpartisan** information about elections, voting procedures, and civic rights.*

</div>

---

## ✨ Features

### 💬 Ask Anything (AI Chat)
- Conversational AI powered by **Google Gemini 2.0 Flash**
- Context-aware multi-turn conversations with chat history
- Built-in **nonpartisan guardrails** — never recommends parties or candidates
- Offline fallback knowledge base for when the API is unavailable
- Quick-access suggestion chips for common election questions

### 📅 Election Timeline
- Interactive **8-phase timeline** of the Indian election cycle
- From ECI announcement → Government formation
- Expandable cards with detailed information for each phase
- Covers MCC, nominations, scrutiny, campaigning, polling, counting, and results

### ✅ How to Vote — Step-by-Step Guide
- Visual **8-step voting guide** from registration to ballot verification
- Covers NVSP portal, EPIC card, EVM, VVPAT, and required documents
- Expandable detail sections with relevant tags

### 🧠 Test Yourself — Quiz
- **10-question interactive quiz** on Indian election knowledge
- Instant feedback with detailed explanations for every answer
- Progress tracking, score display, and full answer review
- Topics: voting age, NOTA, Lok Sabha, EVM, MCC, ECI, VVPAT, and more

### 📊 Key Facts Dashboard
- At-a-glance statistics about India's democracy
- 97 Crore+ voters, 543 Lok Sabha seats, 10.5 Lakh+ polling stations
- "Did You Know?" section with fascinating election trivia

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla CSS (Glassmorphism UI), Vanilla JavaScript |
| **Backend** | Node.js 20+, Express 5 |
| **AI Engine** | Google Gemini 2.0 Flash API |
| **Database** | SQLite 3 |
| **Security** | Helmet.js, express-rate-limit, CORS |
| **Fonts** | Inter, Outfit (Google Fonts) |
| **Containerization** | Docker |
| **Deployment** | Google Cloud Run |

---

## 📁 Project Structure

```
Chunav-Sahayak/
├── public/                  # Frontend static assets
│   ├── index.html           # Main HTML (splash screen + app shell)
│   ├── index.css            # Complete CSS with glassmorphism design
│   ├── app.js               # Frontend logic (chat, quiz, timeline, navigation)
│   ├── data.js              # Knowledge base, quiz questions, timeline data
│   ├── logo.png             # Application logo
│   └── bg.jpg               # Background image
├── server.js                # Express server + Gemini API proxy
├── database.js              # SQLite database setup
├── package.json             # Dependencies & scripts
├── Dockerfile               # Docker container configuration
├── .env                     # Environment variables (API keys)
├── .gitignore               # Git ignore rules
└── .dockerignore            # Docker ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/abhishek78-ship-it/Chunav-Sahayak.git
cd Chunav-Sahayak
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_secret_key_here
```

> [!IMPORTANT]
> Never commit your `.env` file to version control. It is already included in `.gitignore`.

### 4. Start the Server

```bash
npm start
```

The application will be running at **http://localhost:3000**

---

## 🐳 Docker Deployment

### Build the Docker Image

```bash
docker build -t chunav-sahayak .
```

### Run the Container

```bash
docker run -p 3000:3000 --env-file .env chunav-sahayak
```

---

## ☁️ Deploy to Google Cloud Run

```bash
# Authenticate with Google Cloud
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Build and deploy
gcloud run deploy chunav-sahayak \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=your_key_here"
```

---

## 🔐 Security Features

- **Helmet.js** — Sets secure HTTP headers
- **Rate Limiting** — 100 requests per 15 minutes per IP on `/api/` routes
- **CORS** — Cross-Origin Resource Sharing enabled
- **Nonpartisan Guardrails** — Detects and blocks politically biased queries
- **Environment Variables** — API keys stored securely in `.env`

---

## 🧩 API Reference

### `POST /api/ask`

Send a question about Indian elections to the Gemini AI.

**Request Body:**

```json
{
  "query": "What is NOTA and how does it work?",
  "history": []
}
```

**Response:**

```json
{
  "answer": "**NOTA — None Of The Above** ..."
}
```

| Field | Type | Description |
|---|---|---|
| `query` | `string` | The user's election-related question |
| `history` | `array` | Previous conversation turns for context |

---

## 🎨 Design Philosophy

Chunav Sahayak uses a **glassmorphism-inspired** design language with:

- 🎭 Frosted glass card effects with backdrop blur
- 🌈 Vibrant gradient accents inspired by the Indian tricolor
- ✨ Smooth micro-animations and hover transitions
- 📱 Fully responsive layout with mobile navigation drawer
- 🎯 Inter & Outfit typography from Google Fonts
- 🖼️ Indian flag splash screen with Ashoka Chakra

---

## 📖 Knowledge Coverage

The application covers comprehensive election topics including:

| Topic | Details |
|---|---|
| **EVM** | Electronic Voting Machines — history, security, and operation |
| **NOTA** | None Of The Above — Supreme Court ruling, implications |
| **Voter Registration** | Form 6, NVSP portal, EPIC card process |
| **Model Code of Conduct** | Rules, enforcement, and silence period |
| **Election Commission** | Article 324, composition, functions |
| **Lok Sabha** | 543 seats, representation, functions |
| **Required Documents** | 11 accepted photo IDs at polling booths |
| **VVPAT** | Voter Verifiable Paper Audit Trail |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Election Commission of India](https://eci.gov.in/)** — For authoritative election data
- **[Google Gemini AI](https://ai.google.dev/)** — For powering the AI assistant
- **[Constitution of India](https://legislative.gov.in/constitution-of-india/)** — Article 324 and election law references
- **[NVSP Portal](https://voters.eci.gov.in/)** — Voter registration information

---

<div align="center">

**Made with ❤️ for Indian Democracy**

*Empowering citizens with knowledge — because every vote counts!*

🇮🇳

</div>
]]>