// npm install react-native-map-picker --save


import React from 'react';
import MapPicker from "react-native-map-picker";
import { View } from "react-native";


export default class SelectLocationScreen extends React.Component {
    state = {

    };
    getSelectedPosition = () => {
        const { coordinate } = this.state
        const { latitude, longitude } = coordinate
        return {
            latitude,
            longitude
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapPicker
                    initialCoordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    onLocationSelect={({ latitude, longitude }) => console.log(longitude, latitude)}
                />
            </View>
        );
    }
}