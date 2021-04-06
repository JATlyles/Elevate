import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import LocationDisplay from './src/components/locationDisplayComponent';

export default class App extends React.Component {
  state = {
    coordinates: [
      { name: 1, latitude: 37.0025259, longitude: -122.4351431 },
      { name: 2, latitude: 37.7896386, longitude: -122.421646 },
      { name: 3, latitude: 37.7665428, longitude: -122.4161628 },
      { name: 4, latitude: 37.7734153, longitude: -122.4577787 },
      { name: 5, latitude: 37.7948605, longitude: -122.4596065 },
      { name: 6, latitude: 37.0025259, longitude: -122.4351431 },

    ]
  }

 



  render() {

function Console (){
  console.log('hello')
}
    return (
      <>
      <MapView
      showsUserLocation
      followsUserLocation
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 37.7896386,
          longitude: -122.421646,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035
        }}
      >
        <Marker
          coordinate={{ latitude: 36.18468, longitude: -85.48911 }}
          title={'moms house'}>

        </Marker>
       <LocationDisplay/>
      </MapView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  map: {
    height: '100%'
  }
})

