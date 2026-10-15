const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
const Onboarding = require("./src/models/Onboarding");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
const User = require("./src/models/User");
const session = require("express-session");
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

app.post("/api/rahano-ai", async (req, res) => {
  const body = req.body;
  const message = body.message;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    },
  );
  const data= await response.json()
});

app.post("/api/onboarding", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  Onboarding.findOneAndUpdate(
    { user: req.session.userId },
    { ...req.body, user: req.session.userId },
    { returnDocument: "after", upsert: true, runValidators: true },
  )

    .then((result) => {
      console.log("Update onboarding", result);
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
});

app.get("/api/onboarding", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  Onboarding.findOne({ user: req.session.userId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: "Onboarding Not Found",
        });
      }
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: "Internal server error",
      });
    });
});

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
    console.error(err);

    if (err.code === 11000) {
      return res.status(400).json({
        email: "email is repetive",
      });
    } else {
      return res.status(500).json({
        err: "Internal server error",
      });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  let user;
  let isPasswordValid;

  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        email: "invalid credentials",
      });
    }

    isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        password: "invalid credentials",
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal sever error",
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

app.get("/api/me", async (req, res) => {
  try {
    if (req.session.userId) {
      const findUserId = await User.findById(req.session.userId);

      if (findUserId) {
        return res.json({
          name: findUserId.name,
          email: findUserId.email,
        });
      } else {
        return res.status(401).json({
          error: "User Not Found",
        });
      }
    } else {
      return res.status(401).json({
        error: "User Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        error: "Internal server error",
      });
    } else {
      res.clearCookie("connect.sid");
      return res.json({
        logout: "successful logout",
      });
    }
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
