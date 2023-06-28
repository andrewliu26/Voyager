import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

// config file
import googleConfig from '../config/googleConfig';

function GoogleUp () {
    const navigation = useNavigation();

    const CLIENT_ID = googleConfig.CLIENT_ID;
    const REDIRECT_URI = googleConfig.REDIRECT_URI;

    const handlePress = async () => {
        const result = await WebBrowser.openAuthSessionAsync(
            `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
            REDIRECT_URI
        );

        console.log('Opened Google Auth');

        if (result.type === "success") {
            const params = Linking.parse(result.url);
            const { email, name, picture } = params.queryParams;
            const user = { email, name, picture };

            console.log(user);

            navigation.replace('UserScreen', {userinfo: user});
            //navigation.replace('UserScreen', { screen: 'ProfileScreen', params: {user: user} });
        }
        else {
            console.error('ERROR: user authentication failed' + '\nType: ' + result.type);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.circle}>
                    <Text style={styles.text}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default GoogleUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        width: 200,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,

        elevation: 10,
    },
    text: {
        color: "#8cab84",
        fontSize: 15,
    },
});