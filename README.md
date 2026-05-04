<div align="center">

# 🗳️ Chunav Sahayak — चुनाव सहायक

### *Your AI-Powered Indian Election Awareness Assistant*

**Understand. Participate. Empower.**

<br>

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*Chunav Sahayak is a comprehensive, interactive web platform designed to educate Indian citizens about the democratic election process. Powered by **Google Gemini AI**, it provides accurate, factual, and **nonpartisan** information about elections, voting procedures, and civic rights.*

</div>

---

<details open>
<summary><b>📑 Table of Contents</b></summary>

- [✨ Features](#-features)
- [🏗️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [☁️ Deployment](#-deployment)
- [🧩 Architecture & API](#-architecture--api)
- [🤝 Contributing](#-contributing)
- [🙏 Acknowledgments](#-acknowledgments)

</details>

---

## ✨ Features

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>💬 Ask Anything (AI Chat)</h3>
      <ul>
        <li>Conversational AI powered by <b>Google Gemini 2.0 Flash</b></li>
        <li>Context-aware multi-turn conversations with history</li>
        <li>Built-in <b>nonpartisan guardrails</b></li>
        <li>Offline fallback knowledge base available</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📅 Election Timeline</h3>
      <ul>
        <li>Interactive <b>8-phase timeline</b> of the Indian election cycle</li>
        <li>Covers ECI announcement through Govt formation</li>
        <li>Expandable cards with detailed phase info</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>✅ How to Vote (Guide)</h3>
      <ul>
        <li>Visual <b>8-step voting guide</b></li>
        <li>Covers NVSP portal, EPIC card, EVM, & VVPAT</li>
        <li>Includes required documents checklist</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🧠 Test Yourself (Quiz)</h3>
      <ul>
        <li><b>10-question interactive quiz</b> on Indian elections</li>
        <li>Instant feedback with detailed explanations</li>
        <li>Progress tracking and score display</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🏗️ Tech Stack

<details>
<summary><b>Click to expand the technology stack details</b></summary>
<br>

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | HTML5, CSS3, JS | Glassmorphism UI, Responsive Design |
| **Backend** | Node.js 20+, Express 5 | API routing and server logic |
| **AI Engine** | Google Gemini 2.0 Flash | NLP and Conversational context |
| **Database** | SQLite 3 | Relational storage for offline knowledge |
| **Security** | Helmet.js, rate-limit | HTTP headers, abuse prevention |
| **Deployment**| Docker, Cloud Run | Containerized, easily scalable |

</details>

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

<details open>
<summary><b>1. Clone & Install</b></summary>

```bash
git clone https://github.com/abhishek78-ship-it/Chunav-Sahayak.git
cd Chunav-Sahayak
npm install
```
</details>

<details open>
<summary><b>2. Configuration</b></summary>

Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_secret_key_here
```
> [!IMPORTANT]  
> Never commit your `.env` file to version control. It is already included in `.gitignore`.
</details>

<details open>
<summary><b>3. Start the Server</b></summary>

```bash
npm start
```
*The application will be running at **http://localhost:3000***
</details>

---

## ☁️ Deployment

<details>
<summary><b>🐳 Docker Deployment</b></summary>

**1. Build the Docker Image:**
```bash
docker build -t chunav-sahayak .
```

**2. Run the Container:**
```bash
docker run -p 3000:3000 --env-file .env chunav-sahayak
```
</details>

<details>
<summary><b>🌐 Google Cloud Run</b></summary>

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
</details>

---

## 🧩 Architecture & API

<details>
<summary><b>📁 Project Structure</b></summary>

```text
Chunav-Sahayak/
├── public/                  # Frontend static assets
│   ├── index.html           # Main HTML (splash screen + app shell)
│   ├── index.css            # Complete CSS with glassmorphism design
│   ├── app.js               # Frontend logic (chat, quiz, timeline)
│   ├── data.js              # Knowledge base, quiz questions, timeline
│   └── logo.png             # Application logo
├── server.js                # Express server + Gemini API proxy
├── database.js              # SQLite database setup
├── package.json             # Dependencies & scripts
├── Dockerfile               # Docker container configuration
└── .env                     # Environment variables (API keys)
```
</details>

<details>
<summary><b>📡 API Endpoint: `/api/ask`</b></summary>

Send a question about Indian elections to the Gemini AI.

**Request:**
```json
{
  "query": "What is NOTA and how does it work?",
  "history": []
}
```

**Response:**
```json
{
  "answer": "**NOTA — None Of The Above** is a ballot option that..."
}
```
</details>

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

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