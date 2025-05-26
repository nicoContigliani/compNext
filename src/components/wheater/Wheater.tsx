import React, { useState } from 'react';
import styles from './Wheater.module.css';
import { Sun, Sunrise, Sunset, Wind } from 'lucide-react';

export default function WeatherComponent({ forecast }: any[] | any | undefined) {
  console.log("🚀 ~ WeatherComponent ~ forecast:", forecast)
  const [isExpanded, setIsExpanded] = useState(false);

  const currentWeather = {
    temperature: 22,
    condition: 'Sunny',
    highLow: '24° / 18°',
    where: "Mendoza"
  };

  // const hourlyForecast = [
  //   { time: '12 PM', temp: 22, icon: '☀️' },
  //   { time: '1 PM', temp: 23, icon: '🌤️' },
  //   { time: '2 PM', temp: 24, icon: '☀️' },
  //   { time: '3 PM', temp: 24, icon: '☀️' },
  //   { time: '4 PM', temp: 23, icon: '🌤️' },
  //   { time: '5 PM', temp: 22, icon: '🌤️' },
  //   { time: '6 PM', temp: 21, icon: '🌥️' },
  //   { time: '7 PM', temp: 20, icon: '🌥️' },
  // ];


  const hourlyForecast = forecast;


  const dailyInfo = {
    sunrise: '6:45 AM',
    sunset: '8:30 PM',
    airQuality: 'Good',
    wind: '10 km/h',
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div onClick={toggleExpand} className={`${styles.weatherCard} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.titleCenter}>
        <h1>{currentWeather.temperature}°C</h1>
      </div>

      <div className={styles.currentWeather} >
        <div className={styles.weatherDetails}>
          <div>{currentWeather.where}</div>
          <h4 className={styles.conditionsCenter}>{currentWeather.condition}</h4>
          <h4>☀️</h4>
          <h5>{currentWeather.highLow}</h5>
          <hr />
        </div>
      </div>

      {/* <button className={styles.toggleButton}>
        {isExpanded ? 'Ver menos' : 'Ver más'}
      </button> */}

      {isExpanded && (
        <>
          <div className={styles.hourlyForecast}>
            {hourlyForecast.map((hour:any, index:any) => (
              <div className={styles.hourlyItem} key={index}>
                <span>{hour.time}</span>
                <span>{hour.icon}</span>
                <span>{hour.temp}°</span>
              </div>
            ))}
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
  );
}
