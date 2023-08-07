import React, { useEffect, useState } from "react";
import Axios from "axios";
import Forecast from "../forcast/Forecast";
import { BaseURL, API_KEY } from "../../utility/ApiKey";
import dateBuilder from "../../utility/DateBuilder";
import Clock from "react-live-clock";
import loader from "../../utility/images/foggy.gif";
import style from "./CurrentLocation.module.css";

export default function CurrentLocation() {
  const [weather, setWeather] = useState("");

  // https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      (error) => {
        fetchWeatherData(28.67, 77.22);
        alert(
          "You have disable location service. Allow 'This App' to access your current location will be used for calculating Real time weather."
        );
        console.log("Error fetching geolocation:", error);
      }
    );
  }, []);

  const fetchWeatherData = (latitude, longitude) => {
    Axios.get(
      `${BaseURL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err));
  };

  const WeatherData = weather?.weather?.[0];
  const cityName = weather?.name;
  const country = weather?.sys?.country;
  const temperatureC = Math.round(weather?.main?.temp - 273.15);

  console.log(weather);

  return (
    <div className={style.CurrentLocation_div}>
      {temperatureC ? (
        <div className={style.CurrentLocation_container}>
          <div className={style.CurrentLocation__screen}>
            <div className={style.CurrentLocationscreen__place}>
              <h1>{cityName}</h1>
              <h3>{country}</h3>
            </div>
            <div className={style.CurrentLocationscreen__div2}>
              <div className={style.CurrentLocationscreen__time}>
                <Clock
                  format="HH:mm:ss"
                  interval={1000}
                  ticking={true}
                  className={style.CurrentLocationscreen__timeClock}
                />
                <div>{dateBuilder(new Date())}</div>
              </div>
              <p>{temperatureC}°c</p>
            </div>
          </div>
          <Forecast weather={WeatherData?.main} code={WeatherData?.icon} />
        </div>
      ) : (
        <div className={style.CurrentLocation__loaderScreen}>
          <img src={loader} alt="weather loader" style={{ width: "20%" }} />
          <h2>Detecting your location</h2>
          <h4>
            Your current location wil be displayed on the App & used for
            calculating Real time weather.
          </h4>
        </div>
      )}
    </div>
  );
}
