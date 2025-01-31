import React, { useState, useEffect } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import DotsLoading from "./DotsLoading";
import { WeatherData } from "../types";
import { weatherIconMap } from "../store";

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Kolkata"); // Default location
  const [searchTerm, setSearchTerm] = useState(location);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: loc,
            appid: apiKey,
            units: "metric",
          },
        }
      );
      setWeather(response.data);
    } catch (error) {
      setWeather(null); // Clear previous weather data
      alert("Failed to fetch weather data. Please try again."); // Inform the user of the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setLocation(searchTerm);
    } else {
      alert("Please enter a valid location.");
    }
  };

  const getWeatherIcon = (weatherMain: string) => {
    return weatherIconMap[weatherMain] || "ri-question-line";
  };

  const isDaytime = () => {
    if (!weather) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return (
      currentTime >= weather.sys.sunrise && currentTime < weather.sys.sunset
    );
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        isDaytime()
          ? "bg-gradient-to-r from-orange-400 to-blue-500 transition-colors duration-500"
          : "bg-gradient-to-r from-blue-800 to-slate-800 transition-colors duration-500"
      } p-6`}
    >
      <div className="flex items-center mb-6 w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter location"
          className="outline-none flex-grow px-4 py-2 border rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg shadow hover:bg-blue-600 transition-colors flex items-center justify-center"
        >
          <i className="ri-search-line text-xl"></i>
        </button>
      </div>
      <div className="w-full max-w-lg">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full h-80 mt-6 flex flex-col justify-center items-center">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <DotsLoading />
            </div>
          ) : (
            weather && (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {weather.name}
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <i
                      className={`${getWeatherIcon(
                        weather.weather[0].main
                      )} text-4xl text-gray-600`}
                    ></i>
                    <p className="text-gray-600 text-xl">
                      {weather.weather[0].description.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="mt-6 text-center grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-1">
                    <i className="ri-thermometer-line text-xl text-gray-600"></i>
                    <p className="text-gray-600 text-lg">
                      Temp: {weather.main.temp} °C
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-thermometer-line text-xl text-gray-600"></i>
                    <p className="text-gray-600 text-lg">
                      Feels Like: {weather.main.feels_like} °C
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-drop-line text-xl text-gray-600"></i>
                    <p className="text-gray-600 text-lg">
                      Humidity: {weather.main.humidity}%
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-windy-line text-xl text-gray-600"></i>
                    <p className="text-gray-600 text-lg">
                      Wind Speed: {weather.wind.speed} m/s
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-sun-line text-xl"></i>
                    <p className="text-gray-600 text-lg">
                      Sunrise: {formatTime(weather.sys.sunrise)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="ri-sun-foggy-line text-xl"></i>
                    <p className="text-gray-600 text-lg">
                      Sunset: {formatTime(weather.sys.sunset)}
                    </p>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <footer className="text-center text-gray-500 text-sm mt-8">
        <p>Weather data by OpenWeather</p>
      </footer>
    </div>
  );
};

export default Weather;
