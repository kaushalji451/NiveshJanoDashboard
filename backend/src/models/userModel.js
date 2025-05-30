const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["candidate", "admin"],
    default: "candidate",
  } 
});

const UserModel = mongoose.model("User", userSchema);

module.exports = {
  UserModel
};
