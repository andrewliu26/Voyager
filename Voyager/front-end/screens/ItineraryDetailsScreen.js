import React from "react";
import {View, Text, ScrollView, StyleSheet} from "react-native";

function ItineraryDetailsScreen({ route }) {
    const { itinerary } = route.params;
    console.log(itinerary.title, itinerary.details);

    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <Text>Title: {itinerary.title}</Text>

                <Text style={styles.result}>Details: {itinerary.details}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 0,
        paddingVertical: 0,
    },
});
export default ItineraryDetailsScreen;