
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  PermissionsAndroid,
  Platform
} from "react-native";

import MapScreen from "./MapScreen";
function HomeScreen({ navigation }) {
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

        <MapScreen />
      </> : null}
    </>
  )
};


const elevationExplanation = require('./assets/elevationExplanation.png')
function AboutScreen({ route }) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View style={styles.container}>
        <Text style={{ margin: 10, marginTop: 60 }}>HEIGHT is the vertical distance of a point to a horizontal surface. ELEVATION is the height of a point above (or below) sea level. SEA LEVEL or, as it is more usually called, mean sea level, is the average height of the surface of the sea.</Text>
        <Image
          source={elevationExplanation}
          style={{ width: '100%', height: 350, alignSelf: 'center', padding: 20, resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? require('./assets/placeholder.png')
                : require('./assets/home.png');
            }
            if (route.name === 'About') {
              iconName = focused
                ? require('./assets/map.png')
                : require('./assets/user.png');
            }
            return <Image
              source={iconName}
              style={{ width: 20, height: 20 }}
              resizeMode="contain" />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

});
