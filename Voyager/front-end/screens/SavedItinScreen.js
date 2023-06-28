import React, { useEffect, useState } from "react";
import {Text, View, TouchableOpacity} from "react-native";
import { getSavedItineraries } from "../api";
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
        navigation.navigate('ItineraryDetailsScreen', { itinerary: itinerary });
    }

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