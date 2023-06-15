const express = require('express');
const router = express.Router();
const weatherConfig = require('../config/weatherConfig');

router.get('/', async(req, res, next) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let rawData = await fetch(weatherConfig.weatherURL + weatherConfig.weatherConfigkey + weatherConfig.weatherLocation, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            return result;
        })
        .then(weatherData => res.json(weatherData))
        .catch(error => console.log('error', error));
})

module.exports = router;