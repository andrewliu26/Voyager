import React, {useState} from "react";
import ipConfig from "../config/ipConfig";
import {Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";

function GenerateItineraryScreen () {
    //const [inputText, setInputText ] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [lengthInput, setLengthInput] = useState('');
    const [generatedItinerary, setGeneratedItinerary] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const onSubmit = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        setResult('');
        try {
            console.log(JSON.stringify({lengthInput, locationInput}));
            const response = await fetch(ipConfig.hostServer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({lengthInput, locationInput}),
            });
            const data = await response.json();
            setResult(JSON.parse(JSON.stringify(data)));
        } catch (e) {
            Alert.alert("Couldn't generate itinerary", e.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.title}>Generating a new Itinerary</Text>
            </View>
        );
    }

    const onTryAgain = () => {
        setResult('');
    };

    if (result) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    Here is your generated itinerary 💡
                </Text>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.result}>{result.response}</Text>

                </ScrollView>
                <Pressable onPress={onTryAgain} style={styles.button}>
                    <Text style={styles.buttonText}>Back to Generate Itinerary</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.label}>Itinerary Length</Text>
                <TextInput
                    placeholder="Days"
                    keyboardType="numeric"
                    style={styles.input}
                    value={lengthInput.toString()}
                    onChangeText={(s) => setLengthInput(Number.parseInt(s || "0"))}
                />

                <Text style={styles.label}>Location Input</Text>
                <TextInput
                    placeholder="Location"
                    style={styles.input}
                    value={locationInput}
                    onChangeText={setLocationInput}
                />
                <Pressable onPress={onSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Generate itinerary</Text>
                </Pressable>
                <StatusBar style="auto"/>
            </View>
        </SafeAreaView>
    );
}

export default GenerateItineraryScreen;

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        margin: 10,
    },
    scrollView: {
        marginHorizontal: 0,
        paddingVertical: 0,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 10,
    },

    input:{
        fontSize: 16,
        borderColor: '#353740',
        borderWidth: 1,
        borderRadius: 4,
        padding: 16,
        marginTop: 6,
        marginBottom: 12
    },
    label:{
        fontSize: 16,
        color: "gray",
    },

    selectorContainer:{
        flexDirection: "row",
    },

    selector: {
        flex: 1,
        textAlign: "center",
        backgroundColor: "gainsboro",
        margin: 5,
        padding: 16,
        borderRadius: 5,
        overflow: "hidden",
    },

    button: {
        marginTop: 20,
        backgroundColor: "#10a37f",
        padding: 16,
        borderRadius: 4,
        alignItems: "center",
        marginVertical: 6,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },

    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 10,
    },
    loading: {
        width: "100%",
    },

});