import { User } from '../models/user.js';

const createUser = async (req, res) => {
  try{
    // const { auth0Id, name, email, avatar, dsaLevel } = req.body;
    if (!req.auth || !req.auth.payload) {
      return res.status(400).json({ message: "Authentication payload not found" });
    }
    console.log(req.auth.payload);
    const {name, email, sub} = req.auth.payload;
    const avatar = req.auth.payload.picture;

    let existingUser = await User.findOne({ auth0Id: sub });

    if(existingUser){
        res.status(409).json({ 
            message: "User already exists",
        });
    }

    const newUser = new User({
        auth0Id: sub,
        name,
        email,
        avatar,
    })

    await newUser.save();
    res.status(201).json(newUser);
  }
  catch(e){
    res.status(500).json({message: e.message})
  }
}

export { createUser };