import express from 'express';
import { getWeatherData } from '../controllers/weatherController.js';
import { getWeatherForUserAndDate } from "../controllers/weatherController.js";

const router = express.Router();

router.post('/weather', getWeatherData);

router.get("/dayweather", getWeatherForUserAndDate);

export default router;
