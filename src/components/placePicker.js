import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";



export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            region: {
                markerLat: 0,
                markerLon: 0,
                latitude: 24.92009056750823,
                longitude: 67.1012272143364,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
                markerElevation: 0
            },

            marker: null,
        }
    }
    onMarkerCalloutPress = () => {

    }



    render() {

        return (

            <MapView style={styles.map} region={this.state.region}
                onPress={(e) =>
                    this.setState({
                        markerLat: e.nativeEvent.coordinate.latitude,
                        markerLon: e.nativeEvent.coordinate.longitude,
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