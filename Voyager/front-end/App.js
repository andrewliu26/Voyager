import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, TextInput } from 'react-native';
import { generateItinerary } from "./api";

const GeneratingItinerariesScreen = () => {
   // const [inputText, setInputText ] = useState('');
    const [generatedItinerary, setGeneratedItinerary] = useState('');

    /*const handleGenerateItinerary = async () => {
        try {
            const itinerary = await generateItinerary(inputText);
            setGeneratedItinerary(itinerary);
        } catch (error) {
            console.error('Error generating itinerary:', error);
        }
    };*/

    const handleGenerateItinerary = async (duration, location) => {
        const inputText = `Generate a ${duration}-day itinerary for ${location}`;

        try {
            const itinerary = await generateItinerary(inputText);
            setGeneratedItinerary(itinerary);
        } catch {
            console.error('Error generating itinerary: ', error);
        }
    };

    return (
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
                <Button title="Search Itinerary" onPress={() => handleGenerateItinerary(7, 'Enter Location')} />
            </View>
            <Text>{generatedItinerary}</Text>
        </SafeAreaView>
    );
}

export default GeneratingItinerariesScreen;


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