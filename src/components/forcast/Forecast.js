import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { API_KEY, BaseURL } from "../../utility/ApiKey";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import style from "./Forecast.module.css";

const defaults = {
  color: "white",
  size: 114,
  animate: true,
};

export default function Forecast(props) {
  // const base_url = https://openweathermap.org/img/wn/${data_coming_from_API}@2x.png
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");

  let codeMapping = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_NIGHT",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };

  const getWeather = () => {
    axios
      .get(`${BaseURL}weather?q=${location}&appid=${API_KEY}`)
      .then((res) => setWeather(res))
      .catch((err) => console.log(err));

    setLocation("");
  };

  return (
    <div className={style.weather_screen}>
      <div>
        <ReactAnimatedWeather
          icon={codeMapping[props.code]}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <p className={style.currentCity__weather}>{props.weather}</p>
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
            <p>
              {weather.data.name},{weather.data.sys.country}
            </p>
            <div className={style.weatherOf_place}>
              {weather.data.weather[0].main}
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
