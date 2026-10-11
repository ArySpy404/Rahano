const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const Onboarding = require("./src/models/Onboarding");
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
const User = require("./src/models/User");
const session = require("express-session");

app.post("/api/onboarding", (req, res) => {
  Onboarding.create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

app.get("/api/hello", (req, res) => {
  res.json({
    message: "rahano",
  });
});
app.post("/api/register", async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).json({
      repeatPassword: "bad request",
    });
  }
  let user;
  let hashedPassword;
  let newUser;

  try {
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        email: "email is repetitive",
      });
    }
    hashedPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    res.json({
      name,
      email,
    });
  } catch (err) {
    console.error(err)

    if(err.code === 11000) {
      return res.status(400).json({
        email: "email is repetive"
      })
    } else {
      return res.status(500).json({
        err: "Internal server error"
      })
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      email: "invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      password: "invalid credentials",
    });
  }
  req.session.userId = user._id.toString();

  req.session.save((err) => {
    if (err) {
      return res.status(500).json({
        error: "session error",
      });
    }

    return res.json({
      name: user.name,
      email: user.email,
    });
  });
});

app.listen(3001, () => {
  console.log("backend is running");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
