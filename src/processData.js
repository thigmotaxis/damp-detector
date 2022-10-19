export const getCoordinates = (data) => {
  const coordinates = {
    location: data[0].name,
    latitude: data[0].lat,
    longitude: data[0].lon,
  };
  console.log(data);
  return coordinates;
};

export const processWeatherData = (data) => {
  const processedWeatherData = {
    location: data.name,
    tempF: `${Math.round(((data.current.temp - 273.15) * 9) / 5 + 32)}° F`,
    // highTempF: `H: ${Math.round(
    //   ((data.current.temp_max - 273.15) * 9) / 5 + 32
    // )}° F`,
    // lowTempF: `L: ${Math.round(
    //   ((data.current.temp_min - 273.15) * 9) / 5 + 32
    // )}° F`,
    // These will get reinstated when I integrate forecast data
    feelsLikeF: `Feels Like: ${Math.round(
      ((data.current.feels_like - 273.15) * 9) / 5 + 32
    )}° F`,
    tempC: `${Math.round(data.current.temp - 273.15)}° C`,
    // highTempC: `H: ${Math.round(data.current.temp_max - 273.15)}° C`,
    // lowTempC: `L: ${Math.round(data.current.temp_min - 273.15)}° C`,
    // These will get reinstated when I integrate forecast data
    feelsLikeC: `Feels Like: ${Math.round(
      data.current.feels_like - 273.15
    )}° C`,
    conditions: data.current.weather[0].main,
    windSpeed: `Wind Speed: ${Math.round(
      data.current.wind_speed * 2.23694
    )} mph`,
    windDirection: `Wind Direction:
      ${
        data.current.wind_deg >= 337.5 || data.current.wind_deg <= 22.5
          ? `${data.current.wind_deg}° N`
          : data.current.wind_deg > 22.5 && data.current.wind_deg <= 67.5
          ? `${data.current.wind_deg}° NE`
          : data.current.wind_deg > 67.5 && data.current.wind_deg <= 112.5
          ? `${data.current.wind_deg}° E`
          : data.current.wind_deg > 112.5 && data.current.wind_deg <= 157.5
          ? `${data.current.wind_deg}° SE`
          : data.current.wind_deg > 157.5 && data.current.wind_deg <= 202.5
          ? `${data.current.wind_deg}° S`
          : data.current.wind_deg > 202.5 && data.current.wind_deg <= 247.5
          ? `${data.current.wind_deg}° SW`
          : data.current.wind_deg > 247.5 && data.current.wind_deg <= 292.5
          ? `${data.current.wind_deg}° W`
          : `${data.current.wind_deg}° NW`
      }`,
    humidity: `Humidity: ${data.current.humidity}%`,
  };
  console.log(data);
  return processedWeatherData;
};
