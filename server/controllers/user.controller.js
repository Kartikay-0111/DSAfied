import { User } from "../models/user.js";

const createUser = async (req, res) => {
  try {
    // const { auth0Id, name, email, avatar, dsaLevel } = req.body;
    if (!req.auth || !req.auth.payload) {
      return res
        .status(400)
        .json({ message: "Authentication payload not found" });
    }
    console.log(req.auth.payload);
    const { name, email, sub } = req.auth.payload;
    const avatar = req.auth.payload.picture;

    let existingUser = await User.findOne({ auth0Id: sub });

    if (existingUser) {
      res.status(409).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      auth0Id: sub,
      name,
      email,
      avatar,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const edit_profile = async (req, res) => {
  try {
    const {id} = req.params;
    const profile = await User.findByIdAndUpdate(id, req.body);

    if(!profile) {
      return res.status(404).json({message: "User not found"})
    }
    const updatedProfile = await User.findById(id)
    res.status(200).json(updatedProfile)
  } catch (e) {
    req.status(500).json({message: e.message})
  }

  // try {
  //   const allUsers = await User.find({});
  //   console.log(allUsers);
  //   res.status(200).json(allUsers);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};

export { createUser, edit_profile };
