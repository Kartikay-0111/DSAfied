import express, { json } from "express";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import router from "./routes/user.routes.js";
import connectDB from "./database/connect.js";
import jwtCheck from "./middleware/jwtcheck.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow credentials
    allowedHeaders: ["Authorization", "Content-Type"], // Allow Authorization header
  })
);
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/profile/lc/:username", async (req, res) => {
  try {
    const uname = req.params["username"];
    const { query, variables } = req.body;
    variables.username = uname;
    variables.userSlug = uname;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode API Error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data); // Pass the LeetCode API response to the frontend
  } catch (error) {
    console.error("Error fetching data from LeetCode:", error.message);
    res.status(500).json({ error: "Failed to fetch data from LeetCode" });
  }
});

app.get("/api/profile/gfg/:username", async (req, res) => {
  const gfg_username = req.params["username"];
  try {
    const response = await fetch(
      `https://www.geeksforgeeks.org/gfg-assets/_next/data/Yo5jqcbFTIcCKClWRDMnD/user/${gfg_username}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from GeeksForGeeks:", error.message);
    res.status(500).json({ error: "Failed to fetch data from GeeksForGeeks" });
  }
});

app.use(jwtCheck);
app.use("/api/users", router);

// Start Server
try {
  connectDB(process.env.MONGO_URI);
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (e) {
  console.log("Server failed to start", e.message);
}
