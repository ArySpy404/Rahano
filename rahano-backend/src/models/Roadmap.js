const mongoose = require("mongoose");

const PhaseSchema = new mongoose.Schema({
  // phaseNumber: {
  //   type: Number,
  //   required: true,
  //   min: 1,
  //   max: 20,
  //   validate: {
  //     validator: Number.isInteger,
  //     message: "Phase number must be an integer.",
  //   },
  // },
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 600,
  },
  exercises: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return (
          Array.isArray(value) &&
          value.length >= 1 &&
          value.length <= 10 &&
          value.every(
            (exercise) =>
              typeof exercise === "string" &&
              exercise.trim().length > 0 &&
              exercise.length <= 500,
          )
        );
      },
      message: "Each phase must have between 1 and 10 non-empty exercises.",
    },
  },

  completionStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const RoadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  phases: {
    required: true,
    type: [PhaseSchema],
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0 && value.length <= 20;
      },
      message: "Each value should be an array and must have between 1 and 10 non-empty exercises."
    },
  },
});

module.exports = mongoose.model("Roadmap", RoadmapSchema);
