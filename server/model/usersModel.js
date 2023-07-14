const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    watchlist: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
