const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Hashtag = require('../../models/hashtag');

router.get('/', auth, async (req, res) => {
  let limit = 8;
  let page = (Math.abs(req.query.page) || 1) - 1;

  var search = req.query.search;
  if (search == undefined) {
    search = '';
  }

  var searchQuery = {};
  if (search.length > 0) searchQuery = { hashtag: new RegExp(search, 'i') };

  const hashtagsLength = await Hashtag.find(searchQuery);
  const length = hashtagsLength.length;
  const pageLength = length > 0 ? Math.ceil(length / limit) : 0;

  const allHashtags = await Hashtag.find(searchQuery)
    .sort({ value: -1 })
    .limit(limit)
    .skip(limit * page);

  veri = { hashtags: allHashtags, pageLength: pageLength, currentPage: page };

  res.json(veri);
});

router.get('/:hashtag', auth, async (req, res) => {
  const hashtag = req.params.hashtag;

  let limit = 8;
  let page = (Math.abs(req.query.page) || 1) - 1;

  const allHashtags = await Hashtag.find({ hashtag: new RegExp(hashtag, 'i') })
    .sort({ value: -1 })
    .limit(limit)
    .skip(limit * page);

  res.send(allHashtags);
});

module.exports = router;
