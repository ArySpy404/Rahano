const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo").default;
app.use(express.json());
const Onboarding = require("./src/models/Onboarding");
const cors = require("cors");
const cloudflareUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/google/gemma-4-26b-a4b-it`;
const Roadmap = require("./src/models/Roadmap");

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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "session",
    }),
  }),
);

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

  req.session.regenerate((err) => {
    if (err) {
      return res.status(500).json({
        error: "session error",
      });
    }

    req.session.userId = user._id.toString();

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          error: "session error",
        });
      }
    });

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

app.post("/api/roadmap", async (req, res) => {
  let ParseAIanswer;
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    let onboardingData;
    try {
      onboardingData = await Onboarding.findOne({
        user: req.session.userId,
      });
      if (!onboardingData) {
        return res.status(404).json({
          error: "Data Not Found",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    try {
      const existingRoadmap = await Roadmap.findOne({
        user: req.session.userId,
      });

      if (existingRoadmap) {
        return res.status(409).json({
          error: "Roadmap already exists",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    const prompt = `
بر اساس اطلاعات زیر، یک نقشه راه یادگیری شخصی‌سازی‌شده بساز.

اطلاعات کاربر:
${JSON.stringify(onboardingData)}

قوانین خروجی:
1. خروجی باید فقط یک JSON معتبر باشد.
2. هیچ متن اضافه، توضیح، یا Markdown خارج از JSON ننویس.
3. خروجی باید یک آبجکت با کلید phases باشد.
4. phases باید آرایه‌ای از فازهای یادگیری باشد.
5. هر فاز باید شامل فیلدهای زیر باشد:
   - title: عنوان فاز به صورت رشته
   - description: توضیحات فاز به صورت رشته
   - exercises: آرایه‌ای از آبجکت‌های تمرین که هرکدام شامل title (رشته) و completed (مقدار بولی false) هستند.
   - completionStatus: مقدار بولی false
6. تعداد فازها و تمرین‌ها را متناسب با سطح، زمان و هدف کاربر تعیین کن.
7. فازها را به ترتیب منطقی از مباحث پایه تا مباحث پیشرفته تنظیم کن.
8. تمرین‌ها باید عملی، مشخص و متناسب با محتوای همان فاز باشند.
9. تمام متن‌های داخل JSON باید به زبان فارسی باشند، به‌جز اصطلاحات تخصصی که ترجمه آن‌ها مناسب نیست.

ساختار مورد انتظار:
{
  "phases": [
    {
      "title": "عنوان فاز",
      "description": "توضیحات فاز",
      "exercises":  [
  { "title": "تمرین اول", "completed": false },
  { "title": "تمرین دوم", "completed": false }
],
      "completionStatus": false
    }
  ]
}
`;

    try {
      const AIModel = await fetch(cloudflareUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gemma-4-26b-a4b-it",
          messages: [
            {
              role: "system",
              content: "تو دستیار ساخت یادگیری رهانو هستی.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });
      if (AIModel.status === 401 || AIModel.status === 403) {
        console.error("Cloudflare AI authentication failed:", AIModel.status);

        return res.status(502).json({
          error: "AI service unavailable",
        });
      } else if (AIModel.status === 429) {
        return res.status(429).json({
          error: "AI service is busy",
        });
      } else if (AIModel.ok) {
        const Answer = await AIModel.json();

        if (
          Answer.result &&
          Answer.result.choices &&
          Array.isArray(Answer.result.choices) &&
          Answer.result.choices.length &&
          Answer.result.choices[0].message &&
          typeof Answer.result.choices[0].message.content === "string"
        ) {
          const AIanswer = Answer.result.choices[0].message.content;

          try {
            ParseAIanswer = JSON.parse(AIanswer);
          } catch (err) {
            console.error(err);
            return res.status(502).json({
              error: "Invalid response from AI service",
            });
          }
        } else {
          return res.status(502).json({
            error: "Invalid response from AI service",
          });
        }
        if (
          !(
            typeof ParseAIanswer === "object" &&
            ParseAIanswer !== null &&
            !Array.isArray(ParseAIanswer) &&
            Array.isArray(ParseAIanswer.phases) &&
            Object.keys(ParseAIanswer).length === 1 &&
            Object.keys(ParseAIanswer).includes("phases") &&
            ParseAIanswer.phases.length > 0 &&
            ParseAIanswer.phases.length <= 20 &&
            ParseAIanswer.phases.every(
              (phase) =>
                phase !== null &&
                typeof phase === "object" &&
                !Array.isArray(phase) &&
                typeof phase.title === "string" &&
                phase.title.trim().length > 0 &&
                phase.title.length <= 100 &&
                typeof phase.description === "string" &&
                phase.description.trim().length > 0 &&
                phase.description.length <= 600 &&
                Array.isArray(phase.exercises) &&
                phase.exercises.every(
                  (exercise) =>
                    exercise !== null &&
                    typeof exercise === "object" &&
                    !Array.isArray(exercise) &&
                    typeof exercise.title === "string" &&
                    exercise.title.trim().length > 0 &&
                    exercise.title.length <= 500 &&
                    Object.keys(exercise).length === 2 &&
                    Object.keys(exercise).includes("title") &&
                    Object.keys(exercise).includes("completed"),
                ) &&
                phase.exercises.length > 0 &&
                phase.exercises.length <= 10 &&
                typeof phase.completionStatus === "boolean",
            )
          )
        ) {
          return res.status(502).json({
            error: "Invalid response from AI service",
          });
        }
      } else {
        console.error("AI service request failed:", AIModel.status);

        return res.status(502).json({
          error: "AI service unavailable",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(502).json({
        error: "Invalid response from AI service",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }

  try {
    if (!ParseAIanswer) {
      return res.status(502).json({
        error: "Invalid response from AI service",
      });
    }

    const saveRoadmap = await Roadmap.create({
      user: req.session.userId,

      phases: ParseAIanswer.phases,
    });
    return res.json({
      saveRoadmap,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/api/rahano-ai", async (req, res) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        error: "Request body must be a valid JSON object",
      });
    }
    const message = req.body?.message;

    if (typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({
        error: "message should be a String",
      });
    }

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/7ab089674e4908d053be24be1c25a6fd/ai/run/@cf/google/gemma-4-26b-a4b-it",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        },
        body: JSON.stringify({
          model: "gemma-4-26b-a4b-it",
          messages: [
            {
              role: "system",
              content:
                "You are the assistant for creating Rahano learning paths.Build a learning path based on the information provided by the user.Make the learning path realistic and adapt it to the user's current skill level and available learning time.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      if (
        data.result &&
        data.result.choices &&
        Array.isArray(data.result.choices) &&
        data.result.choices.length &&
        data.result.choices[0].message &&
        typeof data.result.choices[0].message.content === "string"
      ) {
        const AIResponse = data.result.choices[0].message.content;

        return res.json({
          answer: AIResponse,
        });
      } else {
        return res.status(502).json({
          error: "Invalid response from AI service",
        });
      }
    } else if (response.status === 401) {
      const errorData = await response.json().catch(() => null);

      console.error("status:", JSON.stringify(errorData, null, 2));
      return res.status(401).json({
        error: "Unauthorized",
      });
    } else if (response.status === 429) {
      return res.status(429).json({
        error: "Too many requests",
      });
    } else if (!response.ok) {
      const errorData = await response.json();
      console.log("status:", errorData);
      return res.status(response.status).json({
        error: "Response is Not Successfull",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      err: "Internal Server Error",
    });
  }
});

app.get("/api/roadmap", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    const findRoadmap = await Roadmap.findOne({
      user: req.session.userId,
    });
    if (!findRoadmap) {
      return res.status(404).json({
        error: "Not Found",
      });
    }
    return res.json({
      phases: findRoadmap.phases,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.patch("/api/roadmap/exercises/:exerciseId", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const { completed } = req.body ?? {};

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "Invalid completed value. Expected a boolean.",
      });
    }

    const { exerciseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
      return res.status(400).json({
        error: "Invalid exercise ID",
      });
    }

    const findRoadmap = await Roadmap.findOne({
      user: req.session.userId,
    });

    if (findRoadmap === null) {
      return res.status(404).json({
        error: "Roadmap Not Found",
      });
    }

    const targetPhase = findRoadmap.phases.find((phase) => {
      return phase.exercises.find(
        (exercise) => exercise._id.toString() === exerciseId,
      );
    });

    const targetExercise = targetPhase?.exercises.find(
      (exercise) => exercise._id.toString() === exerciseId,
    );

    if (!targetExercise) {
      return res.status(404).json({
        error: "Exercise Not Found",
      });
    }

    targetExercise.completed = completed;

    const isPhaseCompleted = targetPhase.exercises.every(
      (exercise) => exercise.completed === true,
    );

    targetPhase.completionStatus = isPhaseCompleted;

    await findRoadmap.save();

    return res.json({
      exerciseId: targetExercise._id,
      completed: targetExercise.completed,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.listen(3001, () => {
  console.log("backend is running");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
