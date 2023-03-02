import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { token } from "morgan";

import User from "./../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      lastName,
      email,
      password,
      imgPath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      lastName,
      email,
      password: passwordHash,
      imgPath,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ error: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Password does not match" });

    const jwToken = jwt.sign({ id: user._id }, process.env.JWT);
    delete user.password;
    res.status(200).json({ token: jwToken, user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
