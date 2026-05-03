const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { db, initDB } = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY ||

    // Initialize Database
    initDB();

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: false // disabled for simplicity in dev/hackathon
}));
app.use(cors());
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for interacting with Gemini API
app.post('/api/ask', async (req, res) => {
    try {
        const { query, history } = req.body;

        const systemPrompt = `You are "Chunav Sahayak" — an AI assistant specializing in Indian elections. You provide accurate, factual, nonpartisan information. Rules: 1. NEVER recommend a political party or candidate 2. ALWAYS provide factual, nonpartisan information 3. Use simple, clear language 4. Include relevant Article numbers or legal references where applicable 5. Keep responses concise but comprehensive 6. Format with bold headings and bullet points for readability 7. If asked about something unrelated to Indian elections, politely redirect to election topics 8. Use Hindi terms in parentheses where appropriate (e.g., Lok Sabha (लोक सभा))`;

        const contents = history || [];
        contents.push({
            role: "user",
            parts: [{ text: query }]
        });

        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await global.fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: contents,
                generationConfig: { temperature: 0.7, topP: 0.9, topK: 40, maxOutputTokens: 1024 }
            })
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: "Gemini API error" });
        }

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        res.json({ answer: aiText });
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ error: 'Failed to fetch AI response' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
