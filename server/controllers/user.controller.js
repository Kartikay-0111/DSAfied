import { User } from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import stream from "stream";
import {
  getDifficultyDetails,
  initializeUserProblems,
} from "./problems.controller.js";
import { calculateDailyScores } from "./calcProbScores.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createUser = async (req, res) => {
  try {
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const { sub } = req.auth.payload;

    // const avatar = req.auth.payload.picture;
    const { username, Name, email, platform, difficulty } = req.body;

    //upload to cloudinary (using streams method)
    const photoUpload = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise on error
          } else {
            resolve(result); // Resolve the promise with the upload result
          }
        }
      );
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer); // Pass the buffer into the stream
      bufferStream.pipe(uploadStream); // Pipe the file stream to Cloudinary
    });

    // Get the URL of the uploaded image
    const photoUrl = photoUpload.secure_url;
    // console.log(photoUrl);

    const platform_json = JSON.parse(platform);
    console.log(platform_json);

    let existingUser = await User.findOne({ auth0Id: sub });

    if (existingUser) {
      // await initializeUserProblems(existingUser.auth0Id);
      // await calculateDailyScores(sub);
      return res.status(409).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    const newUser = new User({
      auth0Id: sub,
      username,
      Name,
      email,
      avatar: photoUrl,
      platforms: platform_json,
      difficulty_pref: difficulty,
      problems_solved: 0,
    });

    await newUser.save();
    console.log("New user created inside User coll")
    await initializeUserProblems(newUser.auth0Id);
    console.log("Userprob coll populated -> ", newUser.auth0Id)
    const difficultyDetails = await getDifficultyDetails(newUser.auth0Id);
    await calculateDailyScores(sub);
    // console.log(difficultyDetails);
    // await getDifficultyDetails(newUser.auth0Id);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const checkUser = async (req, res) => {
  const { sub } = req.auth.payload;
  const user = await User.findOne({ auth0Id: sub });
  if (user) {
    // await initializeUserProblems(user.auth0Id);
    // await getDifficultyDetails(sub);
    console.log("sub -> ", sub);
    await calculateDailyScores(sub);
    return res.json({ message: "User already exists", user });
  }
  return res.json({ message: "User not found" });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ auth0Id: id });
  res.json(user);
};
export { createUser, checkUser, getUserById };
