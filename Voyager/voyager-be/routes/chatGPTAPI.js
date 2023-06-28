const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch');
const chatGPTConfig = require('../config/chatGPTConfig');
const { Configuration, OpenAIApi } = require('openai');
const readline = require('readline');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const { itinerarySchema, Itinerary , findAll, saveItinerary} = require('../files/itinerary');
const weatherConfig = require('../config/weatherConfig');
const openaiClient = require('openai');
const generate = require("../files/generate");


router.use(cors());

const apiKey = chatGPTConfig.chatGPTkey;

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/travelitinerary', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB: ', error));

itinerarySchema.methods.saveItinerary = function () {
    return this.save();
};

itinerarySchema.statics.findAll = function () {
    return this.find();
}




router.post('/generate-itinerary',  async (req, res) => {
    //const { itineraryLength, location } = req.body;
    const itineraryLength = req.body.lengthInput;
    const location = req.body.locationInput;

    console.log(itineraryLength, location);
    try {
    const query = await generate(itineraryLength, location);
        res.json({response: query});
    } catch(error) {
        console.error(error)
        res.status(500).send("Internal server error");
    }
});

router.post('/save-itinerary', (req, res) => {
    const { title, details } = req.body;
    console.log(title, details);
    const itinerary = new Itinerary({
        title: title,
        details: details
    });

    itinerary.save()
        .then(savedItinerary => {
            console.log('Saved Itinerary', savedItinerary);
            res.json({ savedItinerary: savedItinerary});
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

router.delete('/delete-itinerary/:id', (req, res) => {
    const { id } = req.params;

    Itinerary.findByIdAndDelete(id)
        .then((deletedItinerary) => {
            if(!deletedItinerary) {
                return res.status(404).json({error: 'Itinerary not found'});
            }
            console.log('Deleted Itinerary', deletedItinerary);
            res.json({deletedItinerary});
        })
        .catch((error) => {
            console.error('Error deleting itinerary:', error);
            res.status(500).json({error: 'Failed to delete itinerary'});
        });
});

router.get('/search-location', async (req, res) => {
    const { query } = req.query;

    try {
        const locationResponse = await axios.get(
            'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + weatherConfig.apiKey + '&q=' + query,
        );

       // const locations = locationResponse.data.map((location) => location.LocalizedName);
        const firstLocation = locationResponse.data[0]?.LocalizedName;
        res.json({firstLocation});
    } catch(error) {
        console.error('Error searching for location:', error);
        res.status(500).json({error: 'Failed to search location'});
    }
});

module.exports = router;