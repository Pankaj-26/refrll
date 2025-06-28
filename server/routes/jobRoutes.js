const express = require('express');
const router = express.Router();

const { createJob, updateJob, searchJobs,getJobs, claimJobForReferral } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getJobs',authMiddleware, getJobs);

// POST /api/jobs - Create a new job (referrer only)
router.post('/', authMiddleware, createJob);

// PATCH /api/jobs/:id - Update a job (referrer only)
router.patch('/:id', authMiddleware, updateJob);


// GET /api/jobs - Search & list jobs (public)
router.get('/', searchJobs);


router.post('/:jobId/claim', authMiddleware, claimJobForReferral);




module.exports = router;
