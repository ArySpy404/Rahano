const express = require("express");
const app = express();
const bcrypt = require("bcrypt")
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const Onboarding = require("./src/models/Onboarding");
const cors = require("cors");
app.use(cors());

const User = require("./src/models/User");

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

app.get("/api/hello", (req, res) => {
  res.json({
    message: "rahano",
  });
});
app.listen(3001, () => {
  console.log("backend is running");
});

app.post("/api/register", async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).json({
      repeatPassword: "bad request",
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      email: "email is repetitive",
    });
  }

  const hashedPassword = await bcrypt.hash(password , 10);


  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    name,
    email
  });
});

app.post("/api/login" , async (req , res) => {
  const {email , password } = req.body ;

  const user = await User.findOne({ email })

  if (!user) {
    return (
      res.status(401).json({
        email : "invalid credentials"
      })
    )
  }

  const isPasswordValid = await bcrypt.compare(password , user.password)

  if (!isPasswordValid) {
    return (
      res.status(401).json({
        password : "invalid credentials"
      })
    )
  } else {
    return (
      res.json({
        name : user.name,
        email : user.email
      })
    )
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
