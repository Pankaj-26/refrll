const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const {
  applyToJob,
  getSeekerApplications,
  getReferrerApplications,
  updateApplicationStatus,
  getApplicantsForJob,
  getJobsWithApplicants,
  fetchJobApplicants,
  fetchSeekerSingleJobDetail
} = require('../controllers/applicationController');






router.post('/apply', authMiddleware,  upload.single('resume'), applyToJob);

router.get('/seeker', authMiddleware, getSeekerApplications);

router.get('/referrer', authMiddleware, getReferrerApplications);


router.patch('/:applicationId/status', authMiddleware, updateApplicationStatus);

router.get('/job/:jobId/applicants', authMiddleware, getApplicantsForJob);

router.get('/applicants', authMiddleware, getJobsWithApplicants);

router.get('/:jobId/applicants', authMiddleware, fetchJobApplicants);

router.get('/:jobId/seeker', authMiddleware,   fetchSeekerSingleJobDetail
);

module.exports = router;
