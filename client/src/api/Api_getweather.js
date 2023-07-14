import { useState, useEffect } from "react";

//Use OpenWeather API to get the current weather, searching by city name
async function getWeather(search) {
  //const API_KEY = "1ec67ea74c1632d1556649b8d27e3797";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_OpenWeatherMapAPIKEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let cityname = data.name;
  let main = data.weather[0].main;
  //Convert the temperature to Celsius
  let temp = accSub(data.main.temp, 273.15);
  let weather = { cityname, main, temp };

  return weather;
}

export default function useWeather(search) {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setWeather(await getWeather(search));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [search]);
  return {
    loading,
    weather,
    error,
  };
}

//To get an accurate result of subtraction of numbers in javascript
function accSub(arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// ======The data format obtained by the API
// const datatype = {
//   coord: { lon: 153.0281, lat: -27.4679 },
//   weather: [
//     { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" },
//   ],
//   base: "stations",
//   main: {
//     temp: 295.45,
//     feels_like: 295.17,
//     temp_min: 291.09,
//     temp_max: 295.85,
//     pressure: 1010,
//     humidity: 55,
//   },
//   visibility: 10000,
//   wind: { speed: 0.45, deg: 233, gust: 4.02 },
//   clouds: { all: 40 },
//   dt: 1682812418,
//   sys: {
//     type: 2,
//     id: 2012892,
//     country: "AU",
//     sunrise: 1682799133,
//     sunset: 1682839079,
//   },
//   timezone: 36000,
//   id: 2174003,
//   name: "Brisbane",
//   cod: 200,
// };
