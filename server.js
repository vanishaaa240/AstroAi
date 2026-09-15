const express = require("express");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static("."));


/* =========================
   GROQ AI
========================= */

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


/* =========================
   CHAT API
========================= */

app.post("/api/chat", async (req, res) => {

    const message = req.body.message;

    console.log("User asked:", message);

    try {

        const completion = await groq.chat.completions.create({

            messages: [

                {
                    role: "system",
                   content:
    "You are AstroAI, a friendly astrology chatbot for a college project. " +
    "Your main purpose is to answer questions about zodiac signs, birth dates, horoscopes, personality traits, zodiac compatibility, elements, ruling planets, and general astrology. " +
    "If a user gives their birth date, identify their Western zodiac sign correctly. " +
    "Give positive, entertaining, and easy-to-understand astrology responses. " +
    "You can explain astrology concepts and give general horoscope-style guidance. " +
    "Always treat astrology as entertainment and never present predictions as certain facts. " +
    "Do not give serious medical, legal, or financial predictions. " +
    "Keep responses friendly, concise, and suitable for a college project."
                },

                {
                    role: "user",
                    content: message
                }

            ],

           model: "openai/gpt-oss-20b",

            temperature: 0.7,

            max_tokens: 300

        });


        const reply =
            completion.choices[0].message.content;


        res.json({
            reply: reply
        });


    } catch (error) {

        console.error("Groq API Error:", error);

        res.status(500).json({
            reply:
                "Sorry, AstroAI is having trouble connecting to the AI right now. 🔮"
        });

    }

});


/* =========================
   HOME PAGE
========================= */

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");

});


/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(
        `AstroAI server running at http://localhost:${PORT}`
    );

});