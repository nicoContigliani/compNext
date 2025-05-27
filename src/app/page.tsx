'use client'

import { useEffect, useState } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";

import { redden } from "@/services/storage.services";
import { obtenerGeolocalizacion } from "@/services/geolocations.sevices";
import axiosService from "@/services/axios.services";
import WeatherComponent from "@/components/wheater/Wheater";
import getHourlyForecast from "@/services/wheaterAll.services";
import NewsAggregator from "@/components/LosAndesNews/MdzolNews";

export default function Home() {
  const [forecast, setForecast] = useState<any[] | any | undefined>([]);

  const WEATHER_KEY = "2f32c842aa152561b4975095a4a8c746";

  useEffect(() => {
    redden({ email: 'nico.contigliani' });
  }, []);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const returData: any = await obtenerGeolocalizacion();
      const { latitude: lat, longitude: lon } = returData;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`;
      const getData = await axiosService({ method: 'GET', url });
      console.log("🚀 ~ Current Weather Data:", getData);
    };

    fetchCurrentWeather();
  }, []);

  useEffect(() => {
    const fetchForecast = async () => {
      const returData: any = await obtenerGeolocalizacion();
      const { latitude: lat, longitude: lon } = returData;

      const data: any = await getHourlyForecast(lat, lon, WEATHER_KEY, 0, 24);
      setForecast(data);
    };

    fetchForecast();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header con Clima */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Pronóstico del Clima
          </Typography>
          <WeatherComponent forecast={forecast} />
        </Paper>
      </Box>

      {/* Contenido principal - Noticias */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Noticias Destacadas
            </Typography>
            <NewsAggregator />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
