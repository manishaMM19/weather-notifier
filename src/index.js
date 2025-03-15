import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cron from 'node-cron';
import { sendEmail } from './services/emailService.js';
import { generateWeatherText } from './services/weatherService.js';
import User from './models/User.js'; 
import weatherRouter from './routes/weatherRoutes.js';
import userRoutes from "./routes/userRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use('/api', weatherRouter);

app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

//Send Hourly Emails
// cron.schedule('*/3 * * * *', async () => {  
//   try {
//     const users = await User.find(); // Get all users

//     for (const user of users) {
//       const report = await generateWeatherText(user);
//       if (!report) continue;

//       await sendEmail(user.email, 'Weather Report', report);
//     }

//     console.log('Weather emails sent!');
//   } catch (error) {
//     console.error('Error sending weather emails:', error);
//   }
// });


// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
