import OpenAI from 'openai';
import dotenv from 'dotenv';
import {getWeatherData} from '../controllers/weatherController.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Function to generate an AI-powered weather summary
async function generateWeatherText(user) {
  try {
    console.log('--------------------generateWeatherText------------------------',user.email, user.location);
    const req = { body: { email: user.email } }; 
    const weatherData = await getWeatherData(req);
    if (!weatherData) return null;
    // Generate AI text summary
    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   max_tokens: 50,
    //   messages: [
    //     { role: "system", content: "You are a weather assistant." },
    //     { 
    //       role: "user", 
    //       content: `Generate a short weather update for ${user.location}. 
    //       Temperature: ${weatherData.main.temp}°C, 
    //       Condition: ${weatherData.weather[0].description}. 
    //       Keep it under 50 words.` 
    //     }
    //   ],
    // });

    // const aiText = response.choices[0].message.content;
    //console.log('-----------------------aiText------------------',generateWeatherText)
    // Combine AI text with weather data
    // const report = `
    //   🌍 **Location:** ${user.location}  
    //   🌡️ **Temperature:** ${weatherData.main.temp}°C  
    //   ☁️ **Condition:** ${weatherData.weather[0].description}  
    //   💨 **Wind Speed:** ${weatherData.wind.speed} m/s  
    //   🔹 **AI Summary:** ${aiText}  
    // `;
    const report = `
      🌍 **Location:** ${user.location}  
      🌡️ **Temperature:** ${weatherData.main.temp}°C  
      ☁️ **Condition:** ${weatherData.weather[0].description}  
      💨 **Wind Speed:** ${weatherData.wind.speed} m/s  
    `;

    return report;
  } catch (error) {
    console.error("Error generating weather text:", error);
    return null;
  }
}



export { generateWeatherText };
