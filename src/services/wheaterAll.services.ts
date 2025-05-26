// import axios from 'axios';

// interface HourlyForecast {
//   time: string;
//   temp: number;
//   icon: string;
// }

// // Function to fetch hourly forecast
// const getHourlyForecast = async (lat: number, lon: number, apiKey: string): Promise<HourlyForecast[]> => {
//   try {
//     // Requesting data from the OpenWeatherMap API

//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es&cnt=24`);
    
//     const data = response.data;
//     const seenTimes: Set<string> = new Set(); // To track unique times

//     // Processing and filtering data
//     const hourlyForecast: HourlyForecast[] = data.list
//       .filter((item: any) => {
//         // Convert timestamp to readable time and check if it's unique
//         const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         if (seenTimes.has(time)) {
//           return false; // Skip if the time has been seen already
//         }
//         seenTimes.add(time);
//         return true;
//       })
//       .map((item: any) => ({
//         time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formatted time
//         temp: Math.round(item.main.temp), // Rounded temperature
//         icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`, // Icon URL
        
//       }));

//     return hourlyForecast;
//   } catch (error) {
//     console.error('Error al obtener el pronóstico:', error);
//     return [];
//   }
// };

// export default getHourlyForecast;

// import axios from 'axios';

// interface HourlyForecast {
//   time: string;
//   temp: number;
//   icon: string;
// }

// // Function to fetch hourly forecast and fill in missing hours
// const getHourlyForecast = async (lat: number, lon: number, apiKey: string): Promise<HourlyForecast[]> => {
//   try {
//     // Requesting data from the OpenWeatherMap API
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es&cnt=8` // Fetching data for 24 hours (8 entries, 3-hour interval)
//     );

//     const data = response.data;

//     // Create an empty array for hourly forecasts
//     const hourlyForecast: HourlyForecast[] = [];

//     // Loop through the 3-hour forecast data and fill in missing hours
//     for (let i = 0; i < 24; i++) {
//       // Convert 'i' to a Date object for current hour
//       const targetTime = new Date();
//       targetTime.setHours(i, 0, 0, 0); // Set to hour i, minutes/seconds/milliseconds to 0
      
//       // Find the closest data point from the API response
//       const closestData = data.list.reduce((closest: any, item: any) => {
//         const itemTime = new Date(item.dt * 1000);
//         const timeDiff = Math.abs(itemTime.getTime() - targetTime.getTime());
//         const closestTimeDiff = Math.abs(new Date(closest.dt * 1000).getTime() - targetTime.getTime());
//         return timeDiff < closestTimeDiff ? item : closest;
//       }, data.list[0]);

//       // Add the forecast for each hour
//       hourlyForecast.push({
//         time: targetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formatted time
//         temp: Math.round(closestData.main.temp), // Rounded temperature
//         icon: `http://openweathermap.org/img/wn/${closestData.weather[0].icon}@2x.png`, // Icon URL
//       });
//     }

//     return hourlyForecast;
//   } catch (error) {
//     console.error('Error al obtener el pronóstico:', error);
//     return [];
//   }
// };

// export default getHourlyForecast;


// import axios from 'axios';

// interface HourlyForecast {
//   time: string;
//   temp: number;
//   icon: string;
// }

// const iconDictionary: { [key: string]: string } = {
//   '01d': '☀️',  // Cielo claro (día)
//   '01n': '🌕',  // Cielo claro (noche)
//   '02d': '🌤️',  // Pocas nubes (día)
//   '02n': '🌑',  // Pocas nubes (noche)
//   '03d': '🌥️',  // Nubes dispersas (día)
//   '03n': '☁️',  // Nubes dispersas (noche)
//   '04d': '☁️',  // Nubes rotas (día)
//   '04n': '☁️',  // Nubes rotas (noche)
//   '09d': '🌧️',  // Lluvia ligera (día)
//   '09n': '🌧️',  // Lluvia ligera (noche)
//   '10d': '🌦️',  // Lluvia con sol (día)
//   '10n': '🌧️',  // Lluvia (noche)
//   '11d': '🌩️',  // Tormenta (día)
//   '11n': '🌩️',  // Tormenta (noche)
//   '13d': '❄️',  // Nieve (día)
//   '13n': '❄️',  // Nieve (noche)
//   '50d': '🌫️',  // Neblina (día)
//   '50n': '🌫️',  // Neblina (noche)
// };




// // Función para obtener el pronóstico horario
// const getHourlyForecast = async (lat: number, lon: number, apiKey: string, startHour?: number, endHour?: number): Promise<HourlyForecast[]> => {
//   try {
//     // Hacemos la solicitud a la API de OpenWeatherMap
//     const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es&cnt=24`);

//     const data = response.data;
//     const seenTimes: Set<number> = new Set(); // Para rastrear horas únicas

//     // Procesar y filtrar los datos
//     const hourlyForecast: HourlyForecast[] = data.list
//       .filter((item: any) => {
//         const date = new Date(item.dt * 1000); // Aquí se define 'date'
//         const hour = date.getHours(); // Obtener la hora en formato 24h

//         // Si se definen startHour y endHour, aplicar el filtro, de lo contrario incluir todas las horas
//         if (startHour !== undefined && endHour !== undefined) {
//           if (hour < startHour || hour > endHour) {
//             return false; // Excluimos las horas fuera del rango
//           }
//         }

//         if (seenTimes.has(hour)) {
//           return false; // Saltar si ya se ha visto esta hora
//         }

//         seenTimes.add(hour);
//         return true;
//       })
//       .map((item: any) => {
//         const date = new Date(item.dt * 1000); // Aseguramos que 'date' esté definido aquí también
//         return {
//           time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Hora formateada
//           temp: Math.round(item.main.temp), // Temperatura redondeada
//           icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`, // URL del ícono
//         };
//       });

//     return hourlyForecast;
//   } catch (error) {
//     console.error('Error al obtener el pronóstico:', error);
//     return [];
//   }
// };

// export default getHourlyForecast;

import axios from 'axios';

interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
}

// Diccionario de iconos basado en los códigos de OpenWeatherMap
const iconDictionary: { [key: string]: string } = {
  '01d': '☀️',  // Cielo claro (día)
  '01n': '🌕',  // Cielo claro (noche)
  '02d': '🌤️',  // Pocas nubes (día)
  '02n': '🌑',  // Pocas nubes (noche)
  '03d': '🌥️',  // Nubes dispersas (día)
  '03n': '☁️',  // Nubes dispersas (noche)
  '04d': '☁️',  // Nubes rotas (día)
  '04n': '☁️',  // Nubes rotas (noche)
  '09d': '🌧️',  // Lluvia ligera (día)
  '09n': '🌧️',  // Lluvia ligera (noche)
  '10d': '🌦️',  // Lluvia con sol (día)
  '10n': '🌧️',  // Lluvia (noche)
  '11d': '🌩️',  // Tormenta (día)
  '11n': '🌩️',  // Tormenta (noche)
  '13d': '❄️',  // Nieve (día)
  '13n': '❄️',  // Nieve (noche)
  '50d': '🌫️',  // Neblina (día)
  '50n': '🌫️',  // Neblina (noche)
};

// Función para obtener el pronóstico horario
const getHourlyForecast = async (lat: number, lon: number, apiKey: string, startHour?: number, endHour?: number): Promise<HourlyForecast[]> => {
  try {
    // Hacemos la solicitud a la API de OpenWeatherMap
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es&cnt=24`);

    const data = response.data;
    const seenTimes: Set<number> = new Set(); // Para rastrear horas únicas

    // Procesar y filtrar los datos
    const hourlyForecast: HourlyForecast[] = data.list
      .filter((item: any) => {
        const date = new Date(item.dt * 1000); // Aquí se define 'date'
        const hour = date.getHours(); // Obtener la hora en formato 24h

        // Si se definen startHour y endHour, aplicar el filtro, de lo contrario incluir todas las horas
        if (startHour !== undefined && endHour !== undefined) {
          if (hour < startHour || hour > endHour) {
            return false; // Excluimos las horas fuera del rango
          }
        }

        if (seenTimes.has(hour)) {
          return false; // Saltar si ya se ha visto esta hora
        }

        seenTimes.add(hour);
        return true;
      })
      .map((item: any) => {
        const date = new Date(item.dt * 1000); // Aseguramos que 'date' esté definido aquí también
        const iconCode = item.weather[0].icon; // Código del ícono devuelto por la API
        const icon = iconDictionary[iconCode] || '❓'; // Usar el ícono del diccionario o un fallback si no se encuentra

        return {
          time: date.toLocaleTimeString([], { hour: '2-digit', 
            // minute: '2-digit'
           }), // Hora formateada
          temp: Math.round(item.main.temp), // Temperatura redondeada
          icon,  // Tomar el ícono del diccionario
        };
      });

    return hourlyForecast;
  } catch (error) {
    console.error('Error al obtener el pronóstico:', error);
    return [];
  }
};

export default getHourlyForecast;
