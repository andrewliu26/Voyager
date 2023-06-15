const express = require('express');
const fetch = require('isomorphic-fetch');
const router = express.Router();
const weatherConfig = require('../config/weatherConfig');
const apiKey = weatherConfig.weatherConfigkey;

//weather details and city details
router.get('/weather/:location', async(req, res, next) => {
    try {
        const locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${req.params.location}`;
        const locationResponse = await fetch(locationURL);
        const locationData = await locationResponse.json();

        if (locationData.length === 0) {
            throw new Error('Location not found');
        }

        const locationKey = locationData[0].Key;

        const conditionsURL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
        const conditionsResponse = await fetch(conditionsURL);
        const conditionsData = await conditionsResponse.json();

        const temperature = conditionsData[0].Temperature.Metric.Value;
        const weatherText = conditionsData[0].WeatherText;

        const response = {
            location: req.params.location,
            temperature,
            weatherText
        };

        res.json(response);
    } catch(error) {
        res.status(404).json({error: error.message});
    }

});

module.exports = router;