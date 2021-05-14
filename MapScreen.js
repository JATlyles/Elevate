import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Button, Alert } from 'react-native';
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { MediaQuery } from "react-native-responsive";


const onUserLocationMarker = async () => {
    let userElevateCoordinates = this.state.userLatitude + "," + this.state.userLongitude;
    let userElevationCoordinates = userElevateCoordinates.toString();
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`);
        const responseJson = await response.json();
        console.log(responseJson.results[0].elevation),
            this.setState({ userElevation: responseJson.results[0].elevation });
    } catch (error) {
        console.error(error);
    }

}

const locations = require('./locations.json');
export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onMarkerCalloutPress = this.onMarkerCalloutPress.bind(this);
        this.onUserLocationMarker = this.onUserLocationMarker.bind(this);
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
    componentDidMount() {
        Geolocation.getCurrentPosition(
            pos => {
                console.log(pos),
                    this.setState({
                        userLatitude: pos.coords.latitude,
                        userLongitude: pos.coords.longitude,
                    })
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, fastestInterval: 5000, showsBackgroundLocationIndicator: true, showLocationDialog: true }
        )

    }

    onUserLocationMarker = async () => {
        let userElevateCoordinates = this.state.userLatitude + "," + this.state.userLongitude;
        let userElevationCoordinates = userElevateCoordinates.toString();
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${userElevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`);
            const responseJson = await response.json();
            console.log(responseJson.results[0].elevation),
                this.setState({ userElevation: responseJson.results[0].elevation });
        } catch (error) {
            console.error(error);
        }

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


    getElevationDifference = () => {
        let difference = 0;
        if (this.state.userElevation != 0 && this.state.markerElevation != 0) {
            difference = this.state.userElevation - this.state.markerElevation;
            this.setState({
                elevationDifference: difference
            });

        } else {
            this.setState({
                elevationDifference: 0,
            });

        }

        console.log(difference);

    }



    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.blueTitle}>ELEVATE</Text>
                <MapView style={styles.map}
                    showsUserLocation={true}
                    userLocationCalloutEnabled={true}
                    provider={"google"}
                    userLocationFastestInterval={5000}
                    loadingEnabled={true}
                    scrollDuringRotateOrZoomEnabled={false}
                    zoomControlEnabled={true}
                    moveOnMarkerPress={false}
                    showsCompass={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    showsPointsOfInterest={true}
                    toolbarEnabled={true}
                    mapType="terrain"
                    region={{
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

                    <Marker key={1} coordinate={{ latitude: this.state.userLatitude, longitude: this.state.userLongitude }} onPress={this.onUserLocationMarkerCalloutPress}
                    >
                        <Callout >
                            <Text>Lat: {this.state.userLatitude}</Text>
                            <Text>lon: {this.state.userLongitude}</Text>
                            <Text>Elevation:{this.state.userElevation}</Text>

                        </Callout>
                    </Marker>
                    {
                        this.state.marker &&
                        <Marker coordinate={this.state.marker} pinColor={'gold'}
                            onPress={this.onMarkerCalloutPress} >

                            <Callout key={2} onPress={this.getElevationDifference} >

                                <Text>Lat:{this.state.markerLat}</Text>
                                <Text>lon:{this.state.markerLon}</Text>
                                <Text>Elevation:{this.state.markerElevation}</Text>
                            </Callout>

                        </Marker>
                    }


                </MapView>
                <View
                    style={styles.elevateButtonSection}
                >
                    {/* <View>The Elevation Difference is {elevationDifference}</View>
                    <Button onPress={() => this.getElevationDifference()}
                        style={styles.loginButton}
                        title="Elevation Difference"
                    /> */}
                    <Button
                        title="Elevation Difference"
                        onPress={() => Alert.alert('The Elevation Difference is ' + this.state.elevationDifference)}
                    />
                </View>
            </View >

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
        height: 600,
        width: 600,
    },

    blueTitle: {
        color: 'aqua',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 120,
        height: 35,
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',

    },
    elevateButtonSection: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

