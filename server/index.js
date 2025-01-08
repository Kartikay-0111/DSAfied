import express, { json } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import router from './routes/user.routes.js';
import connectDB from './database/connect.js';
import jwtCheck from './middleware/jwtcheck.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',  // Frontend origin
  credentials: true,  // Allow credentials
  allowedHeaders: ['Authorization', 'Content-Type']  // Allow Authorization header
  
}));

app.use(express.urlencoded({ extended: true }));
app.use(jwtCheck);
// Routes

app.use('/api/users', router);

// Start Server
try{
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch(e){
    console.log("Server failed to start", e.message);
}
