const USER = require("../models/user");
const generateToken = require("../helpers/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = generateToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    //save user
    const newUser = await USER.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      verificationToken,
      verificationTokenExpires,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Email, password and role are required",
    });
  }
  try {
    const user = await USER.findOne({ email, role });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesnt exist, please register",
      });
    }

    if (user.role !== role) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    //validity period
    const token = jwt.sign(
      { email: user.email, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await USER.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  
};
