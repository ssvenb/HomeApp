import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';

export function ListEmpty() {
  return (
    <View style={styles.container}>
      <AntdesignIcon name="shoppingcart" size={100} color="black" />
      <Text style={styles.text}>Keine Einkaufslisten vorhanden</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  }
});
