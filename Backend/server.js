// import { GoogleGenAI } from "@google/genai";
// import 'dotenv/config';

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// async function run() {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: "What is HinduRashtra?"
//     });

//     console.log(response.text);
//   } catch (error) {
//     console.error("Gemini Error:", error.message);
//   }
// }

// run();


//Using API endpoints calling 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';

const app = express();
const PORT = 3000;

app.use(express.json());  //Browser send s the data in the JSON format and we need to parse it in the backend using express.json() middleware
app.use(cors());  //Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the web page. By using the cors middleware, we can enable CORS for our Express server, allowing it to accept requests from different origins.Without CORS enabled, if a web page served from one domain tries to make a request to an API on another domain, the browser will block the request for security reasons. By enabling CORS, we can specify which domains are allowed to access our API, or we can allow all domains if needed.
app.use("/api", chatRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);
  }
};

app.listen(PORT, () => {
  
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});






// app.post("/test", async (req, response) => {
  
// });








