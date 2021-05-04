import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    backgroundColor: '#FFF3',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: 'green',
    fontWeight: 'bold',

  }
});
