import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Crud from './src/screen/Crud';

export default function App() {
  return (
    <View style={styles.container}>
    <Image source={require('./assets/favicon.png')} />
    <Text>Alumnos Disponibles</Text>
    <Crud/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
