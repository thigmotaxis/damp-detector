import "./style.css";
import { callAPI } from "./storage.js";
import { modifyDOM } from "./modifyDOM.js";

callAPI.getWeatherData();
modifyDOM.createHandlerFunctions();
