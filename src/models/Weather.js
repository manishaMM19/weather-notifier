import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weatherData: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});

const Weather = mongoose.model("Weather", weatherSchema);

export default Weather;
