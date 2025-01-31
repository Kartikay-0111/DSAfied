import express, { json } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import articleRoute from './routes/article.routes.js';
import problemRoutes from './routes/problem.routes.js';
import connectDB from './database/connect.js';
import jwtCheck from './middleware/jwtcheck.js';
import { Daily } from './models/daily.js';
import { Problem } from './models/problem.js';
import { User } from './models/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
}));

// Test Route
app.get("/", (req, res) => res.send("Hello World!"));

// Competitive Programming Profile Fetch Routes
app.post("/api/profile/lc/:username", async (req, res) => {
  try {
    const uname = req.params.username;
    const { query, variables } = req.body;
    variables.username = uname;
    variables.userSlug = uname;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) throw new Error(`LeetCode API Error: ${response.statusText}`);

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from LeetCode:", error.message);
    res.status(500).json({ error: "Failed to fetch data from LeetCode" });
  }
});

app.get("/api/profile/gfg/:username", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/Yo5jqcbFTIcCKClWRDMnD/user/${req.params.username}.json`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    if (!response.ok) throw new Error("GeeksForGeeks API Error");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from GeeksForGeeks:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GeeksForGeeks" });
  }
});

// Protected Routes
app.use("/api/users", userRoutes);
app.use(jwtCheck);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/article', articleRoute);
app.use('/api', problemRoutes);
app.use('/api/problem', problemRoutes);



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