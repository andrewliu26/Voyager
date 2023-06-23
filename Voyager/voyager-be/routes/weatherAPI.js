const express = require('express');
const fetch = require('isomorphic-fetch');
const router = express.Router();
const weatherConfig = require('../config/weatherConfig');
const apiKey = weatherConfig.apiKey;

//weather details and city details
router.get('/:location', async(req, res, next) => {
    try {
        const locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${req.params.location}`;
        const locationResponse = await fetch(locationURL);
        const locationData = await locationResponse.json();

        if (locationData.length === 0) {
            throw new Error('Location not found');
        }

        const locationKey = locationData[0].Key;

        const response = {
            location: req.params.location,
        };

        res.json(response);
    } catch(error) {
        res.status(404).json({error: error.message});
    }

});

module.exports = router;