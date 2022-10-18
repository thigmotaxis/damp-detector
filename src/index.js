import "./style.css";
import { renderPage } from "./render.js";
import { setDefaultTempScale } from "./storage.js";
import { getWeatherData } from "./storage.js";

setDefaultTempScale();
getWeatherData();
