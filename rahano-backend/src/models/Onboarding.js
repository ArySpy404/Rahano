const mongoose = require("mongoose");


const onboardingSchema = new mongoose.Schema({
  goal: {
    type: String,
  },
  level: {
    type: String,
  },
  learningTime: {
    type: String,
  },
  learningModel: {
    type: String,
  },
  field: {
    type: String,
  },
});

module.exports = mongoose.model('Onboarding' , onboardingSchema)