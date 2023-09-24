import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_KEY } from '@env';
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState(0);
  const [hakusana, setHakusana] = useState('');
  

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  }

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
    Alert.alert('No permission to get location')
    return;
    }
    //getLocation
    let location = await Location.getCurrentPositionAsync({});
    console.log(location.coords)
    setLocation(location.coords);
}

useEffect(() => {
  getLocation();
})

// const getData = async () => {
//   console.log(hakusana);
//   const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${hakusana}`)
//   console.log('Response status', response.status)
//   .then(response => response.json())
//   .then(responseJson => setLocation(responseJson.results))
//   .catch((error) => {
//     console.log('There has been a problem with your fetch operation: ' + error.message);
//       throw error;
//   //Alert.alert('Error', error);
//   });
//   setLocation(results.locations);
//   setHakusana('');
// };

  return (
    <View style={styles.container}>
      <MapView
        style={{ 
          flex: 1,
         width: '100%',
         height: '100%' 
          }}
        initialRegion={initial}
        region={{latitude: location.latitude,
          longitude: location.longitude}}
      >
        <Marker coordinate={{latitude: location.latitude,
          longitude: location.longitude}}
          title='something'
          dexcription='else'/>
      </MapView>
      <TextInput
      style={styles.kentta}
        placeholder='type'
        value={hakusana}
        onChangeText={text => setHakusana(text)}/>
      <Button title="Show" //onPress= {getData} 
      />
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
});
