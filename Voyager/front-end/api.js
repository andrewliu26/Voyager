const BASE_URL = 'http://localhost:3000/api'

export const generateItinerary = async (inputText) => {
    try {
        const response = await fetch(`${BASE_URL}/generate-itinerary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputText }),
        });
        const data = await response.json();
        return data.generatedItinerary;
    } catch(error) {
        console.error('Error generating itinerary:', error);
        throw error;
    }
};

export const saveItinerary = async (itineraryData) => {
    try {
        const response = await fetch(`${BASE_URL}/save-itinerary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itineraryData }),
        });
        const data = await response.json();
        return data.savedItinerary;
    } catch(error) {
        console.error('Error saving itinerary: ', error);
        throw error;
    }
};

export const getSavedItineraries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/saved-itineraries`);
        const data = await response.json();
        return data.savedItineraries;
    } catch (error) {
        console.error('Error retrieving saved itineraries:', error);
        throw error;
    }
};