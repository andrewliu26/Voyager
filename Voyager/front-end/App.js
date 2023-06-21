/*
import react from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
*/
import * as axios from "react-native/Libraries/TurboModule/TurboModuleRegistry";
/*
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native';

const App = () => {
  const [userMessage, setUserMessage] = useState('');
  const [itinerary, setItinerary] = useState('');

  const handleCreateItinerary = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/create-itinerary', { userMessage });
      setItinerary(response.data.itinerary);
    } catch (error) {
      console.error(error);
    }
  };

  // styles for components
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
      },
  });

  return (
      <SafeAreaView style={styles.container}>
        <TextInput
            style={{ width: 200,
                    height: 40,
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    borderColor: 'gray',
                    borderWidth: 1
            }}
            onChangeText={text => setUserMessage(text)}
            value={userMessage}
            placeholder="Enter a message"
        />
        <Button title="Create Itinerary" onPress={handleCreateItinerary} />
        <Text>Generated Itinerary:</Text>
        <Text>{itinerary}</Text>
      </SafeAreaView>
  );
};

export default App;
