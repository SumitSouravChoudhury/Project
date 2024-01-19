const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Home");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // const salt = 10;
    // const hash_password = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: userCreated,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userExists.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register, login };
