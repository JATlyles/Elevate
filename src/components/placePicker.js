import React from 'react';
import MapPicker from "react-native-map-picker";
import { View } from "react-native";


export default class SelectLocationScreen extends React.Component {
    state = {
        chosenLatitude: 0,
        chosenLongitude: 0,
        chosenElevation: 0,
    }

    findElevation() {
        let elevateCoordinates = this.state.markerLat + "," + this.state.markerLon;
        let elevationCoordinates = elevateCoordinates.toString();
        console.log(elevationCoordinates);
        const res = fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${elevationCoordinates}&key=AIzaSyD3pCgrdlCaWjT_AIe13jaeKf4zfpGK8R4`)
            .then(response => response.json())
            .then(json => console.log(json))
        const data = res.json()
        const currentChosenElevation = JSON.stringify(data.results[0].elevation);
        this.setState({
            chosenElevation: currentChosenElevation,
        });
    }
    onMapPress(e) {
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate));

        this.setState({
            marker: [
                {
                    coordinate: e.nativeEvent.coordinate
                }
            ]
        });
    }
    setLocation() {
        this.setState({
            chosenLatitude: latitude,
            chosenLongitude: longitude,
        });

    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <MapPicker
                    initialCoordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    onLocationSelect={({ latitude, longitude }) =>
                        console.log(longitude, latitude)}
                />
            </View>
        );
    }
}