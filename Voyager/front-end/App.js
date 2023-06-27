import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ipConfig from "./config/ipConfig";

const hostServer = ipConfig.hostServer;

// screens
import SettingsScreen from "./screens/SettingsScreen";
import GenerateItineraryScreen from "./screens/GenItinScreen";

const Tab = createBottomTabNavigator();
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
                        } else if(route.name === 'Settings') {
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',

                })}>
                <Tab.Screen name="Generate Itinerary" component={GenerateItineraryScreen}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles= StyleSheet.create({

});