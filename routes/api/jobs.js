const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback(null, new Date().toLocaleDateString() + '_' + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if ((file.mimetype = 'pdf')) {
    callback(null, true);
  } else {
    callback('Your file must be format in pdf !', false);
  }
};

const uploadFiles = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Job = require('../../models/Job');
const User = require('../../models/User');

// @route    GET api/jobs
// @desc     Get all job offers

router.get('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    var search = req.query.search
    let page = (Math.abs(req.query.page) || 1) - 1;
    let limit = 10; 


    if (search == undefined)
    {
      search = ""
    }

    console.log("search " + search)
    console.log("page ne " + page)

    var searchQuery = {}
    if (search.length > 0) {
      searchQuery = {$or : [{"name": new RegExp(search, "i")},{"description": new RegExp(search, "i")},{"website": new RegExp(search, "i")}]}
    }

    const jobsLength = await Job.find(searchQuery)
    const length = jobsLength.length
    const pageLength = length > 0 ? Math.ceil(length/limit) : 0

    const allJobs = await Job.find(searchQuery)
    .limit(limit).skip(limit * page);

    veri = {"jobs" : allJobs, "pageLength":pageLength, "currentPage" : page}



    res.json(veri);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/jobs/:id
// @desc     Get job offer by id

router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/jobs/:id
// @desc     Delete a job

router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    // Check user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await job.remove();
    res.json({ msg: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    POST api/jobs/create
// @desc     Create a joboffer (ONLY COMPANY!)

router.post(
  '/create',
  [auth, [check('description', 'Job Description is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newJob = new Job({
        user: req.user.id,
        name: user.name,
        website: req.body.website,
        description: req.body.description,
      });

      const job = await newJob.save();

      res.json(job);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/jobs/:id/update
// @desc     Update Job Offer

router.post('/:id/update', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { website, description } = req.body;

  // Build job object
  const jobFields = {};
  jobFields.user = req.user.id;
  if (website) jobFields.website = website;
  if (description) jobFields.description = description;

  try {
    var id = req.params.id;
    let job = await Job.findById(id);

    if (job) {
      // Update

      job = await Job.findByIdAndUpdate(id, { $set: jobFields }, { new: true });

      return res.json(job);
    }

    res.json('There is no job for this id');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/jobs/:id/view
// @desc     Put a view on job by id

router.put('/:id/view', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    //Check if the post has already been viewed
    if (
      job.views.filter((view) => view.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Job already viewed' });
    }
    job.views.unshift({ user: req.user.id });
    await job.save();
    res.json(job.views);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/jobs/:id/apply
// @desc     Create a apply

router.post(
  '/:id/apply',
  [auth, uploadFiles.single('cv')],
  async (req, res, next) => {
    try {
      let user = await User.findById(req.user.id).select('-password');
      let job = await Job.findById(req.params.id);

      const f = req.file;

      console.log('bu' + req.filename);

      const newApply = {
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        cv: req.file,
      };

      job.applies.unshift(newApply);

      await job.save();

      res.json(job.applies);

      /* http://localhost:3000/2020-6-20_dahboard.txt --->> You can use for see the file  */
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/jobs/:id/apply/:apply_id
// @desc     Delete apply

router.delete('/:id/apply/:apply_id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    for (var jobApply of job.applies) {
      var filename = jobApply.cv.filename;
      var applyID = jobApply.id;
    }
    console.log(filename);
    console.log(applyID);

    if (filename) {
      // First Delelte Existed File Before Update
      const DIR = 'uploads';
      var filePath = DIR + '/' + filename;
      if (filePath) {
        await fs.unlinkSync(filePath);
      }
    }

    // Make sure apply exists
    if (!applyID) {
      return res.status(404).json({ msg: 'Apply does not exist' });
    }

    // Get remove index
    const removeIndex = job.applies
      .map((apply) => apply.user.toString())
      .indexOf(applyID);
    job.applies.splice(removeIndex, 1);
    await job.save();
    res.json(job.applies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route    GET api/jobs/:id/applies/:apply_id
// @desc     Get specific apply by job id and apply_id

router.get('/:id/applies/:apply_id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Pull out apply
    const apply = job.applies.find((apply) => apply.id === req.params.apply_id);

    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Make sure apply exists
    if (!apply) {
      return res.status(404).json({ msg: 'Apply does not exist' });
    }

    res.json(apply);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
