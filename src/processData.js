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
    current: {
      tempF: `${Math.round(((data.current.temp - 273.15) * 9) / 5 + 32)}° F`,
      feelsLikeF: `Feels Like: ${Math.round(
        ((data.current.feels_like - 273.15) * 9) / 5 + 32
      )}° F`,
      tempC: `${Math.round(data.current.temp - 273.15)}° C`,
      tempRangeF: `H: ${Math.round(
        ((data.daily[0].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[0].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[0].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[0].temp.min - 273.15)}° C`,
      feelsLikeC: `Feels Like: ${Math.round(
        data.current.feels_like - 273.15
      )}° C`,
      conditions: data.current.weather[0].main,
      windSpeed: `Wind Speed: ${Math.round(
        data.current.wind_speed * 2.23694
      )} mph`,
      windDirection: `Wind Direction: ${
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
    },
    day1: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[1].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[1].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[1].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[1].temp.min - 273.15)}° C`,
    },
    day2: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[2].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[2].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[2].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[2].temp.min - 273.15)}° C`,
    },
    day3: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[3].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[3].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[3].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[3].temp.min - 273.15)}° C`,
    },
    day4: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[4].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[4].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[4].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[4].temp.min - 273.15)}° C`,
    },
    day5: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[5].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[5].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[5].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[5].temp.min - 273.15)}° C`,
    },
    day6: {
      dayName: "",
      tempRangeF: `H: ${Math.round(
        ((data.daily[6].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[6].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[6].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[6].temp.min - 273.15)}° C`,
    },
  };
  console.log(data);
  console.log(processedWeatherData);
  return processedWeatherData;
};
