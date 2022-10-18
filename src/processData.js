export const processWeatherData = (data) => {
  const processedWeatherData = {
    location: data.name,
    tempF: `${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}° F`,
    highTempF: `H: ${Math.round(
      ((data.main.temp_max - 273.15) * 9) / 5 + 32
    )}° F`,
    lowTempF: `L: ${Math.round(
      ((data.main.temp_min - 273.15) * 9) / 5 + 32
    )}° F`,
    feelsLikeF: `Feels Like: ${Math.round(
      ((data.main.feels_like - 273.15) * 9) / 5 + 32
    )}° F`,
    tempC: `${Math.round(data.main.temp - 273.15)}° C`,
    highTempC: `H: ${Math.round(data.main.temp_max - 273.15)}° C`,
    lowTempC: `L: ${Math.round(data.main.temp_min - 273.15)}° C`,
    feelsLikeC: `Feels Like: ${Math.round(data.main.feels_like - 273.15)}° C`,
    conditions: data.weather[0].main,
    windSpeed: `Wind Speed: ${Math.round(data.wind.speed * 2.23694)} mph`,
    windDirection: `Wind Direction: 
      ${
        data.wind.deg >= 337.5 || data.wind.deg <= 22.5
          ? `${data.wind.deg}° N`
          : data.wind.deg > 22.5 && data.wind.deg <= 67.5
          ? `${data.wind.deg}° NE`
          : data.wind.deg > 67.5 && data.wind.deg <= 112.5
          ? `${data.wind.deg}° E`
          : data.wind.deg > 112.5 && data.wind.deg <= 157.5
          ? `${data.wind.deg}° SE`
          : data.wind.deg > 157.5 && data.wind.deg <= 202.5
          ? `${data.wind.deg}° S`
          : data.wind.deg > 202.5 && data.wind.deg <= 247.5
          ? `${data.wind.deg}° SW`
          : data.wind.deg > 247.5 && data.wind.deg <= 292.5
          ? `${data.wind.deg}° W`
          : `${data.wind.deg}° NW`
      }`,
    humidity: `Humidity: ${data.main.humidity}%`,
  };
  console.log(data);
  return processedWeatherData;
};
