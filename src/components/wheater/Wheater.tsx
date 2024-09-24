// import React from 'react'
// import styled from 'styled-components'
// import { Sun, Sunrise, Sunset, Wind } from 'lucide-react'

// const WeatherCard = styled.div`
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
//   color: white;
//   padding: 1rem;
//   max-width: 28rem;
//   margin: 0 auto;
//   background: linear-gradient(to bottom right, #3b82f6, #8b5cf6);
//   border-radius: 0.75rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
// `

// const CurrentWeather = styled.div`
//   margin-bottom: 1.5rem;
//   text-align: center;

//   h1 {
//     font-size: 2.25rem;
//     font-weight: bold;
//     margin-bottom: 0.5rem;
//   }

//   p:first-of-type {
//     font-size: 1.25rem;
//     margin-bottom: 0.25rem;
//   }

//   p:last-of-type {
//     font-size: 0.875rem;
//   }
// `

// const HourlyForecast = styled.div`
//   margin-bottom: 1.5rem;
//   overflow-x: auto;
//   white-space: nowrap;

//   & > div {
//     display: inline-flex;
//     gap: 1rem;
//   }
// `

// const HourlyItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   span:first-child {
//     font-size: 0.875rem;
//     margin-bottom: 0.25rem;
//   }

//   span:nth-child(2) {
//     font-size: 1.5rem;
//     margin-bottom: 0.25rem;
//   }

//   span:last-child {
//     font-size: 0.875rem;
//     font-weight: 500;
//   }
// `

// const DailyInfo = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1rem;
//   font-size: 0.875rem;

//   & > div {
//     display: flex;
//     align-items: center;
//   }

//   svg {
//     width: 1.25rem;
//     height: 1.25rem;
//     margin-right: 0.5rem;
//   }
// `

// export default function WeatherComponent() {
//   // Mock data - replace with real API data in a production app
//   const currentWeather = {
//     temperature: 22,
//     condition: 'Sunny',
//     highLow: '24° / 18°',
//   }

//   const hourlyForecast = [
//     { time: '12 PM', temp: 22, icon: '☀️' },
//     { time: '1 PM', temp: 23, icon: '🌤️' },
//     { time: '2 PM', temp: 24, icon: '☀️' },
//     { time: '3 PM', temp: 24, icon: '☀️' },
//     { time: '4 PM', temp: 23, icon: '🌤️' },
//     { time: '5 PM', temp: 22, icon: '🌤️' },
//     { time: '6 PM', temp: 21, icon: '🌥️' },
//     { time: '7 PM', temp: 20, icon: '🌥️' },
//   ]

//   const dailyInfo = {
//     sunrise: '6:45 AM',
//     sunset: '8:30 PM',
//     airQuality: 'Good',
//     wind: '10 km/h',
//   }

//   return (
//     <WeatherCard>
//       <CurrentWeather>
//         <h1>{currentWeather.temperature}°C</h1>
//         <p>{currentWeather.condition}</p>
//         <p>{currentWeather.highLow}</p>
//       </CurrentWeather>

//       <HourlyForecast>
//         <div>
//           {hourlyForecast.map((hour, index) => (
//             <HourlyItem key={index}>
//               <span>{hour.time}</span>
//               <span>{hour.icon}</span>
//               <span>{hour.temp}°</span>
//             </HourlyItem>
//           ))}
//         </div>
//       </HourlyForecast>

//       <DailyInfo>
//         <div>
//           <Sunrise />
//           <span>Sunrise: {dailyInfo.sunrise}</span>
//         </div>
//         <div>
//           <Sunset />
//           <span>Sunset: {dailyInfo.sunset}</span>
//         </div>
//         <div>
//           <Wind />
//           <span>Wind: {dailyInfo.wind}</span>
//         </div>
//         <div>
//           <Sun />
//           <span>Air Quality: {dailyInfo.airQuality}</span>
//         </div>
//       </DailyInfo>
//     </WeatherCard>
//   )
// }

// import React from 'react'
// import styles from './Wheater.module.css'
// import { Sun, Sunrise, Sunset, Wind } from 'lucide-react'

// export default function WeatherComponent() {
//   const currentWeather = {
//     temperature: 22,
//     condition: 'Sunny',
//     highLow: '24° / 18°',
//   }

//   const hourlyForecast = [
//     { time: '12 PM', temp: 22, icon: '☀️' },
//     { time: '1 PM', temp: 23, icon: '🌤️' },
//     { time: '2 PM', temp: 24, icon: '☀️' },
//     { time: '3 PM', temp: 24, icon: '☀️' },
//     { time: '4 PM', temp: 23, icon: '🌤️' },
//     { time: '5 PM', temp: 22, icon: '🌤️' },
//     { time: '6 PM', temp: 21, icon: '🌥️' },
//     { time: '7 PM', temp: 20, icon: '🌥️' },
//   ]

//   const dailyInfo = {
//     sunrise: '6:45 AM',
//     sunset: '8:30 PM',
//     airQuality: 'Good',
//     wind: '10 km/h',
//   }

//   return (
//     <div className={styles.weatherCard}>
//       <div className={styles.currentWeather}>
//         <h1>{currentWeather.temperature}°C</h1>
//         <p>{currentWeather.condition}</p>
//         <p>{currentWeather.highLow}</p>
//       </div>

//       <div className={styles.hourlyForecast}>
//         <div>
//           {hourlyForecast.map((hour, index) => (
//             <div className={styles.hourlyItem} key={index}>
//               <span>{hour.time}</span>
//               <span>{hour.icon}</span>
//               <span>{hour.temp}°</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className={styles.dailyInfo}>
//         <div>
//           <Sunrise />
//           <span>Sunrise: {dailyInfo.sunrise}</span>
//         </div>
//         <div>
//           <Sunset />
//           <span>Sunset: {dailyInfo.sunset}</span>
//         </div>
//         <div>
//           <Wind />
//           <span>Wind: {dailyInfo.wind}</span>
//         </div>
//         <div>
//           <Sun />
//           <span>Air Quality: {dailyInfo.airQuality}</span>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useState } from 'react'
import styles from './Wheater.module.css'
import { Sun, Sunrise, Sunset, Wind } from 'lucide-react'

export default function WeatherComponent() {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentWeather = {
    temperature: 22,
    condition: 'Sunny',
    highLow: '24° / 18°',
  }

  const hourlyForecast = [
    { time: '12 PM', temp: 22, icon: '☀️' },
    { time: '1 PM', temp: 23, icon: '🌤️' },
    { time: '2 PM', temp: 24, icon: '☀️' },
    { time: '3 PM', temp: 24, icon: '☀️' },
    { time: '4 PM', temp: 23, icon: '🌤️' },
    { time: '5 PM', temp: 22, icon: '🌤️' },
    { time: '6 PM', temp: 21, icon: '🌥️' },
    { time: '7 PM', temp: 20, icon: '🌥️' },
  ]

  const dailyInfo = {
    sunrise: '6:45 AM',
    sunset: '8:30 PM',
    airQuality: 'Good',
    wind: '10 km/h',
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className={styles.weatherCard}>
      <div className={styles.currentWeather} onClick={toggleExpand}>
        <h1>{currentWeather.temperature}°C</h1>
        <p>{currentWeather.condition}</p>
        <p>{currentWeather.highLow}</p>
        <button className={styles.toggleButton}>
          {isExpanded ? 'Ver menos' : 'Ver más'}
        </button>
      </div>

      {/* Mostrar el contenido expandido solo si el estado isExpanded es true */}
      {isExpanded && (
        <>
          <div className={styles.hourlyForecast}>
            <div>
              {hourlyForecast.map((hour, index) => (
                <div className={styles.hourlyItem} key={index}>
                  <span>{hour.time}</span>
                  <span>{hour.icon}</span>
                  <span>{hour.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dailyInfo}>
            <div>
              <Sunrise />
              <span>Amanecer: {dailyInfo.sunrise}</span>
            </div>
            <div>
              <Sunset />
              <span>Atardecer: {dailyInfo.sunset}</span>
            </div>
            <div>
              <Wind />
              <span>Viento: {dailyInfo.wind}</span>
            </div>
            <div>
              <Sun />
              <span>Calidad del Aire: {dailyInfo.airQuality}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
