import React, { useContext } from 'react';
import {ElevationContext} from '../Contexts/elevationContext'
import {View, Text} from 'react-native';

const CustomMarker = () => {
const [currentElevation] = useContext(ElevationContext)
console.log(currentElevation)
    return(
    <View >
        <Text>{currentElevation}</Text>
    </View>
    )
}

export default CustomMarker;