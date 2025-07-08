const express = require('express');
const router = express.Router();

const { createJob, updateJob, searchJobs,getJobs, claimJobForReferral, updateJobStatus,getJobDetailsForEdit  } = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/getJobs',authMiddleware, getJobs);


router.post('/', authMiddleware, createJob);

router.get('/', searchJobs);


router.post('/:jobId/claim', authMiddleware, claimJobForReferral);


router.get('/jobforedit/:jobId', authMiddleware, getJobDetailsForEdit);

router.patch('/:jobId/edit', authMiddleware, updateJob);
router.patch('/:jobId/status', authMiddleware, updateJobStatus);

module.exports = router;
