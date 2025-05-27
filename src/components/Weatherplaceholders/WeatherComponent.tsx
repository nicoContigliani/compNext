
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Sun, Sunrise, Sunset, Wind, Cloud, Droplet, Thermometer,
//   MapPin, Loader2, Umbrella, Gauge, CloudRain, CloudDrizzle,
//   CloudLightning, CloudSnow, Eye, Navigation, ChevronDown, ChevronUp
// } from 'lucide-react';
// import axios from 'axios';

// interface WeatherData {
//   temp: number;
//   feels_like: number;
//   humidity: number;
//   condition: string;
//   icon: string;
//   high: number;
//   low: number;
//   wind_speed: number;
//   wind_deg: number;
//   sunrise: number;
//   sunset: number;
//   pressure: number;
//   visibility: number;
//   rain?: number;
//   pop?: number;
//   airQuality?: number;
//   description: string;
//   timezone: number;
// }

// interface HourlyForecast {
//   time: string;
//   temp: number;
//   icon: string;
//   pop: number;
//   rain?: number;
// }

// interface DailyForecast {
//   day: string;
//   high: number;
//   low: number;
//   icon: string;
//   pop: number;
// }

// const WeatherDashboard = () => {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
//   const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [location, setLocation] = useState('Mendoza, AR');
//   const [activeTab, setActiveTab] = useState<'today' | 'week'>('today');
//   const [expanded, setExpanded] = useState(false);

//   const WEATHER_KEY = "2f32c842aa152561b4975095a4a8c746";
//   const MENDOZA_COORDS = { lat: -32.8908, lon: -68.8272 };

//   const getWeatherIcon = (iconCode: string, size = 24) => {
//     const icons: Record<string, JSX.Element> = {
//       '01d': <Sun className="text-yellow-400" size={size} />,
//       '01n': <Sun className="text-yellow-200" size={size} />,
//       '02d': <Cloud className="text-gray-400" size={size} />,
//       '02n': <Cloud className="text-gray-300" size={size} />,
//       '03d': <Cloud className="text-gray-500" size={size} />,
//       '03n': <Cloud className="text-gray-400" size={size} />,
//       '04d': <Cloud className="text-gray-600" size={size} />,
//       '04n': <Cloud className="text-gray-500" size={size} />,
//       '09d': <CloudRain className="text-blue-400" size={size} />,
//       '09n': <CloudRain className="text-blue-300" size={size} />,
//       '10d': <CloudDrizzle className="text-blue-500" size={size} />,
//       '10n': <CloudDrizzle className="text-blue-400" size={size} />,
//       '11d': <CloudLightning className="text-purple-500" size={size} />,
//       '11n': <CloudLightning className="text-purple-400" size={size} />,
//       '13d': <CloudSnow className="text-blue-200" size={size} />,
//       '13n': <CloudSnow className="text-blue-100" size={size} />,
//       '50d': <Cloud className="text-gray-300" size={size} />,
//       '50n': <Cloud className="text-gray-200" size={size} />,
//     };

//     const animationProps = {
//       animate: {
//         rotate: [0, 0],
//         y: [0, -5, 0],
//       },
//       transition: {
//         duration: 3,
//         repeat: Infinity,
//         repeatType: "loop" as const,
//       },
//     };

//     return (
//       <motion.div {...animationProps}>
//         {icons[iconCode] || <Cloud size={size} />}
//       </motion.div>
//     );
//   };

//   const formatTime = (timestamp: number, timezone: number) => {
//     return new Date((timestamp + timezone) * 1000)
//       .toLocaleTimeString([], { hour: '2-digit' })
//       .replace(' ', '');
//   };

//   const formatDay = (timestamp: number, timezone: number) => {
//     return new Date((timestamp + timezone) * 1000)
//       .toLocaleDateString([], { weekday: 'short' });
//   };

//   const getWindDirection = (degrees: number) => {
//     const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//     const index = Math.round((degrees % 360) / 45);
//     return directions[index % 8];
//   };

//   const getAirQuality = (index?: number) => {
//     if (!index) return { level: 'N/A', color: 'gray', bgColor: 'bg-gray-100' };

//     const levels = [
//       { level: 'Excelente', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
//       { level: 'Buena', color: 'text-green-600', bgColor: 'bg-green-100' },
//       { level: 'Moderada', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
//       { level: 'Pobre', color: 'text-orange-600', bgColor: 'bg-orange-100' },
//       { level: 'Muy pobre', color: 'text-red-600', bgColor: 'bg-red-100' },
//       { level: 'Peligrosa', color: 'text-purple-600', bgColor: 'bg-purple-100' }
//     ];

//     return levels[Math.min(index - 1, 5)];
//   };

//   const fetchWeatherData = async () => {
//     try {
//       setLoading(true);
//       const { lat, lon } = MENDOZA_COORDS;

//       const [currentRes, forecastRes] = await Promise.all([
//         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric&lang=es`),
//         axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric&cnt=40`)
//       ]);

//       const currentData = currentRes.data;
//       const forecastData = forecastRes.data;

//       setWeather({
//         temp: Math.round(currentData.main.temp),
//         feels_like: Math.round(currentData.main.feels_like),
//         humidity: currentData.main.humidity,
//         condition: currentData.weather[0].main,
//         description: currentData.weather[0].description,
//         icon: currentData.weather[0].icon,
//         high: Math.round(currentData.main.temp_max),
//         low: Math.round(currentData.main.temp_min),
//         wind_speed: Math.round(currentData.wind.speed * 3.6),
//         wind_deg: currentData.wind.deg,
//         sunrise: currentData.sys.sunrise,
//         sunset: currentData.sys.sunset,
//         pressure: currentData.main.pressure,
//         visibility: currentData.visibility / 1000,
//         rain: currentData.rain?.['1h'],
//         pop: forecastData.list[0].pop * 100,
//         timezone: currentData.timezone,
//         airQuality: Math.floor(Math.random() * 5) + 1
//       });

//       const hourly = forecastData.list.slice(0, 12).map((item: any) => ({
//         time: formatTime(item.dt, currentData.timezone),
//         temp: Math.round(item.main.temp),
//         icon: item.weather[0].icon,
//         pop: Math.round(item.pop * 100),
//         rain: item.rain?.['3h']
//       }));
//       setHourlyForecast(hourly);

//       const daily: DailyForecast[] = [];
//       for (let i = 0; i < 40; i += 8) {
//         const dayData = forecastData.list[i];
//         const temps = forecastData.list.slice(i, i + 8).map((item: any) => item.main.temp);
//         daily.push({
//           day: formatDay(dayData.dt, currentData.timezone),
//           high: Math.round(Math.max(...temps)),
//           low: Math.round(Math.min(...temps)),
//           icon: dayData.weather[0].icon,
//           pop: Math.round(
//             Math.max(...forecastData.list.slice(i, i + 8).map((item: any) => item.pop * 100))
//           )
//         });
//       }
//       setDailyForecast(daily);

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching weather data:", err);
//       setError("No se pudo cargar la información meteorológica. Intenta nuevamente.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//           className="flex flex-col items-center"
//         >
//           <Loader2 className="w-12 h-12 text-blue-500 mb-2" />
//           <p className="text-gray-500">Cargando datos meteorológicos...</p>
//         </motion.div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center bg-red-50 rounded-xl border border-red-100 max-w-md mx-auto">
//         <div className="text-red-500 font-medium mb-2">{error}</div>
//         <button
//           onClick={fetchWeatherData}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Reintentar
//         </button>
//       </div>
//     );
//   }

//   if (!weather) return null;

//   const airQuality = getAirQuality(weather.airQuality);

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       {/* Main Weather Card */}
//       <motion.div
//         className="bg-white rounded-xl shadow-lg overflow-hidden"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Current Weather Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <div className="flex items-center text-lg font-medium mb-1">
//                 <MapPin size={18} className="mr-2" />
//                 <span>{location}</span>
//               </div>
//               <div className="text-sm opacity-90 capitalize">{weather.description}</div>
//             </div>
            
//             <motion.div
//               className="flex items-center gap-4"
//               animate={{ scale: [1, 1.02, 1] }}
//               transition={{ duration: 5, repeat: Infinity }}
//             >
//               <div className="text-5xl font-light">{weather.temp}°</div>
//               <div className="text-4xl">
//                 {getWeatherIcon(weather.icon, 48)}
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Weather Stats Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center text-gray-500 text-sm mb-2">
//               <Thermometer size={16} className="mr-2" />
//               <span>Máx/Mín</span>
//             </div>
//             <div className="text-xl font-medium">
//               {weather.high}° / {weather.low}°
//             </div>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center text-gray-500 text-sm mb-2">
//               <Droplet size={16} className="mr-2" />
//               <span>Humedad</span>
//             </div>
//             <div className="text-xl font-medium">{weather.humidity}%</div>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center text-gray-500 text-sm mb-2">
//               <Wind size={16} className="mr-2" />
//               <span>Viento</span>
//             </div>
//             <div className="text-xl font-medium">
//               {weather.wind_speed} km/h <span className="text-sm">{getWindDirection(weather.wind_deg)}</span>
//             </div>
//           </div>
          
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center text-gray-500 text-sm mb-2">
//               <Umbrella size={16} className="mr-2" />
//               <span>Precipitación</span>
//             </div>
//             <div className="text-xl font-medium">
//               {weather.pop}% {weather.rain && `(${weather.rain}mm)`}
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="border-t border-gray-200 flex">
//           <button
//             className={`flex-1 py-4 font-medium ${activeTab === 'today' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('today')}
//           >
//             Hoy
//           </button>
//           <button
//             className={`flex-1 py-4 font-medium ${activeTab === 'week' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('week')}
//           >
//             Próximos 5 días
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-6">
//           {activeTab === 'today' ? (
//             <>
//               {/* Hourly Forecast */}
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Pronóstico por horas</h3>
//               <div className="overflow-x-auto pb-4">
//                 <div className="flex space-x-4 min-w-max">
//                   {hourlyForecast.map((hour, index) => (
//                     <motion.div
//                       key={index}
//                       className="bg-gray-50 p-3 rounded-lg min-w-[80px] text-center"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <div className="text-sm font-medium text-gray-500">{hour.time}</div>
//                       <div className="my-2 flex justify-center">
//                         {getWeatherIcon(hour.icon, 28)}
//                       </div>
//                       <div className="text-lg font-medium">{hour.temp}°</div>
//                       {hour.pop > 20 && (
//                         <div className="flex items-center justify-center mt-1 text-xs text-blue-500">
//                           <Umbrella size={12} className="mr-1" />
//                           <span>{hour.pop}%</span>
//                         </div>
//                       )}
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>

//               {/* Additional Weather Details */}
//               <div className="mt-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold text-gray-800">Detalles del clima</h3>
//                   <button 
//                     onClick={() => setExpanded(!expanded)}
//                     className="text-blue-500 text-sm flex items-center"
//                   >
//                     {expanded ? (
//                       <>
//                         <ChevronUp size={16} className="mr-1" />
//                         Mostrar menos
//                       </>
//                     ) : (
//                       <>
//                         <ChevronDown size={16} className="mr-1" />
//                         Mostrar más
//                       </>
//                     )}
//                   </button>
//                 </div>

//                 <AnimatePresence>
//                   {expanded && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {/* Sunrise/Sunset */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <div className="flex items-center text-gray-600 font-medium mb-3">
//                             <Sunrise size={18} className="mr-2 text-amber-500" />
//                             <span>Amanecer/Atardecer</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <div>
//                               <div className="text-xl font-light">
//                                 {new Date(weather.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                               </div>
//                               <div className="text-xs text-gray-500">Amanecer</div>
//                             </div>
//                             <div>
//                               <div className="text-xl font-light">
//                                 {new Date(weather.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                               </div>
//                               <div className="text-xs text-gray-500">Atardecer</div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Pressure */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <div className="flex items-center text-gray-600 font-medium mb-3">
//                             <Gauge size={18} className="mr-2 text-indigo-500" />
//                             <span>Presión</span>
//                           </div>
//                           <div className="flex items-end">
//                             <div className="text-xl font-light mr-2">{weather.pressure}</div>
//                             <div className="text-gray-500 text-sm">hPa</div>
//                           </div>
//                           <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <motion.div
//                               className={`h-full ${weather.pressure > 1020 ? 'bg-green-500' :
//                                 weather.pressure < 1000 ? 'bg-red-500' : 'bg-yellow-500'
//                                 }`}
//                               initial={{ width: 0 }}
//                               animate={{ width: `${((weather.pressure - 970) / (1030 - 970)) * 100}%` }}
//                               transition={{ duration: 1 }}
//                             />
//                           </div>
//                         </div>

//                         {/* Visibility */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <div className="flex items-center text-gray-600 font-medium mb-3">
//                             <Eye size={18} className="mr-2 text-blue-500" />
//                             <span>Visibilidad</span>
//                           </div>
//                           <div className="flex items-end">
//                             <div className="text-xl font-light mr-2">{weather.visibility}</div>
//                             <div className="text-gray-500 text-sm">km</div>
//                           </div>
//                           <div className="mt-1 text-xs text-gray-500">
//                             {weather.visibility > 10 ? 'Excelente' :
//                               weather.visibility > 5 ? 'Buena' :
//                                 weather.visibility > 2 ? 'Moderada' : 'Reducida'}
//                           </div>
//                         </div>

//                         {/* Air Quality */}
//                         <div className={`p-4 rounded-lg ${airQuality.bgColor}`}>
//                           <div className="flex items-center font-medium mb-3">
//                             <Navigation size={18} className={`mr-2 ${airQuality.color}`} />
//                             <span className={airQuality.color}>Calidad del aire</span>
//                           </div>
//                           <div className="flex items-end">
//                             <div className={`text-xl font-light mr-2 ${airQuality.color}`}>
//                               {airQuality.level}
//                             </div>
//                           </div>
//                           <div className="mt-1 text-xs text-gray-600">
//                             Índice AQI: {weather.airQuality || '--'}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </>
//           ) : (
//             /* Weekly Forecast */
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Pronóstico semanal</h3>
//               {dailyForecast.map((day, index) => (
//                 <motion.div
//                   key={index}
//                   className="grid grid-cols-12 items-center p-3 bg-gray-50 rounded-lg"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   <div className="col-span-2 font-medium text-gray-700">{index === 0 ? 'Hoy' : day.day}</div>
//                   <div className="col-span-2 flex justify-center">
//                     {getWeatherIcon(day.icon, 28)}
//                   </div>
//                   <div className="col-span-5">
//                     {day.pop > 30 && (
//                       <div className="flex items-center text-blue-500 text-sm">
//                         <Umbrella size={14} className="mr-1" />
//                         <span>{day.pop}% probabilidad de lluvia</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="col-span-3 flex justify-end space-x-2">
//                     <span className="font-medium">{day.high}°</span>
//                     <span className="text-gray-400">{day.low}°</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WeatherDashboard;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunrise, Sunset, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

interface WeatherData {
  temp: number;
  high: number;
  low: number;
  condition: string;
  icon: string;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

const WeatherDashboard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const WEATHER_KEY = "2f32c842aa152561b4975095a4a8c746";
  const MENDOZA_COORDS = { lat: -32.8908, lon: -68.8272 };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const { lat, lon } = MENDOZA_COORDS;

      const currentRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=es`
      );

      const currentData = currentRes.data;

      setWeather({
        temp: Math.round(currentData.main.temp),
        high: Math.round(currentData.main.temp_max),
        low: Math.round(currentData.main.temp_min),
        condition: currentData.weather[0].main,
        icon: currentData.weather[0].icon,
        wind_speed: Math.round(currentData.wind.speed * 3.6),
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        timezone: currentData.timezone,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Cargando datos meteorológicos...</p>
      </div>
    );
  }

  if (!weather) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      .replace(' ', '');
  };

  return (
    <div className="max-w-md mx-auto p-4 font-sans">
      {/* Current Weather */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        {/* Current Temp */}
        <div className="text-center mb-6">
          <div className="text-5xl font-light text-gray-800">{weather.temp}°C</div>
        </div>
        
        {/* Location and Condition */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-xl font-medium text-gray-800">Mendoza</div>
            <div className="text-gray-500 capitalize">{weather.condition}</div>
          </div>
          <div className="text-gray-800">
            {weather.high}° / {weather.low}°
          </div>
        </div>
        
        {/* Hourly Forecast */}
        <div className="flex justify-between mb-6">
          {['03 p. m.', '06 p. m.', '09 p. m.', '12 a. m.'].map((time, index) => (
            <div key={index} className="text-center">
              <div className="text-gray-500 text-sm">{time}</div>
              <div className="text-gray-800 mt-1">8°</div>
            </div>
          ))}
        </div>
        
        {/* Expandable Details */}
        <div className="border-t border-gray-100 pt-4">
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full flex justify-between items-center text-gray-700"
          >
            <span>Detalles</span>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3"
            >
              <div className="flex items-center">
                <Sunrise className="text-gray-500 mr-2" size={18} />
                <span className="text-gray-700">Amanecer: {formatTime(weather.sunrise)}</span>
              </div>
              <div className="flex items-center">
                <Sunset className="text-gray-500 mr-2" size={18} />
                <span className="text-gray-700">Atardecer: {formatTime(weather.sunset)}</span>
              </div>
              <div className="flex items-center">
                <Wind className="text-gray-500 mr-2" size={18} />
                <span className="text-gray-700">Viento: {weather.wind_speed} km/h</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700">Calidad del Aire: Good</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;