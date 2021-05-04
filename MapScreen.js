import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';

// const elevator = new google.maps.ElevationService();
export default class Placepicker extends React.Component {
    constructor(props) {
        super(props)
        this.onMarkerCalloutPress = this.onMarkerCalloutPress.bind(this);
        this.onUserLocationMarkerCalloutPress = this.onUserLocationMarkerCalloutPress.bind(this);
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
        }
    }

    onUserLocationMarkerCalloutPress = async () => {
        let userElevateCoordinates = this.state.userLatitude + "," + this.state.userLongitude;
        let userElevationCoordinates = userElevateCoordinates.toString();

        console.log(userElevationCoordinates);
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

        console.log(elevationCoordinates);
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


    render() {
        return (
            <MapView style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                showsCompass={true}
                zoomEnabled={true}
                pitchEnabled={true}
                // showsBuildings={true}
                // showsTraffic={true}
                // showsIndoors={true}
                showsPointsOfInterest={false}
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
                        <Text>Lat:{this.state.userLatitude}</Text>
                        <Text>lon:{this.state.userLongitude}</Text>
                        <Text>Elevation:{this.state.userElevation}</Text>
                    </Callout>
                </Marker>
                {
                    this.state.marker &&
                    <MapView.Marker coordinate={this.state.marker} pinColor={'teal'}>

                        <Callout key={2} onPress={this.onMarkerCalloutPress}>
                            <Text>Click marker,tag, marker to get elevation</Text>
                            <Text>Lat:{this.state.markerLat}</Text>
                            <Text>lon:{this.state.markerLon}</Text>
                            <Text>Elevation:{this.state.markerElevation}</Text>
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
