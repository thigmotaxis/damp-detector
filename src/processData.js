export const processWeatherData = (data) => {
  const processedWeatherData = {
    tempF: `${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}° F`,
    highTempF: `${Math.round(((data.main.temp_max - 273.15) * 9) / 5 + 32)}° F`,
    lowTempF: `${Math.round(((data.main.temp_min - 273.15) * 9) / 5 + 32)}° F`,
    feelsLikeF: `${Math.round(
      ((data.main.feels_like - 273.15) * 9) / 5 + 32
    )}° F`,
    tempC: `${Math.round(data.main.temp - 273.15)}° C`,
    highTempC: `${Math.round(data.main.temp_max - 273.15)}° C`,
    lowTempC: `${Math.round(data.main.temp_min - 273.15)}° C`,
    feelsLikeC: `${Math.round(data.main.feels_like - 273.15)}° C`,
    clouds: data.clouds.all,
    windSpeed: `${Math.round(data.wind.speed * 2.23694)} mph`,
    windDirection: data.wind.deg,
    humidity: `${data.main.humidity}%`,
  };
  console.log(data);
  return processedWeatherData;
};
