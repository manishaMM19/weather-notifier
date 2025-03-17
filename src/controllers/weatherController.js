import axios from 'axios';
import Weather from "../models/Weather.js";
import User from "../models/User.js";
import 'dotenv/config'; 

export const getWeatherData = async (req,res) => {
  try {
    console.log('-------------------------getWeatherData-------------------------',req)
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const location = user.location; 
    console.log(`Fetching coordinates for location: ${location}`);

    const googleApiKey = process.env.GOOGLE_API_KEY; 
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`;

    // Get the coordinates (lat, lng) from Google Geocoding API
    const { data: geoData } = await axios.get(geoUrl);

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(400).json({ error: "Unable to fetch coordinates for the location" });
    }

    const { lat, lng } = geoData.results[0].geometry.location;
    console.log(`Coordinates of ${location}: Latitude = ${lat}, Longitude = ${lng}`);

    const weatherApiKey = process.env.WEATHER_API_KEY; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}`;

    const { data: weatherData } = await axios.get(weatherUrl);
    console.log('------------------------------weatherData---------------------------------',weatherData)
    const weatherEntry = new Weather({ userId: user._id, weatherData: weatherData });
    await weatherEntry.save();
    // Send the fetched weather data in the response
    console.log('------------------------weatherEntry')
    //res.json({ weather: weatherData });
    //console.log('--------------------------res------------------------',res)
    return weatherData;
    // res.json({ weather: weatherData });
  } catch (error) {
    console.log('Error fetching weather data:', error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

export const getWeatherForUserAndDate = async (req, res) => {
  try {
    const { email, date } = req.body; // Get email & date from query params

    if (!email || !date) {
      return res.status(400).json({ error: "Email and date are required." });
    }

    // Convert date string to start and end of the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find all weather records for the user on the given date
    const weatherRecords = await Weather.find({
      userId: user._id,
      date: { $gte: startOfDay, $lte: endOfDay }, // Match date range
    });

    if (weatherRecords.length === 0) {
      return res.status(404).json({ error: "No weather data found for this date." });
    }

    res.json({ weatherRecords });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};


