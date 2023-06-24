const openaiClient = require('./api');
const chatGPTConfig = require('../config/chatGPTConfig');

const generate = async (itineraryLength, location) => {
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a ${itineraryLength}-day itinerary for the following location: ${location}`,
        max_tokens: 100,
        temperature: 0,
    })
    return response.data.choices[0].text;
}

module.exports = generate;