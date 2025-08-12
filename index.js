const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Blog Master Api" });
});
app.use("/api/auth", userRouter);
app.use("/api/blog", blogRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "blogmaster" });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

connectDB();
