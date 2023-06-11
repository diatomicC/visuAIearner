require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const result = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', 
    {
      model: "gpt-3.5-turbo",
      prompt: req.body.prompt,
      max_tokens: req.body.max_tokens || 60
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      }
    });

    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during API request');
  }
});

app.listen(process.env.PORT || 3001, () => console.log('Server started'));
