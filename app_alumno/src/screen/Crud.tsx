import { View, Text, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'

const Crud = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    useEffect(() => {
        fetchAlumno();
    }, [])

    const fetchAlumno = async () => {
        try {
            const response = await fetch('http://192.168.100.7:3000/alumnos/');
            const data = await response.json();
            setAlumnos(data)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <View>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre} {item.apellido}</Text>
          </View> 
        )}
      />
    </View>
  )
}

export default Crud