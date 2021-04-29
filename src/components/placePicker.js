import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";



class Maps extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: 24.92009056750823,
                longitude: 67.1012272143364,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            },

            marker: null
        }
    }

    onMarkerCalloutPress = () => {
        let elevateCoordinates = this.state.markerLat + "," + this.state.markerLon;
        let elevationCoordinates = elevateCoordinates.toString();
        console.log(elevationCoordinates);
        return fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results.elevation),
                    this.setState({ markerElevation: responseJson.results.elevation });
            })
            .catch((error) => {
                console.error(error);
            });

    }
    render() {

        return (

            <MapView style={styles.map} region={this.state.region}
                onPress={(e) =>

                    this.setState({
                        markerLat: e.nativeEvent.coordinate.latitude,
                        markerLon: e.nativeEvent.coordinate.longitude,
                        markerAlt: e.nativeEvent.coordinate.altitude,
                        marker: e.nativeEvent.coordinate
                    })}>
                {
                    this.state.marker &&
                    <MapView.Marker coordinate={this.state.marker} >
                        <Callout onPress={this.onMarkerCalloutPress}>
                            <Text>Lat: {this.state.markerLat}</Text>
                            <Text>Lon: {this.state.markerLon}</Text>

                        </Callout>

                    </MapView.Marker>
                }
            </MapView>
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
    }
});
