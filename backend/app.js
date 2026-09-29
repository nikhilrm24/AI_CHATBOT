require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


function buildTutorPrompt(message) {
    return `
<user_question>
${message}
</user_question>

<requirements>
- Explain the concept clearly.
- Assume the user is a beginner.
- Give one simple example.
- Use simple English.
- Do not unnecessarily repeat information.
</requirements>
`;
}



app.post("/api/chat", async (req, res) => {

    try {
        const message = req.body.message;
        const prompt = buildTutorPrompt(message);

        const stream = await ai.models.generateContentStream({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
                systemInstruction: `
                    You are a helpful programming tutor.

                    Your job is to teach programming
                    concepts clearly and accurately.
                `
            }
        });

        for await (const chunk of stream) {
            res.write(chunk.text);
        }

        res.end();

    } catch (e) {

        console.error(e);

        res.status(500).json({
            error: "Something went wrong"
        });
    }
});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});




