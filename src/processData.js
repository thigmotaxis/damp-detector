import { add } from "date-fns";

export const getCoordinates = (data) => {
  const coordinates = {
    location: data[0].name,
    latitude: data[0].lat,
    longitude: data[0].lon,
  };

  return coordinates;
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
