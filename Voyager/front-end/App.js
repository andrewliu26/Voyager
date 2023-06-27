import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ipConfig from "./config/ipConfig";

const hostServer = ipConfig.hostServer;

// screens
import ProfileScreen from "./screens/ProfileScreen";
import GenerateItineraryScreen from "./screens/GenItinScreen";
import SavedItinScreen from "./screens/SavedItinScreen";
import ItineraryDetailsScreen from "./screens/ItineraryDetailsScreen";
import {createNativeStackNavigator} from "react-native-screens/native-stack";

const Tab = createBottomTabNavigator();
const ItineraryStack = createNativeStackNavigator();

function ItineraryStackScreen() {
    return (
        <ItineraryStack.Navigator>
            <ItineraryStack.Screen name = "Itineraries" component={SavedItinScreen}/>
            <ItineraryStack.Screen name = "Details" component={ItineraryDetailsScreen}/>
        </ItineraryStack.Navigator>
    )
}
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
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
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',

                })}>
                <Tab.Screen name="Generate Itinerary" component={GenerateItineraryScreen}/>
                <Tab.Screen name="Saved Itineraries" component={ItineraryStackScreen}/>
                <Tab.Screen name="Profile" component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles= StyleSheet.create({

});