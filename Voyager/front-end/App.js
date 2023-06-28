import React, {useState} from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
// import ipConfig from "./config/ipConfig";
import 'expo-dev-menu';

// screens
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GenerateItineraryScreen from "./screens/GenItinScreen";
import SavedItinerariesScreen from "./screens/SavedItinScreen";
import ItineraryDetailsScreen from "./screens/ItineraryDetailsScreen";

// const hostServer = ipConfig.hostServer;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ItineraryStack = createNativeStackNavigator();

function ItineraryStackScreen() {
    return (
        <ItineraryStack.Navigator>
            <ItineraryStack.Screen name = "Itineraries" component={SavedItinerariesScreen}/>
            <ItineraryStack.Screen name = "ItineraryDetailsScreen" component={ItineraryDetailsScreen}/>
        </ItineraryStack.Navigator>
    )
}

function UserScreen({route: {params}}) {
    return (
        <Tab.Navigator initialRouteName={'ProfileScreen'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if(route.name === 'Generate Itinerary') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if(route.name === 'Saved Itineraries') {
                        iconName = focused ? 'ios-albums' : 'ios-albums-outline';
                    } else if(route.name === 'Profile') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: '#9FC696',
                tabBarInactiveTintColor: 'gray',

            })}>
            <Tab.Screen name="Generate Itinerary" component={GenerateItineraryScreen}/>
            <Tab.Screen name="Saved Itineraries" component={ItineraryStackScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen} initialParams={params}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{headerShown: false}}/>*/}
                <Stack.Screen name={'UserScreen'} component={UserScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles= StyleSheet.create({
    // add styles here
});