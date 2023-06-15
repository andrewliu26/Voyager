const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const weatherConfig = require('../config/weatherConfig');
const apiKey = weatherConfig.weatherConfigkey;

//weather details and city details
router.get('/:location', async(req, res, next) => {
    try {
        const locationURL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${req.params.location}`;
        const locationResponse = await fetch(locationURL);
        const locationData = await locationResponse.json();

        if (locationData.length == 0) {
            throw new Error('Location not found');
        }

        const locationKey = locationData[0].Key;

        const conditionsURL = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
        const conditionsResponse = await fetch(conditionsURL);
        const conditionsData = await conditionsResponse.json();

        const temperature = conditions[0].Temperature.Metric.Value;
        const weatherText = conditions[0].WeatherText;

        const response = {
            location: req.params.location,
            temperature,
            weatherText
        };

        res.json(response);
    } catch(error) {
        res.status(404).json({error: error.message});
    }

    /*const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let rawData = await fetch(weatherConfig.weatherCityURL + weatherConfig.weatherConfigkeyCity + "q=london", requestOptions)
        .then(response => response.json())
        .then(result => {
            weather = result[0];
            let cityData = fetch(weatherConfig.weatherURL + weather + weatherConfig.weatherConfigkey, requestOptions)
                .then(response => response.json())
                .then(result => {
                    //console.log(result);
                    return result;
                })
                .then(weatherData => res.json(weatherData))
                .catch(error => console.log('error', error));
            return result[0];

        })
        .then(locationData => res.json(locationData))
        .catch(error => console.log('error', error));*/


})

module.exports = router;