const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: {
       type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);


module.exports = {
    itinerarySchema,
    Itinerary,
};