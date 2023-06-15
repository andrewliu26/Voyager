const express = require('express');
const router = express.Router();
const weatherConfig = require('../config/weatherConfig');

//weather details and city details
router.get('/', async(req, res, next) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let rawData = await fetch(weatherConfig.weatherCityURL + weatherConfig.weatherConfigkeyCity + "q=london", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(JSON.parse(JSON.stringify(result[0])));
            let weather = JSON.parse(JSON.stringify(result[0]));
            return JSON.parse(JSON.stringify(result[0]));
        })
        .then(locationData => res.json(locationData))
        .catch(error => console.log('error', error));


    /*let cityData = await fetch(weatherConfig.weatherURL + req.query.key + weatherConfig.weatherConfigkeyDetails, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .then(weatherData => res.json(weatherData))
        .catch(error => console.log('error', error));*/
})

module.exports = router;