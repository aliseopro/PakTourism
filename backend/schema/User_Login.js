const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //add fields if required for registration and login 
});

const User_Login = mongoose.model("User", UserSchema);

module.exports = User_Login;