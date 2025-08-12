const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
