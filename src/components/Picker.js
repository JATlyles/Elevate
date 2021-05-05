import React, { Component } from "react";
import { StyleSheet, View, Button, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import MapView, { MAP_TYPES, PROVIDER_DEFAULT, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// const elevator = new google.maps.ElevationService();
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.onMarkerCalloutPress = this.onMarkerCalloutPress.bind(this);
        this.onUserLocationMarkerCalloutPress = this.onUserLocationMarkerCalloutPress.bind(this);
        this.getElevationDifference = this.getElevationDifference.bind(this);
        this.state = {
            markerLat: 0,
            markerLon: 0,
            userLatitude: 0,
            userLongitude: 0,
            userElevation: 0,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
            eleCoordinates: 0,
            markerElevation: 0,
            marker: null,
            elevationDifference: 0,

        }
    }

    onUserLocationMarkerCalloutPress = async () => {
        let userElevateCoordinates = this.state.userLatitude + "," + this.state.userLongitude;
        let userElevationCoordinates = userElevateCoordinates.toString();
        return await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results[0].elevation),
                    this.setState({ userElevation: responseJson.results[0].elevation });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    onMarkerCalloutPress = async () => {
        let elevateCoordinates = this.state.markerLat + "," + this.state.markerLon;
        let elevationCoordinates = elevateCoordinates.toString();
        return await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results[0].elevation),

                    this.setState({ markerElevation: responseJson.results[0].elevation });
            })
            .catch((error) => {
                console.error(error);
            });

    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            pos => {
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
    getElevationDifference = () => {
        if (this.state.userElevation != 0 && this.state.markerElevation != 0) {
            const difference = this.state.userElevation - this.state.markerElevation;
            this.setState({
                elevationDifference: difference
            });

        } else {
            this.setState({
                elevationDifference: 0,
            });

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsCompass={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    // showsBuildings={true}
                    // showsPointsOfInterest={false}
                    mapType="terrain"
                    initialRegion={{
                        latitude: this.state.userLatitude,
                        longitude: this.state.userLongitude,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.008,
                    }}
                    onPress={(e) =>
                        this.setState({
                            markerLat: e.nativeEvent.coordinate.latitude,
                            markerLon: e.nativeEvent.coordinate.longitude,
                            marker: e.nativeEvent.coordinate
                        })}>
                    <Marker key={1} coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }} >
                        <Callout onPress={this.onUserLocationMarkerCalloutPress}>
                            <Text>Lat: {this.state.userLatitude}</Text>
                            <Text>lon: {this.state.userLongitude}</Text>
                            <Text>Elevation:{this.state.userElevation}</Text>

                        </Callout>
                    </Marker>
                    {
                        this.state.marker &&
                        <Marker coordinate={this.state.marker} pinColor={'gold'}
                            onPress={this.onMarkerCalloutPress}>

                            <Callout key={2} onPress={this.getElevationDifference} >

                                <Text>Lat:{this.state.markerLat}</Text>
                                <Text>lon:{this.state.markerLon}</Text>
                                <Text>Elevation:{this.state.markerElevation}</Text>
                                <Text>{this.state.elevationDifference}</Text>
                            </Callout>
                            {/* <MapView.Callout tooltip><Text>The Elevation Difference is:{this.state.markerElevation}</Text></MapView.Callout> */}
                        </Marker>
                    }


                </MapView>
                {/* <View style={styles.buttonsContainer}>
          <Text>'Difference:'{this.state.elevationDifference}</Text>
          <Button style={styles.txtButton} title={"Elevation Difference"} onPress={this.getElevationDifference()} /> */}

                {/* </View> */}
                <TouchableOpacity
                    style={[styles.touchable]}
                    onPress={() => this.getElevationDifference}
                >
                    <Text style={styles.touchableText}>Elevation Difference</Text>
                </TouchableOpacity>
                {/* <View
          style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '50%', //for center align
            alignSelf: 'flex-end' //for align to right
          }}
        >
          <Button title={"Elevation Difference"} onClick={this.getElevationDifference()} />
        </View> */}
            </View>

        );
    }
}



const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },

    touchable: {
        backgroundColor: "violet",
        padding: 10,
        margin: 10
    },
    touchableText: {
        color: 'white',
        fontSize: 24
    },
});