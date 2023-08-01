require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const Users = require("./model/usersModel");
const app = express();

//Cross Origin Resource Sharing (CORS) is an additional security check performed by modern browsers to prevent unauthorized requests between different domains.
app.use(cors());
// built-in middleware for json
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//connect to DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(port, () => {
      console.log(`Api is running on port ${port}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//===========routes===================================

//---authorize----------------------------------------------------
const authorize = (req, res, next) => {
  const token = req.body.token; //need to change to the header token

  try {
    // decode the JWT know what is email of the user check the date expire
    const decode = JWT.verify(token, process.env.JWT_KEY);
    // date checker
    if (decode.exp < Date.now()) {
      res.status(410).send({ error: true, message: "expired token" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json({
      error: true,
      message: "Invalid token.",
    });
  }
};

//---test
app.get("/auth", authorize, (req, res) => {
  res.json("Hello Node API.");
});
//---register----------------------------------------------------
app.post("/signup", async (req, res) => {
  console.log("signup >>>>");
  const { username, email, password, watchlist } = req.body;
  if (!username || !password)
    return res.json({
      error: true,
      message: "Username and password are required.",
    });

  // check for duplicate usernames in the db
  const duplicate = await Users.findOne({ username: username });
  if (duplicate)
    return res.json({ error: true, message: "Users already exist." }); //Conflict

  // if no duplicate username, and then add the user to the DB.
  try {
    //encrypt the password
    const hashedPwd = bcrypt.hashSync(password, 10);

    //create and store the new user
    const newUser = await Users.create({
      username: username,
      email: email,
      password: hashedPwd,
      watchlist: watchlist,
    });

    res.json({ error: false, message: `New user ${username} created.` });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

//---login----------------------------------------------------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({
      error: true,
      message: "Username and password are required.",
    });

  // check for  username in the db
  const foundUser = await Users.findOne({ username: username });
  if (!foundUser)
    return res.json({
      error: true,
      message: "User does not exit.",
    });

  const info = await Users.find({ username: username });
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const expires_in = 60 * 60 * 24; // 1day
    const exp = Date.now() + expires_in * 1000;
    const token = JWT.sign({ username, exp }, process.env.JWT_KEY);
    return res.json({
      error: false,
      username: username,
      email: info[0].email,
      watchlist: info[0].watchlist,
      token_type: "Bearer",
      token,
      expires_in,
    });
  } else {
    return res.json({ error: true, message: "Password doest not match." });
  }
});

//---logout---------------------------------------------------------
app.post("/logout", (req, res) => {
  res.send("Hello.");
});

//---update watch list
app.post("/update/watchlist", async (req, res) => {
  const { username, watchlist } = req.body;
  if (!username || !watchlist)
    return res.json({
      error: true,
      message: "Username and watch-list are required.",
    });

  const filter = { username: username };
  const update = { watchlist: watchlist };
  try {
    const userUpdate = await Users.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (userUpdate) {
      return res.json({
        error: false,
        message: "Watch list has updated successfully.",
      });
    } else {
      return res.json({
        error: true,
        message: "User doesn't exit.",
      });
    }
  } catch (error) {
    return res.json({
      error: false,
      message: error,
    });
  }
});

//---get watch list
app.get("/get/watchlist", async (req, res) => {
  const { username } = req.body;
  if (!username)
    return res.json({
      error: true,
      message: "Username is required.",
    });

  // check for  username in the db
  try {
    const user = await Users.find({ username: username });
    return res.json({
      error: false,
      watchlist: user[0].watchlist,
    });
  } catch (error) {
    return res.json({
      error: false,
      message: error,
    });
  }
});
