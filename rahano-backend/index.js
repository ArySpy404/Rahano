const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const Onboarding = require('./src/models/Onboarding')

app.post("/api/onboarding", (req, res) => {
  console.log(req.body);

  Onboarding.create(req.body)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.status(500).json({
            err : err.message
        })
    })
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "rahano",
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
