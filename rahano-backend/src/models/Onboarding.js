const mongoose = require("mongoose");


const onboardingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal: {
    type: String,
    enum: ['skill'],
    required : true
  },
  level: {
    type: String,
    enum: ['beginner' , 'some' , 'experienced'],
    required : true
  },
  learningTime: {
    type: String,
    enum: ['bit' , 'mid' , 'larg' , 'x-large'],
    required : true
  },
  learningModel: {
    type: String,
    enum: ['do' , 'stepBystep' , 'challenge' , 'mix'],
    required : true
  },
  field: {
    type: String,
    enum: ['tech' , 'art' , 'language' , 'self' , 'contect'],
    required : true
  },
  category: {
    type: String,
    enum: ['AI' , 'mobile-app' , 'web' , 'systems' , 'game-dev' , 'security' , 'hour-management' , 'social-ability' , 'speech' , 'analysis' , 'studying' , 'financial' , 'english' , 'german' , 'french' , 'turkish' , 'korean' , 'spanish' , 'arabic' , 'japanese' , 'russian' , 'video' , 'edit' , 'podcast' , 'wirting' , 'stream' , 'social-media' , 'ui-ux' , 'graphic' , 'digital-art' , 'animation' , '3D-design' , 'photography'],
    required : true
  }
});

module.exports = mongoose.model('Onboarding' , onboardingSchema)