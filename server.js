const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

// API Endpoint
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const openAiResponse = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: userMessage,
                max_tokens: 150
            })
        });

        const data = await openAiResponse.json();
        const responseText = data.choices[0].text.trim();

        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ response: 'Error occurred while communicating with OpenAI.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
