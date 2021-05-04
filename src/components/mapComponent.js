

import React, { Component } from 'react';
import MapView, { View, Text, PROVIDER_GOOGLE, Marker, Callout, StyleSheet } from 'react-native-maps';
import { styles } from './style';
import Geolocation from 'react-native-geolocation-service';


export default class MapScreen extends Component {
  constructor(props) {
    super(props)
    this.userElevation = this.userElevation.bind(this);
    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      userElevation: 0,
      userMarker: null,
    };
  }

  userElevation = () => {
    let elevateCoordinates = this.state.userLatitude + "," + this.stateuserLongitude;
    let elevationCoordinates = elevateCoordinates.toString();
    console.log(elevationCoordinates);
    return fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results[0].elevation),
          this.setState({ userElevation: responseJson.results[0].elevation });
      })
      .catch((error) => {
        console.error(error);
      });

  }
  componentDidMount() {
    Geolocation.watchPosition(
      (position) => {
        this.setState({
          userLatitude: pos.coords.latitude,
          userLongitude: pos.coords.longitude,
        });

      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.locationWatchId);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          mapType="terrain"
          style={styles.map}
          region={{
            latitude: this.state.userLatitude,
            longitude: this.state.userLongitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }}>
            <Callout onPress={this.userElevation}>
              <Text>Lat:{this.state.userLatitude}</Text>
              <Text>lon:{this.state.userLongitude}</Text>
              <Text>Elevation:{this.state.userElevation}</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
  }
}


      //     <View style={styles.container}>
      //     <MapView
      //         showsUserLocation
      //         mapType="terrain"
      //         //provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      //         style={styles.map}
      //         region={{
      //             latitude: this.state.userLatitude,
      //             longitude: this.state.userLatitude,
      //             latitudeDelta: 0.015,
      //             longitudeDelta: 0.0121,

      //             altitude: this.state.userAltitude
      //         }}
      //     >
      //         <Marker
      //             coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLatitude, altitude: this.state.userAltitude }}
      //         >

      //             <Callout style={{ backgroundColor: "red", padding: 10 }}>
      //                 <Text>{this.state.userLatitude}</Text>
      //                 <Text>{this.state.userLongitude}</Text>
      //                 <Text>{this.state.userAltitude}</Text>
      //             </Callout>
      //         </Marker>
      //     </MapView>
      // </View>


// ]
// export default class MapComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       markers: []
//     }
//     this.handlePress = this.handlePress.bind(this)
//   }

//   // handlePress(e) {
//   //   this.setState({
//   //     markers: [
//   //       ...this.state.markers,
//   //       {
//   //         coordinate: e.nativeEvent.coordinate,
//   //         key: Math.round(Math.random()* 10000000000)
//   //       }
//   //     ]
//   //   })
//   // }

//   render() {
//     return (
//       <>
//         <MapView
//           showsUserLocation
//           followsUserLocation
//           // provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           initialRegion={{
//             latitude: 35.0997,
//             longitude: -90.0108,
//             latitudeDelta: 0.09,
//             longitudeDelta: 0.035,
//           }}
//           onPress={this.handlePress}
//           >
//           {this.state.markers.map((marker) =>{
//             return (

//               <Marker  key={marker.key} {...marker} />
//             )
//           })}
//         </MapView>
//       </>
//     );
//   }
// }