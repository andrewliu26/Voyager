import React from "react";
import { View, Text } from "react-native";

function ItineraryDetailsScreen({ route }) {
    const { itinerary } = route.params;
    console.log(itinerary.title, itinerary.details);

    return (
        <View>
            <Text>Title: {itinerary.title}</Text>
            <Text>Details: {itinerary.details}</Text>
        </View>
    );
}

export default ItineraryDetailsScreen;