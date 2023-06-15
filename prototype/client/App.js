import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';

export default function App() {
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Enter a location"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.searchButton}>
        <Pressable
          onPress={() => {console.log('Search pressed')}}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#000' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Search' : 'Search'}</Text>
          )}
        </Pressable>
      </View>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // View styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchBar: {
    width: 180,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 50,
    height: 100,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Component styles
  input: {
    color: '#888888',
    borderColor: '#299BF7',
    //borderColor: '#bfbfbf',
    padding: 10,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    margin: 10,
    height: 40,
    width: 200,
  },
  wrapperCustom: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    //backgroundColor: '#bfbfbf',
    backgroundColor: '#299BF7',
    height: 40,
    width: 70,
  },
  text: {
    color: '#fff'
  }
});
