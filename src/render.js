import clearIcon from "./images/icons/clearIcon-24w.png";
import ghLogo from "./images/gitHubLogo-24w.png";
import copyright from "./images/copyright-24w.png";

// BEGIN RENDERING OF STATIC ELEMENTS

(() => {
  const body = document.querySelector("body");
  body.insertAdjacentHTML(
    "afterbegin",
    `<header>
    <div class="title">Damp Detector</div>
  </header>

  <div class="mainContent">
    <div class="location">--</div>
    <div class="temp">--</div>
    <div class="buttonContainer">
    <button class="toggleTempScale">Display Celsius</button>
      <button class="changeLocation">Change Location</button>
      <input
          type="text"
          placeholder="Enter a city, state, or country"
          class="locationInput hidden"
        />
        <button class="submit hidden">Submit</button>
    </div>
    <div class="conditions"></div>
   
    <ul class="sevenDayForecast">
        <li class="forecastContainer">
          <div class="day0">Day 0</div>
          <img
            class="weatherIcon"
            alt="clear"
          />
          <div class="dayRange">
            <div class="day0High">H: X°</div>
            <div class="day0Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day1">Day 1</div>
          <img
            class="weatherIcon"
            alt="cloudy"
          />
          <div class="dayRange">
            <div class="day1High">H: X°</div>
            <div class="day1Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day2">Day 2</div>
          <img
            class="weatherIcon"
            alt="partly cloudy"
          />
          <div class="dayRange">
            <div class="day2High">H: X°</div>
            <div class="day2Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day3">Day 3</div>
          <img
            class="weatherIcon"
            alt="rainy"
          />
          <div class="dayRange">
            <div class="day3High">H: X°</div>
            <div class="day3Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day4">Day 4</div>
          <img
            class="weatherIcon"
            alt="clear"
          />
          <div class="dayRange">
            <div class="day4High">H: X°</div>
            <div class="day4Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day5">Day 5</div>
          <img
            class="weatherIcon"
            alt="clear"
          />
          <div class="dayRange">
            <div class="day5High">H: X°</div>
            <div class="day5Low">L: Y°</div>
          </div>
        </li>
        <li class="forecastContainer">
          <div class="day6">Day 6</div>
          <img
            class="weatherIcon"
            alt="clear"
          />
          <div class="dayRange">
            <div class="day6High">H: X°</div>
            <div class="day6Low">L: Y°</div>
          </div>
        </li>
      </ul>

    <div class="otherWeatherInfo">
    <div class="other windSpeed">--</div>
    <div class="other windDirection">--</div>
      <div class="other humidity">--</div>
      <div class="other feelsLike">--</div>
    </div>
  </div>
  <footer>
    <a
      href="https://github.com/thigmotaxis/damp-detector"
      class="sourceContainer"
    >
      <img class="repoLogo" alt="the github logo" />
      <div>View Source</div>
    </a>
    <div class="copyrightContainer">
      <img class="copyrightSymbol" alt="the copyright symbol" />
      <div>2022 Abe Industries</div>
    </div>
  </footer>`
  );

  const weatherIcons = document.querySelectorAll(".weatherIcon");
  weatherIcons.forEach((element, index) => {
    element.setAttribute("src", clearIcon);
  });

  const repoLogo = document.querySelector(".repoLogo");
  repoLogo.setAttribute("src", ghLogo);

  const copyrightSymbol = document.querySelector(".copyrightSymbol");
  copyrightSymbol.setAttribute("src", copyright);
})();

// END RENDERING OF STATIC ELEMENTS

export const domCache = {
  html: document.querySelector("html"),
  location: document.querySelector(".location"),
  changeLocation: document.querySelector(".changeLocation"),
  locationInput: document.querySelector(".locationInput"),
  submitLocation: document.querySelector(".submit"),
  toggleTempScale: document.querySelector(".toggleTempScale"),
  weatherIcons: document.querySelectorAll(".weatherIcon"),
  temperature: document.querySelector(".temp"),
  conditions: document.querySelector(".conditions"),
  feelsLike: document.querySelector(".feelsLike"),
  windSpeed: document.querySelector(".windSpeed"),
  windDirection: document.querySelector(".windDirection"),
  humidity: document.querySelector(".humidity"),

  day0: {
    dayName: document.querySelector(".day0"),
    highTemperature: document.querySelector(".day0High"),
    lowTemperature: document.querySelector(".day0Low"),
  },
  day1: {
    dayName: document.querySelector(".day1"),
    highTemperature: document.querySelector(".day1High"),
    lowTemperature: document.querySelector(".day1Low"),
  },
  day2: {
    dayName: document.querySelector(".day2"),
    highTemperature: document.querySelector(".day2High"),
    lowTemperature: document.querySelector(".day2Low"),
  },
  day3: {
    dayName: document.querySelector(".day3"),
    highTemperature: document.querySelector(".day3High"),
    lowTemperature: document.querySelector(".day3Low"),
  },
  day4: {
    dayName: document.querySelector(".day4"),
    highTemperature: document.querySelector(".day4High"),
    lowTemperature: document.querySelector(".day4Low"),
  },
  day5: {
    dayName: document.querySelector(".day5"),
    highTemperature: document.querySelector(".day5High"),
    lowTemperature: document.querySelector(".day5Low"),
  },
  day6: {
    dayName: document.querySelector(".day6"),
    highTemperature: document.querySelector(".day6High"),
    lowTemperature: document.querySelector(".day6Low"),
  },
};
