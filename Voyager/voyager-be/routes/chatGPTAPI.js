const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const { itinerarySchema, Itinerary , findAll, saveItinerary} = require('../files/itinerary');
const weatherConfig = require('../config/weatherConfig');



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



router.post('/generate-itinerary',  async (req, res) => {

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

router.get('/search-location', async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get(
            'http://dataservice.accuweather.com/locations/v1/cities/search',
            {
                params: {
                    apiKey: weatherConfig.apiKey,
                    q: query,
                },
            }
        );

        const locations = response.data[0];
        res.json({locations});
    } catch(error) {
        console.error('Error searching for location:', error);
        res.status(500).json({error: 'Failed to search location'});
    }
});

module.exports = router;