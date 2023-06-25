import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Alert, Image} from "react-native";
import { generateItinerary, searchLocation } from "./api";
import ipConfig from "./config/ipConfig"

const hostServer = ipConfig.hostServer;


export default function GeneratingItinerariesScreen () {
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
            //const itinerary = await generateItinerary(lengthInput, locationInput);
            //console.log(itinerary);
           // setGeneratedItinerary(JSON.stringify(itinerary));
            //return itinerary;
            //setResult(JSON.stringify(itinerary));
            //return itinerary?.response;
            console.log(JSON.stringify({lengthInput, locationInput}));
            const response = await fetch(ipConfig.hostServer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({lengthInput, locationInput}),
            });
            const data = await response.json();
            setResult(JSON.stringify(data));
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
                <Text style={styles.result}>{result}</Text>
                <Pressable onPress={onTryAgain} style={styles.button}>
                    <Text style={styles.buttonText}>Try again</Text>
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
                    onChangeText={(s) => setLengthInput(Number.parseInt(s))}
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

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        margin: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
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
        marginTop: "auto",
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

    /* const handleGenerateItinerary = async (itineraryLength, location) => {
         try {
             const searchResults = await searchLocation(location);
             let locations;
             locations = searchResults.locations;

             const itinerary = await generateItinerary(itineraryLength, locations);
             //console.log(itinerary);
             setGeneratedItinerary(JSON.stringify(itinerary));
             return itinerary;
             //return itinerary?.response;
         } catch (error) {
             console.error('Error generating itinerary on App.js:', error);
         }

     };*/


    /*return (
        <SafeAreaView style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        }}>
            <Text>Generate Your Itinerary</Text>
            <View style={{ marginVertical: 10 }}>
                <Button title="7-day Itinerary" onPress={() => handleGenerateItinerary(7, 'New York')} />
            </View>
            <View style={{ marginVertical: 10 }}>
                <Button title="14-day Itinerary" onPress={() => handleGenerateItinerary(14, 'New York')} />
            </View>
            <View style={{ marginVertical: 10 }}>
                <TextInput
                    placeholder="Enter Location"
                    value={locationInput}
                    onChangeText={setLocationInput}
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginBottom: 10,
                    }}
                />
            </View>
            <Text>{generatedItinerary}</Text>
        </SafeAreaView>
    );*/



//export default GeneratingItinerariesScreen;


/*import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

const googleConfig = require('./config/googleConfig');
WebBrowser.maybeCompleteAuthSession();

export default function App() {
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: googleConfig.androidKey,
        iosClientId: googleConfig.iosKey,
        webClientId: googleConfig.webKey,
    });

    React.useEffect(() => { handleGoogleSignIn(); }, [response]);

    async function handleGoogleSignIn() {
        const user = await asyncStorage.getItem("@user");
        if (!user) {
            // make request
            if (response?.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        }
        else {
            // look for user object
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        }
        catch (error) {
        }
    };

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(userInfo, null, 2)}</Text>
            <Button title="Sign in with Google" onPress={() => promptAsync} />
            <Button title="Sign out of Google" onPress={() => AsyncStorage.removeItem("@user")} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});*/