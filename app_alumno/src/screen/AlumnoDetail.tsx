import { View, Text, StyleSheet, TextInput, Alert, Button, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FetchAlumnoHook from '../../Hooks/FetchAlumnoHook';
import { useFocusEffect } from '@react-navigation/native';

const AlumnoDetail = ({ route, navigation }) => {
    const { setAsignatura, asignatura, fetchAsignatura } = FetchAlumnoHook(); ``
    const { alumno, onUpdt } = route.params;
    const [nombre, setNombre] = useState(alumno.nombre)
    const [apellido, setApellido] = useState(alumno.apellido)


    const updAlumno = async () => {
        try {
            const response = await fetch(`http://192.168.100.7:3000/alumnos/${alumno.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido }),
            });
            if (response.ok) {
                Alert.alert('Actualizado', 'Alumno actualizado con éxito!');
                onUpdt();
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo actualizar el alumno');
            }

        } catch (error) {
            Alert.alert('Algo a Ocurrido!', 'Error al actualizar al alumno')
        }
    }

    return (
        <View style={style.container}>
            <Text style={style.text}>{alumno.nombre}</Text>
            <Text style={style.text}>{alumno.apellido}</Text>

            <FlatList
                data={asignatura}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ScrollView>
                        <Text style={style.text}>{item.asignatura_nombre}</Text>
                    </ScrollView>
                )}
            />

            <Text style={style.label}>EDITAR ALUMNO</Text>
            <TextInput
                value={nombre}
                onChangeText={setNombre}
                style={style.input}
                placeholder='Nombre del Alumno' />

            <TextInput
                value={apellido}
                onChangeText={setApellido}
                style={style.input}
                placeholder='Nombre del Alumno' />

            <Button title='Actualizar alumno' onPress={updAlumno}></Button>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 24,
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '80%',
        marginTop: 20,
        borderRadius: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        marginTop: 20
    }
})

export default AlumnoDetail