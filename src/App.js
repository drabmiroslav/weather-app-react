import "./App.css";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setWeatherData(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf960caa19fce81197c6d7b931ebb206`
      );

      console.log(response.data);

      // main.temp [K], main.humidity [%], main.pressure [Pa], (feels_like, temp_min, temp_max)
      // name (city)
      // sys.country, sys.sunrise (), sys.sunset ()
      // weather[0].main (short desc), weather[0].description, weather[0].icon (ex. "01d")
      // wind.deg (ex. 260°), wind.speed (ex. 6.17) [m/s]
      // clouds.all (ex. 0)

      setWeatherData(response.data);
    } catch (e) {
      if (city === "") {
        setError("Please enter the city");
      } else {
        setError("City not found");
      }
    }
  };

  return (
    <>
      <div class="weather-bg">
        <div>
          <div class="weather-search-container">
            <h1 className="heading-main">Weather App</h1>
            <form id="weatherForm" onSubmit={handleSubmit}>
              <input
                type="text"
                id="cityInput"
                value={city}
                onChange={handleChange}
                placeholder="Enter city name"
              />
              <button type="submit">Search</button>
            </form>
            <div id="error" class="error"></div>
            <div id="weatherResult" class="weather-result"></div>
            <div className="messages">
              {error && <p className="error">{error}</p>}
              {weatherData && (
                <div className="weather-result">
                  <h2>{weatherData.name}</h2>
                  <p className="country">Country: {weatherData.sys.country}</p>
                  <p>
                    Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}{" "}
                    °C
                  </p>
                  <p>Weather: {weatherData.weather[0].description}</p>
                  <p>Humidity: {weatherData.main.humidity}%</p>
                  <p>Pressure: {weatherData.main.pressure} Pa</p>
                  <p>Wind speed: {weatherData.wind.speed} m/s</p>
                </div>
              )}
            </div>
          </div>
          <div className="credits">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/miroslav-drab"
              rel="noreferrer"
            >
              Developed by MD
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
