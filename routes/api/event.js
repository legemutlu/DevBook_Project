const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Event = require('../../models/Event');
const User = require('../../models/User');

// @route    POST api/events
// @desc     Create event
router.post(
  '/',
  [auth, [check('title', 'Event Title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newEvent = new Event({
        user: req.user.id,
        name: user.name,
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/events/id
// @desc     Update event by event id

router.post('/:id/update', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, location, startDate, endDate } = req.body;

  // Build event object
  const eventFields = {};
  eventFields.user = req.user.id;
  if (title) eventFields.title = title;
  if (description) eventFields.description = description;
  if (location) eventFields.location = location;
  if (startDate) eventFields.startDate = startDate;
  if (endDate) eventFields.endDate = endDate;

  try {
    var id = req.params.id;
    let event = await Event.findById(id);

    if (event) {
      // Update

      event = await Event.findByIdAndUpdate(
        id,
        { $set: eventFields },
        { new: true }
      );

      return res.json(event);
    }

    res.json('There is no event for this id');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/events/id
// @desc     Delete event by event id
router.delete('/:id', auth, async (req, res, next) => {
  var id = req.params.id;
  try {
    await Event.findByIdAndRemove({ _id: id });
    res.json({ msg: 'Event Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/events
// @desc     Get all events

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/event/id
// @desc     Get event by id

router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/events/:id/participant
// @desc     Put a participant on event by eventid

router.put('/:id/participant', [auth], async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    let event = await Event.findById(req.params.id);

    const newParticipant = {
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    event.participants.unshift(newParticipant);

    await event.save();

    res.json(event.participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/events/:id/participants
// @desc     Get a participants

router.get('/:id/participants', [auth], async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    if (!event.participants) {
      return res.status(404).json({ msg: 'Participants not found' });
    }
    res.json(event.participants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/event/:id/view
// @desc     Put a view on event by id

router.put('/:id/view', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    //Check if the post has already been viewed
    if (
      event.views.filter((view) => view.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Event already viewed' });
    }
    event.views.unshift({ user: req.user.id });
    await event.save();
    res.json(event.views);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/events/:id/participant
// @desc     Delete a participant on event by eventid and participantid

router.delete('/:id/participant/:participant_id', [auth], async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password');
    let event = await Event.findById(req.params.id);

    for (var eventParticipants of event.participants) {
      var participantId = eventParticipants.id;
    }

    // Get remove index
    const removeIndex = event.participants
      .map((participant) => participant.user.toString())
      .indexOf(participantId);
    event.participants.splice(removeIndex, 1);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
