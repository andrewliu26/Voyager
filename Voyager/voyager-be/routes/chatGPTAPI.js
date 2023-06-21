const express = require('express');
const router = express.Router();
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const apiKey = chatGPTConfig.chatGPTkey;

router.post('/create-itinerary', async (req, res) => {
   try {
       const { userMessage } = req.body;

       const response = await axios.post(chatGPTConfig.chatGPTAPIEndpoint, {
           prompt: userMessage,
           max_tokens: 100,
           temperature: 0.7,
           n: 1
       }, {
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${apiKey}`,
           },
       });

       const itinerary = response.data.choices[0].text.trim();

       res.json({ itinerary });
   } catch(error) {
       console.error('Error:', error.message);
       res.status(500).json({error: 'Something went wrong. '});
   }

});

module.exports = router;