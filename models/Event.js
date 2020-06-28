const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: Schema.Types.String,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  views: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  participants: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      name: {
        type: Schema.Types.String,
        ref: 'users',
      },
      avatar: {
        type: Schema.Types.String,
        ref: 'users',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Event = mongoose.model('events', EventSchema);
