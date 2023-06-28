import React, { useEffect, useState } from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { getSavedItineraries } from "../api";
import { deleteItinerary } from "../api";
import {useNavigation} from '@react-navigation/native';
function SavedItinScreen() {
    const navigation = useNavigation();
    const [savedItineraries, setSavedItineraries] = useState([]);

    useEffect(() => {
        fetchSavedItineraries();
    }, []);

    const fetchSavedItineraries = async () => {
        try {
            const itineraries = await getSavedItineraries();
            setSavedItineraries(itineraries);
        } catch (error) {
            console.error("Error fetching saved itineraries:", error);
        }
    };

    const handleItineraryPress = (itinerary) => {
        //console.log(itinerary);
        navigation.navigate('ItineraryDetailsScreen', { itinerary: itinerary });
    }

    const handleDeleteItinerary = async (itinerary) => {
        try {
            await deleteItinerary(itinerary._id);

            const updatedItineraries = savedItineraries.filter((item) => item._id !== itinerary._id);
            setSavedItineraries(updatedItineraries);
        } catch (error) {
            console.error("Error deleting itinerary", error);
        }
    };

    return (
        <View>
            <Text>Saved Itineraries</Text>
            {savedItineraries.map((itinerary) => (
                <TouchableOpacity
                    key={itinerary._id}
                    onPress={() => handleItineraryPress(itinerary)}
                >
                    <Text>{itinerary.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default SavedItinScreen;