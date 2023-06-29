import React from "react";
import {View, Text, ScrollView, StyleSheet} from "react-native";

function ItineraryDetailsScreen({ route }) {
    const { itinerary } = route.params;
    const title = itinerary.title;
    const details = (JSON.parse(itinerary.details)).response;
    //console.log(title, details);

    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.result}>{details}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 0,
        paddingVertical: 0,
    },
    title: {
        fontWeight: 'bold',
    },
    result: {

    },
});
export default ItineraryDetailsScreen;