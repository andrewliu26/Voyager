import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text>Check the weather in:</Text>
      <TextInput
        style={styles.input}
        textAlign={'center'}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter a location"
        keyboardType="numeric"
      />
      
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
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e8e8e8',
    
  },
});
