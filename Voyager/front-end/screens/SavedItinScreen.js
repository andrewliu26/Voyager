import React, { useEffect, useState } from "react";
import {Text, View, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView} from "react-native";
import { getSavedItineraries } from "../api";
import { deleteItinerary } from "../api";
import {useNavigation} from '@react-navigation/native';
import axios from "axios";
import pexelConfig from "../config/pexelConfig";

const apiKey = pexelConfig.apiKey;

function SavedItinScreen() {
    const navigation = useNavigation();
    const [savedItineraries, setSavedItineraries] = useState([]);
    const [backgroundImages, setBackgroundImages] = useState({});

    useEffect(() => {
        fetchSavedItineraries();
    }, []);

    useEffect(() => {
        loadBackgroundImages();
    }, [savedItineraries]);

    const fetchSavedItineraries = async () => {
        try {
            const itineraries = await getSavedItineraries();
            setSavedItineraries(itineraries);
        } catch (error) {
            console.error("Error fetching saved itineraries:", error);
        }
    };

    const loadBackgroundImages = async () => {
        const images = {};

        for(const itinerary of savedItineraries) {
            if(!backgroundImages[itinerary._id]) {
                try {
                    const locationImage = await getRandomLocationImage(itinerary.location);
                    images[itinerary._id] = locationImage;
                } catch (error) {
                    console.error("Error loading background image:", error);
                }
            }
        }

        setBackgroundImages((prevImages) => ({...prevImages, ...images}));
    };

    const getRandomLocationImage = async (location) => {
        const response = await axios.get(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(location)}&per_page=15&page=1`,
            {
                headers: {
                    Authorization: apiKey,
                },
            }
        );

        const photos = response.data.photos;
        if(photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * photos.length);
            return photos[randomIndex].src.large;
        }

        return "fallback-image-url";
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

    const getBackgroundImageForItinerary = (itinerary) => {
        return backgroundImages[itinerary._id] || "fallback-image-url";
    };

    return (
        <SafeAreaView style={styles.container}>
            {savedItineraries && savedItineraries.map((itinerary) => (
                <TouchableOpacity
                    key={itinerary._id}
                    style={styles.button}
                    onPress={() => handleItineraryPress(itinerary)}
                >
                    <Text style={styles.buttonText}>{itinerary.title}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 40,
    },
    button: {
        borderRadius: 25, // Adjust the value to control the roundness of the button
        backgroundColor: "#7ea275", // Adjust the background color of the button
        padding: 10,
        width: 300,
        marginBottom: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    imageBackground: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        resizeMode: "cover",
    },
});

export default SavedItinScreen;