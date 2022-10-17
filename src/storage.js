import { renderWeatherData } from "./render";

// getData() - calls API and retrieves object

export const getWeatherData = () => {
  const loc = "seattle";
  // ^^ placeholder for function that will retrieve location from input field
  // const location = getLocation()
  const apiKey = "375ca8e8e974816fe616fd7e2566782a";

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=${apiKey}`;

  const processWeatherData = (data) => {
    const processedWeatherData = {
      tempF: `${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)}° F`,
      highTempF: `${Math.round(
        ((data.main.temp_max - 273.15) * 9) / 5 + 32
      )}° F`,
      lowTempF: `${Math.round(
        ((data.main.temp_min - 273.15) * 9) / 5 + 32
      )}° F`,
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

  const retrieveWeatherData = new Promise((resolve, reject) => {
    const retrievedData = fetch(url, { mode: "cors" });
    if (retrievedData) {
      resolve(retrievedData);
      // returns the retrieved data as a promise
    } else reject("bad data");
    //  returns the string "bad data"
  });

  retrieveWeatherData
    .then((retrievedData) => {
      return retrievedData.json();
      // converts the retrieved JSON data to an enumerable object (similar to parse())
    })
    .then((retrievedData) => {
      const processedWeatherData = processWeatherData(retrievedData);
      return processedWeatherData;
    })
    .then((processedWeatherData) => {
      renderWeatherData(processedWeatherData);
    })
    .catch((error) => {
      console.log(error);
    });
};
