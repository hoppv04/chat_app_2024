import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password and confirm password don't match",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashesPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashesPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup function", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: "Invalid user",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Password is incorrect",
      });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login function", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    return res.cookie("jwt", "", { maxAge: 0 }).status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout function", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
