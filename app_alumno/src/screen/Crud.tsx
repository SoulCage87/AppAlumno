import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import AlumnoDetail from './AlumnoDetail';
import FetchAlumnoHook from '../../Hooks/FetchAlumnoHook';

const Crud = ({navigation}) => {
    
    const {setAlumnos, alumnos, fetchAlumno} = FetchAlumnoHook();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    
    useEffect(() => {
        fetchAlumno();
    }, [])

   

    const createAlumno = async () => {
      try {
        const response = await fetch('http://192.168.100.7:3000/alumnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, apellido }),
        });
        const newAlumno = await response.json();
        setAlumnos([...alumnos, newAlumno]);
        setNombre('');
        setApellido('');
      } catch (error) {
        console.error(error);
      }
    };

    const dltAlumno = async (id) => {
      try {
       const response = await fetch(`http://192.168.100.7:3000/alumnos/${id}`, {
        method: 'DELETE',
       });

       if(response.ok){
        Alert.alert('Eliminado', 'Alumno Eliminado con Exito!')
        fetchAlumno();
       }else{
        Alert.alert('Error', 'No se pudo eliminar el alumno');
       }
      }catch(e){
        console.error(e)
      }
    }

    const confirmDelete = (id) => {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de que deseas eliminar este alumno?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => dltAlumno(id) },
        ],
        { cancelable: true }
      );
    }; 


  return (
    <View style={style.container}>
      <Text>Alumnos Disponibles</Text>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('AlumnoDetail', { alumno: item, onUpdt: fetchAlumno })}>
            <Text style={{fontSize: 30, textAlign: 'center'}}>{item.nombre} {item.apellido}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonCancel} onPress={() => confirmDelete(item.id)}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </ScrollView> 
        )}
      />
      <TextInput
      value={nombre}
      onChangeText={setNombre}
      style={style.input}
      placeholder='Introduzca su Nombre'>
      </TextInput>
      <TextInput
      value={apellido}
      onChangeText={setApellido}
      style={style.input}
      placeholder='Introduzca su Apellido'>
      </TextInput>

      <Button title='Agregar Alumno' onPress={createAlumno} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: 140
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
},
buttonCancel: {
  backgroundColor: 'red',
  padding: 10,
  alignItems: 'center',
  borderRadius: 5,
  marginBottom: 12,
}
})

export default Crud