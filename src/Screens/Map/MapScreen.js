import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import MapComponent from '../../components/mapComponent';
import LocationDisplay from '../../components/showLocationComponent'


const MapScreen = () => {

  const [hasMapPermissions, setHasMapPermissions] = useState(false)

  useEffect(() => {

    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasMapPermissions(true)
        }
      } else {
        setHasMapPermissions(true)
      }
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <>
      {hasMapPermissions ? <>
        <MapComponent />
      </> : null}
    </>
  )
};

export default MapScreen;

//  export default class MapScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasMapPermission: false
//     };
//   }

//   componentDidMount() {
//     this.requestFineLocation();
//   }

//   async requestFineLocation() {
//     try {
//       if (Platform.OS === "android") {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           this.setState({ hasMapPermission: true });
//         }
//       } else {
//         this.setState({ hasMapPermission: true });
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   }

//   render() {
//     if (this.state.hasMapPermission) {
//       return <MapComponent />;
//     }
//     return null;
//   }
// }

