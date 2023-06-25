const openaiClient = require('./api');
const chatGPTConfig = require('../config/chatGPTConfig');
const {Configuration, OpenAIApi, OpenAIAPI} = require('openai');

const configuration = new Configuration({
    apiKey: chatGPTConfig.chatGPTkey,
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    if(!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured"
            }
        });
        return;
    }

    const { itineraryLength, location } = req.body;
    if (location.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid location",
            }
        });
        return;
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(itineraryLength, location),
            temperature: 0.6,
            max_tokens: 2048,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}

function generatePrompt(itineraryLength, location) {
    return `suggest a ${itineraryLength}-day itinerary for ${location}`;
}

/*const generate = async (itineraryLength, location) => {
    const response = await openaiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a ${itineraryLength}-day itinerary for the following location: ${location}`,
        max_tokens: 100,
        temperature: 0,
    })
    return response.data.choices[0].text;
}*/

//module.exports = generate;