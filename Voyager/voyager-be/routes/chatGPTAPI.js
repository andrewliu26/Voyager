const express = require('express');
const router = express.Router();
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const { itinerarySchema, Itinerary , findAll, saveItinerary} = require('../files/itinerary');

const apiKey = chatGPTConfig.chatGPTkey;

mongoose.connect('mongodb://127.0.0.1/travelitinerary', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB: ', error));

itinerarySchema.methods.saveItinerary = function () {
    return this.save();
};

itinerarySchema.statics.findAll = function () {
    return this.find();
}

router.use(bodyParser.json());

router.post('/create-itinerary', async (req, res) => {
    const { itineraryLength, location } = req.body;

    const inputText = `Generate a ${itineraryLength}-day itinerary for ${location}`;
    const requestBody = {
        prompt: inputText,
        max_tokens: 100,
        temperature: 0.7,
        n: 1
    };
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        }
    };

    const generatedItinerary = `Generated itinerary based on '${inputText}'`;

    res.json({generatedItinerary});

    /*try {

       const { userMessage } = req.body;


       const response = await axios.post(chatGPTConfig.chatGPTAPIEndpoint, requestBody, config);

       const itinerary = response.data.choices[0].text.trim();

   } catch(error) {
       console.error('Error:', error.message);
       res.status(500).json({error: 'Something went wrong. '});
   }*/

});

router.post('/save-itinerary', (req, res) => {
    const { title, details } = req.body;

    const itinerary = new Itinerary({
        title,
        details
    });

    itinerary.save()
        .then(() => {
            res.json({ savedItinerary: 'Itinerary saved successfully '});
        })
        .catch((error)=> {
            console.error('Error saving itinerary:', error);
            res.status(500).json({error: 'Failed to save itinerary'});
        });
});

router.get('/saved-itineraries', (req, res) => {
    Itinerary.find()
        .then((savedItineraries) => {
            res.json({savedItineraries});
        })
        .catch((error) => {
            console.error('Error retrieving saved itineraries: ', error);
            res.status(500).json({ error: 'Failed to retrieve saved itineraries'});
        });
});

module.exports = router;