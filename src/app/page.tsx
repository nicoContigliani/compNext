'use client'

import AuthForm from "@/components/auth/AuthForm";
import { redden } from "@/services/storage.services";
import Image from "next/image";
import { useEffect, useState } from "react";
import style from './page.module.css'
import { obtenerGeolocalizacion } from "@/services/geolocations.sevices";
import axiosService from "@/services/axios.services";
import WeatherComponent from "@/components/wheater/Wheater";
import getHourlyForecast from "@/services/wheaterAll.services";

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

  const [forecast, setForecast] = useState<any[] | any | undefined>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const returData: any = await obtenerGeolocalizacion()
      const lat = returData.latitude
      const lon = returData.longitude
      const data: any | undefined = await getHourlyForecast(lat, lon, WEATHER_KEY, 0, 24); // Ejemplo de latitud y longitud
      setForecast(data);
    };

    fetchForecast();
  }, []);




  return (
    <div>
      <header>
        <WeatherComponent
          forecast={forecast}
        />

      </header>

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
        si
      </div>
    </div>
  );
}