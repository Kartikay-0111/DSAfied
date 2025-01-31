import { User } from '../models/user.js';
import {v2 as cloudinary} from 'cloudinary';
import * as dotenv from 'dotenv';
import stream from 'stream';
import { initializeUserProblems } from './problems.controller.js';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const createUser = async (req, res) => {
  try{
    
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    const {sub} = req.auth.payload;

    // const avatar = req.auth.payload.picture;
    const {username, Name, platform, difficulty} = req.body;

    //upload to cloudinary (using streams method)
    const photoUpload = await new Promise((resolve, reject) => {  
      const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'auto' },
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

    if(existingUser){
        // await initializeUserProblems(existingUser.auth0Id);
        return res.status(409).json({ 
            message: "User already exists",
            user: existingUser,
        });
    }

    const newUser = new User({
        auth0Id: sub,
        username,
        Name,
        avatar: photoUrl,
        platforms: platform_json,
        difficulty_pref: difficulty,
        problems_solved: 0,
    })

    await newUser.save();
    await initializeUserProblems(newUser.auth0Id);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const checkUser = async (req, res) => {
  const {sub} = req.auth.payload;
  const user = await User.findOne({ auth0Id:sub });
  if(user){
    // await initializeUserProblems(user.auth0Id);
    return res.json({message: "User already exists", user});
  }
  return res.json({message: "User not found"});

}

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated user
      runValidators: true, // Ensure valid input
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUser = async(req, res) => {
  // console.log(req.body)
  try {
    const {id} = req.query;
    console.log(id);
    const user = await User.findOne({ auth0Id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).send(user)
    
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
export { createUser, checkUser,updateUser, getUser};
