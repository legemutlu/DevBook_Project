const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Hashtag = require('../../models/hashtag');
const CompanyProfile = require('../../models/CompanyProfile');

// @route    POST api/posts
// @desc     Create a post
router.post(
  '/',
  [auth, check('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      var hashtagChannel = '';

      var postContent = req.body.text;

      if (req.body.hashtag) {
        hashtagChannel = req.body.hashtag;
        postContent = postContent + ' #' + hashtagChannel;
      }

      console.log('on channel ' + postContent);

      const newPost = new Post({
        text: postContent,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const hashtags = extract(postContent, { unique: true, type: '#' });

      for (const i in hashtags) {
        const hashtag = hashtags[i];

        if (hashtag.length > 24) continue;

        const findHashtag = await Hashtag.findOne({ hashtag: hashtag });

        if (findHashtag) {
          await findHashtag.update({ $inc: { value: 1 } });
          await findHashtag.save();
          continue;
        }

        const createHashtag = new Hashtag({ hashtag });
        createHashtag.save();
      }

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts
// @desc     Get posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    var search = req.query.search;

    if (search == undefined) {
      search = '';
    }

    var sortMethod = { date: -1 };
    var sort = req.query.sort;

    let page = (Math.abs(req.query.page) || 1) - 1;
    let limit = 5;

    if (sort == 0) {
      // newest to old
      sortMethod = { date: -1 };
    } else if (sort == 1) {
      sortMethod = { date: 1 };
    } else if (sort == 2) {
      // newest to old
      sortMethod = { read: -1 };
    } else if (sort == 3) {
      sortMethod = { read: 1 };
    }


    const foundPosts = await Post.aggregate([
      { $match: { $and: [{ text: { $regex: search, $options: 'i' } }] } },
      { $sort: sortMethod },
      { $skip: limit * page },
      { $limit: limit },
    ]);

    const posts = [];

    for (var post of foundPosts) {
      post.read = (post.read === undefined) ? 0 : post.read
      posts.push(post);
    }

    const postLengthsQuery = await Post.aggregate([
      { $match: { $and: [{ text: { $regex: search, $options: 'i' } }] } },
    ]);

    var length = 0;

    for (const p of postLengthsQuery) {
      length += 1;
    }

    const pageLength = length > 0 ? Math.ceil(length / limit) : 0;

    veri = {
      posts: posts,
      postLength: pageLength,
      currentPage: page,
      sortMethod: sort,
    };

    res.json(veri);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts:hashtag
// @desc     Get posts with hashtag
// @access   Private
router.get('/hashtag/:hashtag', auth, async (req, res) => {
  try {
    const hashtag = req.params.hashtag;

    var search = req.query.search;

    if (search == undefined) {
      search = '';
    }

    var sortMethod = { date: -1 };
    var sort = req.query.sort;

    let page = (Math.abs(req.query.page) || 1) - 1;
    let limit = 5;

    if (sort == 0) {
      // newest to old
      sortMethod = { date: -1 };
    } else if (sort == 1) {
      sortMethod = { date: 1 };
    }
    else if (sort == 2) {
      // newest to old
      sortMethod = { read: -1 };
    } else if (sort == 3) {
      sortMethod = { read: 1 };
    }

    const foundPosts = await Post.aggregate([
      {
        $match: {
          $and: [
            { text: { $regex: '#' + hashtag, $options: 'i' } },
            { text: { $regex: search, $options: 'i' } },
          ],
        },
      },
      { $sort: sortMethod },
      { $skip: limit * page },
      { $limit: limit },
    ]);

    const posts = [];

    for (var post of foundPosts) {
      post.read = (post.read === undefined) ? 0 : post.read
      posts.push(post);
    }

    const postLengthsQuery = await Post.aggregate([
      {
        $match: {
          $and: [
            { text: { $regex: '#' + hashtag, $options: 'i' } },
            { text: { $regex: search, $options: 'i' } },
          ],
        },
      },
    ]);

    var length = 0;

    for (const p of postLengthsQuery) {
      length += 1;
    }

    const pageLength = length > 0 ? Math.ceil(length / limit) : 0;

    veri = {
      posts: posts,
      postLength: pageLength,
      currentPage: page,
      sortMethod: sort,
    };

    res.json(veri);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/:id
// @desc     Get post by id

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    post.read = ((post.read === undefined) ? 0 : post.read)+1
    
    post.save()

    res.json(post);
  } catch (err) {
    console.error("err" + err) 

    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:id
// @desc     Like a post

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/posts/comment/:id
// @desc     Create a comment

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     DELETE a comment

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
