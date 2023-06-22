import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { View, SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from "react-native-fbsdk";

LoginManager.setLoginBehavior('web_only');
firebase.auth().useDeviceLanguage();

const App = () => {
    const handleFacebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                console.log('User cancelled the login process');
            } else {
                const tokenData = await AccessToken.getCurrentAccessToken();
                const credential = auth.FacebookAuthProvider.credential(tokenData.accessToken);
                await auth().signInWithCredential(credential);
                console.log(tokenData.accessToken);
                // Send the access token to the backend for authentication
            }
        } catch (error) {
            console.log(error);
        }
    };

  const [userMessage, setUserMessage] = useState('');
  const [itinerary, setItinerary] = useState('');

  const handleCreateItinerary = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create-itinerary', { userMessage });
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
          <Button title="Login with Facebook" onPress={handleFacebookLogin} />
      </SafeAreaView>
  );

  return (
      <SafeAreaView style={styles.container}>
          <View style={{ width: '100%', flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>

          </View>
          <View style={{ width: '100%', flex: 5, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
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
          </View>
          <View style={{ width: '100%', flex: 3, backgroundColor: '#fff', alignItems: 'center' }}>
              <Text>Generated Itinerary:</Text>
              <Text>{itinerary}</Text>
          </View>
      </SafeAreaView>
  );

};

export default App;
