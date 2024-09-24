'use client'

import AuthForm from "@/components/auth/AuthForm";
import { redden } from "@/services/storage.services";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from './page.module.css'
import { obtenerGeolocalizacion } from "@/services/geolocations.sevices";
import axiosService from "@/services/axios.services";
import WeatherComponent from "@/components/wheater/Wheater";

export default function Home() {
  useEffect(() => {
    const data = redden({ email: 'nico.contigliani' })
  }, [])

  // const [isLogin, setIsLogin] = useState(true)
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  // console.log("🚀 ~ Home ~ isAuthenticated:", isAuthenticated)

  // // Simula el proceso de autenticación
  // const authenticateUser = (data: any) => {
  //   // Aquí se manejaría la autenticación real
  //   // Si la autenticación es exitosa:
  //   setIsAuthenticated(true)
  // }





  // // Reemplaza con tu clave API real
  // const apiKey = 'TU_CLAVE_API';

  // // Construye la URL de la solicitud
  // const url = 'https://api.meteosource.com/v1/point/forecast';

  // // Parámetros de la consulta (ajusta según tus necesidades)
  // const params = {
  //   lat: 37.7749,
  //   lon: -122.4194,
  //   sections: 'current,hourly',
  //   units: 'metric',
  // };



  // const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;



  // const url = "https://api.meteosource.com/v1/point/forecast"
  // const token = "titjvahndlqpw55t3333i0izchx4hc7k6fi4ujfe"
  const cityValue = 'Mendoza'
  const countryValue = "AR"
  const WEATHER_KEY = "2f32c842aa152561b4975095a4a8c746"
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
  
  useEffect(() => {
    
    const todo = async () => {
      const returData: any = await obtenerGeolocalizacion()
      const lat = returData.latitude
      const lon = returData.longitude
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`

      const params = {
        lat,
        lon,
        sections: 'current,hourly',
        units: 'metric',
      };
      const getData = await axiosService({ method: 'GET', url });
      console.log("🚀 ~ todo ~ getData:", getData)

    }
    todo()
  }, [])

  // https://pokeapi.co/api/v2/pokemon/ditto





  return (
    <div className={style.container}>
      {/* <AuthForm 
      isLogin={isLogin} 
      setIsLogin={setIsLogin} 
      isAuthenticated={isAuthenticated} 
      setIsAuthenticated={setIsAuthenticated}
    /> */}
      {/* <div className={style.columnaUno}>
        <h1>Home</h1>

      </div>
      <div className={style.columnaDos}>
        dos
      </div> */}
      <WeatherComponent/>
    </div>
  );
}