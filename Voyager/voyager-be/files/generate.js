const openaiClient = require('./api');
const chatGPTConfig = require('../config/chatGPTConfig');
const {Configuration, OpenAIApi, OpenAIAPI} = require('openai');


const configuration = new Configuration({
    apiKey: chatGPTConfig.chatGPTkey,
});

const openai = new OpenAIApi(configuration);

const generate = async (itineraryLength, location) => {
    console.log(`${itineraryLength}, ${location}`);
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a ${itineraryLength}-day itinerary for the following location: ${location}`,
        max_tokens: 2048,
        temperature: 0.6,
    })
    return response.data.choices[0].text;
}

module.exports = generate;



//module.exports = generate;

/*  if(!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured"
            }
        });
        return;
    }*/

//const itineraryLength = req.body.itineraryLength;
//const location = req.body.location;
/* if (!req || !res) {
     res.status(400).json({
         error: {
             message: "Please provide both itineraryLength and location in the request body",
         },
     });
     return;
 }*/