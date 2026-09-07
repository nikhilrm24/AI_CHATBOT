require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const express = require("express");

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {

    try {
        const message = req.body.message;

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: message
        });

        res.json({
            reply: response.text
        });

    } catch (e) {

        console.error(e);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});