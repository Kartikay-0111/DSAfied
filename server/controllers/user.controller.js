import { User } from "../models/user.js"; // Ensure correct model import

// Create a new user (only if it doesn't exist)
export const createUser = async (req, res) => {
  try {
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "Authentication payload not found" });
    }

    const { name, email, sub } = req.auth.payload;
    const avatar = req.auth.payload.picture;

    let existingUser = await User.findOne({ auth0Id: sub });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists", user: existingUser });
    }

    const newUser = new User({ auth0Id: sub, name, email, avatar });

    await newUser.save();
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
};

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