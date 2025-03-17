# Weather API Application

This project provides an API that allows users to fetch weather data based on their registered location. It integrates with Google Geocoding API to get coordinates and OpenWeather API to retrieve weather information.

## Features
- User registration with email and location
- Fetch weather data for a user's location
- Store and retrieve weather data for a specific date
- Error handling for API failures and missing data

---

## Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Environment Variables
Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_google_api_key
WEATHER_API_KEY=your_openweather_api_key
```

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-repo/weather-api-app.git
cd weather-api-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

The server will start on `http://localhost:5000/`

---

## API Endpoints

### 1. **Register User**
`POST /api/users/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "location": "Colombo, Sri Lanka"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

---

### 2. **Get Weather Data**
`POST /api/weather/getWeather`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```
**Response:**
```json
{
  "weather": {
    "temperature": "30°C",
    "description": "Clear sky"
  }
}
```

---

### 3. **Get Weather Data by Date**
`GET /api/weather/getWeatherByDate`

**Request Query Parameters:**
```
?email=user@example.com&date=2025-03-15
```
**Response:**
```json
{
  "weather": [
    {
      "date": "2025-03-15",
      "temperature": "28°C",
      "description": "Cloudy"
    }
  ]
}
```

---

## Project Structure
```
/weather-api-app
│── models
│   ├── User.js
│   ├── Weather.js
│── routes
│   ├── userRoutes.js
│   ├── weatherRoutes.js
│── controllers
│   ├── userController.js
│   ├── weatherController.js
│── middleware
│   ├── errorMiddleware.js
│── config
│   ├── db.js
│── server.js
│── .env
│── package.json
```

---

## Error Handling
- **400 Bad Request**: Missing or invalid parameters
- **404 Not Found**: User or weather data not found
- **500 Internal Server Error**: External API failures or database issues

---

## License
This project is open-source and available under the MIT License.

---

## Author
Created by Maneesha 😊

