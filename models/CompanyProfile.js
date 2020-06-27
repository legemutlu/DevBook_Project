const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  avatar: {},
  social: {
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CompanyProfile = mongoose.model(
  'companyprofile',
  CompanyProfileSchema
);
