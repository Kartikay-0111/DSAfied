import express, { json } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import articleRoute from './routes/article.routes.js';
import problemRoutes from './routes/problem.routes.js';
import connectDB from './database/connect.js';
import jwtCheck from './middleware/jwtcheck.js';
import potdRoutes from './routes/potd.routes.js';
import { Daily } from './models/daily.js';
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
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(jwtCheck);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/article', articleRoute);
app.use('/api', problemRoutes);
app.use('/api/potd',potdRoutes);

// Start Server
try{
    connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}
catch(err){
  console.log(err);
}