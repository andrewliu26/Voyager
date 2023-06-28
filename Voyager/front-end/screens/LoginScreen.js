import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';

// components
import Screen from '../components/Screen';
import GoogleUp from '../components/GoogleUp';

function LoginScreen () {
    const navigation = useNavigation();

    return (
        <Screen>
            <StatusBar style="auto"/>
            <View style={styles.bgContainer}>
                <View style={styles.emptyTop}></View>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/logo-500.png')}/>
                    <Text style={{fontSize: 40, margin: 5, fontWeight: 'bold', color: '#7ea275'}}>Voyager</Text>
                </View>
                <View style={styles.emptyMiddle}></View>
                <View style={styles.textContainer}>
                    <Text style={{color: '#404040'}}>Get started with smart itineraries</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <GoogleUp navigation={navigation}/>
                </View>
                <View style={styles.emptyBottom}></View>
            </View>
        </Screen>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    bgContainer: {
        flex: 0.75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTop: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyMiddle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyBottom: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        margin: 5,
    },
});