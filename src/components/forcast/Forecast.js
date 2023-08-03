import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { API_KEY, BaseURL } from "../../utility/ApiKey";
import axios from "axios";
import style from "./Forecast.module.css";

export default function Forecast() {
  // const base_url = https://openweathermap.org/img/wn/${data_coming_from_API}@2x.png
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  const getWeather = () => {
    axios
      .get(`${BaseURL}weather?q=${location}&appid=${API_KEY}`)
      .then((res) => setWeather(res))
      .catch((err) => console.log(err));

    setLocation("");
  };

  console.log(weather);

  return (
    <div className={style.weather_screen}>
      <div className={style.weatherSearch_div}>
        <input
          placeholder="Search any city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className={style.weather__icon}>
          <ImSearch onClick={getWeather} />
        </div>
      </div>
      <div className={style.weather_screenDiv}>
        {weather && weather.data && (
          <div>
            <h1>{weather.data.weather[0].main}</h1>
            <div className={style.weatherOf_place}>
              <h3>
                {weather.data.name},{weather.data.sys.country}
              </h3>
              <img
                className={style.weather_img}
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
                alt="WeatherIcon"
              />
            </div>
            <p>
              Temperature {Math.round(Number(weather.data.main.temp) - 273.15)}
              °c
            </p>
            <p>Humidity {weather.data.main.humidity}%</p>
            <p>Visibility {weather.data.visibility} ml</p>
            <p>Wind Speed {weather.data.wind.speed} Km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}
