import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  useTheme,
  Alert
} from '@mui/material';
import {
  Thermostat,
  Air,
  Brightness5,
  Brightness3,
  LocationOn
} from '@mui/icons-material';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

interface WeatherData {
  temp: number;
  high: number;
  low: number;
  condition: string;
  icon: string;
  wind_speed: number;
  sunrise: number;
  sunset: number;
}

interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  icon: string;
  hourly: {
    time: string;
    temp: number;
  }[];
}

const WeatherDashboard = () => {
  const theme = useTheme();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const MENDOZA_COORDS = { lat: -32.8908, lon: -68.8272 };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { lat, lon } = MENDOZA_COORDS;

      if (!process.env.NEXT_PUBLIC_WEATHER_KEY) {
        throw new Error('API key no configurada');
      }

      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es`
      );

      const currentData = currentRes.data;
      const forecastData = forecastRes.data;

      setWeather({
        temp: Math.round(currentData.main.temp),
        high: Math.round(currentData.main.temp_max),
        low: Math.round(currentData.main.temp_min),
        condition: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        wind_speed: Math.round(currentData.wind.speed * 3.6),
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
      });

      const dailyForecast: Record<string, DailyForecast> = {};

      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
        
        if (!dailyForecast[dateKey]) {
          dailyForecast[dateKey] = {
            date: dateKey,
            day: dayName,
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            icon: item.weather[0].icon,
            hourly: []
          };
        }

        dailyForecast[dateKey].high = Math.max(dailyForecast[dateKey].high, Math.round(item.main.temp_max));
        dailyForecast[dateKey].low = Math.min(dailyForecast[dateKey].low, Math.round(item.main.temp_min));

        dailyForecast[dateKey].hourly.push({
          time: date.toLocaleTimeString('es-ES', { hour: '2-digit' }),
          temp: Math.round(item.main.temp)
        });
      });

      setForecast(Object.values(dailyForecast).slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('No se pudo cargar los datos del clima. Verifica tu conexión o API key.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Typography variant="body1" mt={2}>
          ¿Necesitas ayuda? Verifica:
        </Typography>
        <ul>
          <li>Tu conexión a internet</li>
          <li>Que la API key esté configurada correctamente</li>
          <li>Que las coordenadas sean válidas</li>
        </ul>
      </Box>
    );
  }

  if (!weather) {
    return (
      <Box p={3}>
        <Alert severity="warning">No se encontraron datos meteorológicos</Alert>
      </Box>
    );
  }

  return (
    <Box
      p={2}
      maxWidth="1000px"
      mx="auto"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {/* Encabezado corregido - Typography ahora está correctamente cerrado */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={500} display="flex" alignItems="center" gap={0.5}>
          <LocationOn fontSize="small" /> Clima en Mendoza
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            sx={{ width: 50, height: 50 }}
          />
          <Box textAlign="right">
            <Typography variant="h4" fontWeight={600}>
              {weather.temp}°C
            </Typography>
            <Typography variant="caption" textTransform="capitalize">
              {weather.condition}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Datos principales */}
      <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
        <CompactTile icon={<Thermostat color="error" />} label="Máx" value={`${weather.high}°`} />
        <CompactTile icon={<Thermostat color="info" />} label="Mín" value={`${weather.low}°`} />
        <CompactTile icon={<Air color="primary" />} label="Viento" value={`${weather.wind_speed} km/h`} />
        <CompactTile icon={<Brightness5 sx={{ color: '#ff9800' }} />} label="Amanecer" value={formatTime(weather.sunrise)} />
        <CompactTile icon={<Brightness3 sx={{ color: '#6a1b9a' }} />} label="Atardecer" value={formatTime(weather.sunset)} />
      </Box>

      {/* Pronóstico por días */}
      {forecast.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight={500} mb={1}>Pronóstico 5 días</Typography>
          <Box display="flex" overflow="auto" gap={1} pb={2}>
            {forecast.map((day, index) => (
              <Card key={index} sx={{ minWidth: 140, borderRadius: 2 }}>
                <CardContent sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2" fontWeight={500} textAlign="center">
                    {day.day} {day.date}
                  </Typography>
                  
                  <Box display="flex" justifyContent="center" my={1}>
                    <Avatar
                      src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                      sx={{ width: 50, height: 50 }}
                    />
                  </Box>
                  
                  <Box height={60} mt={1}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={day.hourly}>
                        <XAxis dataKey="time" hide />
                        <Line
                          type="monotone"
                          dataKey="temp"
                          stroke={theme.palette.primary.main}
                          strokeWidth={2}
                          dot={{ r: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2" color="error">{day.high}°</Typography>
                    <Typography variant="body2" color="text.secondary">{day.low}°</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const CompactTile = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <Card sx={{ minWidth: 90, borderRadius: 2 }}>
    <CardContent sx={{ p: 1, textAlign: 'center' }}>
      <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
      <Typography variant="caption">{label}</Typography>
      <Typography variant="body2" fontWeight={500}>{value}</Typography>
    </CardContent>
  </Card>
);

export default WeatherDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Avatar,
//   Card,
//   CardContent,
//   useTheme,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper
// } from '@mui/material';
// import {
//   Thermostat,
//   Air,
//   Brightness5,
//   Brightness3,
//   LocationOn,
//   WaterDrop,
//   WbSunny,
//   NightsStay
// } from '@mui/icons-material';
// import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';

// interface WeatherData {
//   temp: number;
//   high: number;
//   low: number;
//   condition: string;
//   icon: string;
//   wind_speed: number;
//   sunrise: number;
//   sunset: number;
//   humidity: number;
// }

// interface DailyForecast {
//   date: string;
//   day: string;
//   high: number;
//   low: number;
//   icon: string;
//   humidity: number;
//   wind_speed: number;
//   hourly: {
//     time: string;
//     temp: number;
//   }[];
// }

// const WeatherDashboard = () => {
//   const theme = useTheme();
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [forecast, setForecast] = useState<DailyForecast[]>([]);
//   const [extendedForecast, setExtendedForecast] = useState<DailyForecast[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const MENDOZA_COORDS = { lat: -32.8908, lon: -68.8272 };

//   const fetchWeatherData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { lat, lon } = MENDOZA_COORDS;

//       if (!process.env.NEXT_PUBLIC_WEATHER_KEY) {
//         throw new Error('API key no configurada');
//       }

//       // Datos actuales
//       const currentRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es`
//       );

//       // Pronóstico de 5 días (detallado)
//       const forecastRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es&cnt=40`
//       );

//       // Pronóstico extendido de 16 días (incluyendo hoy)
//       const extendedRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es&cnt=16`
//       );

//       const currentData = currentRes.data;
//       const forecastData = forecastRes.data;
//       const extendedData = extendedRes.data;

//       // Procesar datos actuales
//       setWeather({
//         temp: Math.round(currentData.main.temp),
//         high: Math.round(currentData.main.temp_max),
//         low: Math.round(currentData.main.temp_min),
//         condition: currentData.weather[0].description,
//         icon: currentData.weather[0].icon,
//         wind_speed: Math.round(currentData.wind.speed * 3.6),
//         sunrise: currentData.sys.sunrise,
//         sunset: currentData.sys.sunset,
//         humidity: currentData.main.humidity
//       });

//       // Procesar pronóstico detallado (5 días)
//       const dailyForecast: Record<string, DailyForecast> = {};

//       forecastData.list.forEach((item: any) => {
//         const date = new Date(item.dt * 1000);
//         const dateKey = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
//         const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
        
//         if (!dailyForecast[dateKey]) {
//           dailyForecast[dateKey] = {
//             date: dateKey,
//             day: dayName,
//             high: Math.round(item.main.temp_max),
//             low: Math.round(item.main.temp_min),
//             icon: item.weather[0].icon,
//             humidity: item.main.humidity,
//             wind_speed: Math.round(item.wind.speed * 3.6),
//             hourly: []
//           };
//         }

//         dailyForecast[dateKey].high = Math.max(dailyForecast[dateKey].high, Math.round(item.main.temp_max));
//         dailyForecast[dateKey].low = Math.min(dailyForecast[dateKey].low, Math.round(item.main.temp_min));

//         dailyForecast[dateKey].hourly.push({
//           time: date.toLocaleTimeString('es-ES', { hour: '2-digit' }),
//           temp: Math.round(item.main.temp)
//         });
//       });

//       setForecast(Object.values(dailyForecast).slice(0, 5));

//       // Procesar pronóstico extendido (15 días)
//       const processedExtended = extendedData.list.slice(1, 16).map((day: any) => ({
//         date: new Date(day.dt * 1000).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
//         day: new Date(day.dt * 1000).toLocaleDateString('es-ES', { weekday: 'short' }),
//         high: Math.round(day.temp.max),
//         low: Math.round(day.temp.min),
//         icon: day.weather[0].icon,
//         humidity: day.humidity,
//         wind_speed: Math.round(day.speed * 3.6),
//         hourly: [
//           { time: 'Mañana', temp: Math.round(day.temp.morn) },
//           { time: 'Tarde', temp: Math.round(day.temp.day) },
//           { time: 'Noche', temp: Math.round(day.temp.eve) }
//         ]
//       }));

//       setExtendedForecast(processedExtended);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching weather data:', err);
//       setError('No se pudo cargar los datos del clima. Verifica tu conexión o API key.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const formatTime = (timestamp: number) => {
//     return new Date(timestamp * 1000).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="300px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3}>
//         <Alert severity="error">{error}</Alert>
//         <Typography variant="body1" mt={2}>
//           ¿Necesitas ayuda? Verifica:
//         </Typography>
//         <ul>
//           <li>Tu conexión a internet</li>
//           <li>Que la API key esté configurada correctamente</li>
//           <li>Que las coordenadas sean válidas</li>
//         </ul>
//       </Box>
//     );
//   }

//   if (!weather) {
//     return (
//       <Box p={3}>
//         <Alert severity="warning">No se encontraron datos meteorológicos</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       p={2}
//       maxWidth="1200px"
//       mx="auto"
//       display="flex"
//       flexDirection="column"
//       gap={2}
//     >
//       {/* Encabezado */}
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h6" fontWeight={500} display="flex" alignItems="center" gap={0.5}>
//           <LocationOn fontSize="small" /> Clima en Mendoza
//         </Typography>
//         <Box display="flex" alignItems="center" gap={1}>
//           <Avatar
//             src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//             sx={{ width: 50, height: 50 }}
//           />
//           <Box textAlign="right">
//             <Typography variant="h4" fontWeight={600}>
//               {weather.temp}°C
//             </Typography>
//             <Typography variant="caption" textTransform="capitalize">
//               {weather.condition}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Datos principales */}
//       <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
//         <CompactTile icon={<Thermostat color="error" />} label="Máx" value={`${weather.high}°`} />
//         <CompactTile icon={<Thermostat color="info" />} label="Mín" value={`${weather.low}°`} />
//         <CompactTile icon={<Air color="primary" />} label="Viento" value={`${weather.wind_speed} km/h`} />
//         <CompactTile icon={<WaterDrop color="info" />} label="Humedad" value={`${weather.humidity}%`} />
//         <CompactTile icon={<Brightness5 sx={{ color: '#ff9800' }} />} label="Amanecer" value={formatTime(weather.sunrise)} />
//         <CompactTile icon={<Brightness3 sx={{ color: '#6a1b9a' }} />} label="Atardecer" value={formatTime(weather.sunset)} />
//       </Box>

//       {/* Pronóstico detallado (5 días) */}
//       {forecast.length > 0 && (
//         <Box mt={2}>
//           <Typography variant="subtitle1" fontWeight={500} mb={1}>Pronóstico detallado (5 días)</Typography>
//           <Box display="flex" overflow="auto" gap={1} pb={2}>
//             {forecast.map((day, index) => (
//               <Card key={index} sx={{ minWidth: 140, borderRadius: 2 }}>
//                 <CardContent sx={{ p: 1.5 }}>
//                   <Typography variant="subtitle2" fontWeight={500} textAlign="center">
//                     {day.day} {day.date}
//                   </Typography>
                  
//                   <Box display="flex" justifyContent="center" my={1}>
//                     <Avatar
//                       src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
//                       sx={{ width: 50, height: 50 }}
//                     />
//                   </Box>
                  
//                   <Box height={60} mt={1}>
//                     <ResponsiveContainer width="100%" height="100%">
//                       <LineChart data={day.hourly}>
//                         <XAxis dataKey="time" hide />
//                         <Line
//                           type="monotone"
//                           dataKey="temp"
//                           stroke={theme.palette.primary.main}
//                           strokeWidth={2}
//                           dot={{ r: 2 }}
//                         />
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </Box>
                  
//                   <Box display="flex" justifyContent="space-between" mt={1}>
//                     <Typography variant="body2" color="error">{day.high}°</Typography>
//                     <Typography variant="body2" color="text.secondary">{day.low}°</Typography>
//                   </Box>
                  
//                   <Box display="flex" justifyContent="space-between" mt={1}>
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       <Air fontSize="small" />
//                       <Typography variant="caption">{day.wind_speed} km/h</Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       <WaterDrop fontSize="small" />
//                       <Typography variant="caption">{day.humidity}%</Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       )}

//       {/* Pronóstico extendido (15 días) */}
//       {extendedForecast.length > 0 && (
//         <Box mt={2}>
//           <Typography variant="subtitle1" fontWeight={500} mb={1}>Pronóstico extendido (15 días)</Typography>
//           <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//             <Table size="small" aria-label="Pronóstico extendido">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Día</TableCell>
//                   <TableCell align="center">Condición</TableCell>
//                   <TableCell align="right">Máx</TableCell>
//                   <TableCell align="right">Mín</TableCell>
//                   <TableCell align="right">Viento</TableCell>
//                   <TableCell align="right">Humedad</TableCell>
//                   <TableCell align="center">Mañana</TableCell>
//                   <TableCell align="center">Tarde</TableCell>
//                   <TableCell align="center">Noche</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {extendedForecast.map((day, index) => (
//                   <TableRow key={index}>
//                     <TableCell component="th" scope="row">
//                       <Box display="flex" alignItems="center" gap={1}>
//                         <Typography variant="body2" fontWeight={500}>{day.day}</Typography>
//                         <Typography variant="caption" color="text.secondary">{day.date}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Avatar
//                         src={`https://openweathermap.org/img/wn/${day.icon}.png`}
//                         sx={{ width: 30, height: 30, mx: 'auto' }}
//                       />
//                     </TableCell>
//                     <TableCell align="right" sx={{ color: theme.palette.error.main }}>{day.high}°</TableCell>
//                     <TableCell align="right" sx={{ color: theme.palette.info.main }}>{day.low}°</TableCell>
//                     <TableCell align="right">
//                       <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
//                         <Air fontSize="small" />
//                         <Typography variant="body2">{day.wind_speed} km/h</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0.5}>
//                         <WaterDrop fontSize="small" />
//                         <Typography variant="body2">{day.humidity}%</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="center">{day.hourly[0].temp}°</TableCell>
//                     <TableCell align="center">{day.hourly[1].temp}°</TableCell>
//                     <TableCell align="center">{day.hourly[2].temp}°</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}
//     </Box>
//   );
// };

// const CompactTile = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
//   <Card sx={{ minWidth: 90, borderRadius: 2 }}>
//     <CardContent sx={{ p: 1, textAlign: 'center' }}>
//       <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
//       <Typography variant="caption">{label}</Typography>
//       <Typography variant="body2" fontWeight={500}>{value}</Typography>
//     </CardContent>
//   </Card>
// );

// export default WeatherDashboard;