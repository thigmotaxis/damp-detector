import { add } from "date-fns";

export const getCoordinates = (data) => {
  const coordinates = {
    location: data[0].name,
    latitude: data[0].lat,
    longitude: data[0].lon,
  };

  return coordinates;
};

export const processWeatherData = (data) => {
  const processedWeatherData = {
    localTimezoneOffset: data.timezone_offset / 3600,
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
      dailyConditions: data.daily[0].weather[0].main,
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
      dailyConditions: data.daily[1].weather[0].main,
      tempRangeF: `H: ${Math.round(
        ((data.daily[0].temp.max - 273.15) * 9) / 5 + 32
      )}° F  L: ${Math.round(
        ((data.daily[1].temp.min - 273.15) * 9) / 5 + 32
      )}° F`,
      tempRangeC: `H: ${Math.round(
        data.daily[1].temp.max - 273.15
      )}° C  L: ${Math.round(data.daily[1].temp.min - 273.15)}° C`,
    },
    day2: {
      dayName: "",
      dailyConditions: data.daily[2].weather[0].main,
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
      dailyConditions: data.daily[3].weather[0].main,
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
      dailyConditions: data.daily[4].weather[0].main,
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
      dailyConditions: data.daily[5].weather[0].main,
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
      dailyConditions: data.daily[6].weather[0].main,
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

export const getLocalDays = () => {
  const localTimezoneOffset = JSON.parse(
    window.localStorage.getItem("currentWeatherData")
  ).localTimezoneOffset;
  const myTimezoneOffset = new Date().getTimezoneOffset() / 60;
  const differential = localTimezoneOffset + myTimezoneOffset;
  const localDate = add(new Date(), { hours: differential });
  const localDay = localDate.getDay();

  const days = ["Today"];

  for (let i = 1; i < 7; i++) {
    // i is initialized at 1 because we do not want to retrieve today's name and this seems cleaner than (let day = (localDay + i + 1))
    let day = (localDay + i) % 7; // % operand prevents error when day + i > 6
    const dayName =
      day === 0
        ? "Sunday"
        : day === 1
        ? "Monday"
        : day === 2
        ? "Tuesday"
        : day === 3
        ? "Wednesday"
        : day === 4
        ? "Thursday"
        : day === 5
        ? "Friday"
        : "Saturday";
    days.push(dayName);
  }

  return days;
};
