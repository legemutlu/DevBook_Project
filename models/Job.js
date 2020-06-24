const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: Schema.Types.String,
    ref: 'users',
  },
  website: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  views: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  applies: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      avatar: {
        type: String,
      },
      name: {
        type: Schema.Types.String,
        ref: 'users',
      },
      cv: {
        type: Object,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Jobs = mongoose.model('jobs', JobSchema);
