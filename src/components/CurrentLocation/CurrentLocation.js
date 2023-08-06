import React, { useEffect, useState } from "react";
import Axios from "axios";
import Forecast from "../forcast/Forecast";
import { BaseURL, API_KEY } from "../../utility/ApiKey";
import dateBuilder from "../../utility/DateBuilder";
import Clock from "react-live-clock";
import loader from "../../utility/images/foggy.gif";

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
    <div>
      {temperatureC ? (
        <div>
          <h1>{cityName}</h1>
          <h3>{country}</h3>
          <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          <div className="current-date">{dateBuilder(new Date())}</div>
          <Forecast weather={WeatherData?.main} code={WeatherData?.icon} />
        </div>
      ) : (
        <div>
          <img src={loader} alt="weather loader" />
          <h3>Detecting your location</h3>
          <h3>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </div>
      )}
    </div>
  );
}
