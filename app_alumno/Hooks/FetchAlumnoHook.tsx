import { View, Text } from 'react-native'
import React, {useState} from 'react'

const FetchAlumnoHook = () => {

  const [alumnos, setAlumnos] = useState([]);
  const [asignatura, setAsignatura] = useState([])

  const fetchAlumno = async () => {
    try {
        const response = await fetch('http://192.168.100.7:3000/alumnos/');
        const data = await response.json(); 
        setAlumnos(data)
    } catch (error) {
        console.error(error) 
    }
}

const fetchAsignatura = async (id) => {
  try {
    const response = await fetch(`http://192.168.100.7:3000/asignatura/${id}`)
    const data = await response.json();
    setAsignatura(data)
  } catch (error) {
    console.error(error)
  }
}

  return {
     setAlumnos,
     alumnos,
     setAsignatura,
     asignatura,

     fetchAlumno,
     fetchAsignatura
  }
}

export default FetchAlumnoHook