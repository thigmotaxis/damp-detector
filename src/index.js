import "./style.css";
import { callAPI } from "./storage.js";
import { modifyDOM } from "./render.js";

callAPI.getWeatherData();
modifyDOM.createHandlerFunctions();
