const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: String,
    details: String,
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);


module.exports = {
    itinerarySchema,
    Itinerary,
};