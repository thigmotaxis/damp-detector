import "./style.css";
import { callAPI } from "./storage.js";
import { modifyDOM } from "./modifyDOM.js";

// Commented out to avoid API calls while testing CSS
callAPI.getWeatherData();
modifyDOM.createHandlerFunctions();
