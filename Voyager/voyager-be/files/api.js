const { Configuration, OpenAIApi} = require("openai");
const chatGPTConfig = require('../config/chatGPTConfig');

const openApiKey = chatGPTConfig.chatGPTkey;

if(!openApiKey) {
    console.error('API Key is not set')
    process.exit(1)
}

const configuration = new Configuration({
    apiKey: openApiKey
})
const openai = new OpenAIApi(configuration)

module.exports = openai;