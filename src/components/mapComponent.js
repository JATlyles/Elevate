import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {styles} from './style';
import CustomMarker from './customMarker';
import {ElevationContext} from '../Contexts/elevationContext';
import {useContext, useState} from 'react';

export default function MapComponent(props) {
  const [currentElevation] = useContext(ElevationContext);

  const [markers, setMarkers] = useState([]);

  const handlePress = e => {
    setMarkers([
      ...markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: Math.round(Math.random() * 10000000000),
      },
    ]);
  };

  return (
    <>
      <MapView
        showsUserLocation
        followsUserLocation
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 35.0997,
          longitude: -90.0108,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        }}
        onPress={handlePress}>
        {markers.map(marker => {
          return (
            <Marker key={marker.key} {...marker}>
              <CustomMarker elevation={currentElevation} />
            </Marker>
          );
        })}
      </MapView>
    </>
  );
}
