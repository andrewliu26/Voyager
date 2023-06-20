const express = require('express');
const router = express.Router();
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const apiKey = chatGPTConfig.chatGPTkey;

router.post('/chat', async (req, res) => {
   try {
       const userInput = req.body.message;

       const response = await axios.post(chatGPTConfig.chatGPTAPIEndpoint, {
           prompt: userInput,
           max_tokens: 50,
           temperature: 0.7,
           n: 1
       }, {
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${apiKey}`,
           },
       });

       const chatResponse = response.data.choices[0].text.trim();

       res.json({ message: chatResponse });
   } catch(error) {
       console.error('Error:', error.message);
       res.status(500).json({error: 'Something went wrong. '});
   }

    /*const { message } = req.body;
    console.log(message);
    userInterface.prompt();
    userInterface.on("line", async input => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: input}
            ]
        })
        res.send(completion.data.choices[0].message);
        userInterface.prompt();
    })*/


});

module.exports = router;