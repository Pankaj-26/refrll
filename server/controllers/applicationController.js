



const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const path = require('path');
const { sendEmail, sendSMS } = require('../utils/notificationService');
const ReferralClaim =require('../models/ReferralClaim')
const mongoose =require('mongoose')
  const Company = require('../models/Company'); 



// Apply to a job


// exports.applyToJob = async (req, res) => {
//   try {
//     const seekerId = req.userId;
//     const { jobId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//     // Attempt to auto-detect referrerId from referralJob
//     let referrerId = req.body.referrerId;
//     let isReferral = false;
//     let originalJobId = jobId;
//     let targetJobId = jobId;

//     if (!referrerId) {
//       const referralClaim = await ReferralClaim.findOne({ referralJob: jobId, status: 'Active' })
//         .select('referrer job')
//         .lean();

//       if (referralClaim) {
//         referrerId = referralClaim.referrer;
//         originalJobId = referralClaim.job;
//         isReferral = true;
//       }
//     } else {
//       // In case it's passed manually
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('referralJob').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       targetJobId = claim.referralJob;
//       isReferral = true;
//       originalJobId = jobId;
//     }

//     // Prevent duplicate applications
//     const existing = await Application.findOne({ seeker: seekerId, originalJob: originalJobId });
//     if (existing) {
//       return res.status(400).json({ message: 'Already applied to this job.' });
//     }

//     // Fetch job and seeker
//     const [seeker, job] = await Promise.all([
//       User.findById(seekerId, 'roles resume'),
//       Job.findById(targetJobId)
//     ]);

//     if (!seeker?.roles?.seeker) {
//       return res.status(403).json({ message: 'Only seekers can apply to jobs.' });
//     }

//     if (!job) {
//       return res.status(404).json({ message: 'Job not found.' });
//     }

// console.log('Seeker:', seeker);

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // Create application
//     const application = await Application.create({
//       job: targetJobId,
//       originalJob: originalJobId,
//       seeker: seekerId,
//       resumeUrl,
//       appliedVia: isReferral ? 'referral' : 'company',
//       referrer: isReferral ? referrerId : null,
//       companyStatus: isReferral ? null : 'applied',
//       referrerStatus: isReferral ? 'applied' : null,
//       companyStatusUpdatedAt: isReferral ? null : new Date(),
//       referrerStatusUpdatedAt: isReferral ? new Date() : null,
//       updatedBy: {
//         kind: isReferral ? 'referrer' : 'company',
//         id: isReferral ? referrerId : job.postedBy
//       }
//     });

//     return res.status(201).json({
//       message: 'Application submitted successfully.',
//       applicationId: application._id
//     });

//   } catch (err) {
//     console.error('applyToJob error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

exports.applyToJob = async (req, res) => {
  try {
    const seekerId = req.userId;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required.' });
    }

    // Attempt to auto-detect referrerId from referralJob
    let referrerId = req.body.referrerId;
    let isReferral = false;
    let originalJobId = jobId;
    let targetJobId = jobId;

    if (!referrerId) {
      const referralClaim = await ReferralClaim.findOne({ referralJob: jobId, status: 'Active' })
        .select('referrer job')
        .lean();

      if (referralClaim) {
        referrerId = referralClaim.referrer;
        originalJobId = referralClaim.job;
        isReferral = true;
      }
    } else {
      // In case it's passed manually
      const claim = await ReferralClaim.findOne({
        job: jobId,
        referrer: referrerId,
        status: 'Active'
      }).select('referralJob').lean();

      if (!claim) {
        return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
      }

      targetJobId = claim.referralJob;
      isReferral = true;
      originalJobId = jobId;
    }

    // Prevent duplicate applications
    const existing = await Application.findOne({ seeker: seekerId, originalJob: originalJobId });
    if (existing) {
      return res.status(400).json({ message: 'Already applied to this job.' });
    }

    // Fetch job and seeker
    const [seeker, job] = await Promise.all([
      User.findById(seekerId, 'roles resume'),
      Job.findById(targetJobId)
    ]);

    if (!seeker?.roles?.seeker) {
      return res.status(403).json({ message: 'Only seekers can apply to jobs.' });
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // ✅ Check application slots if it's a referrer job with a limit
    if (job.postedByType === 'referrer' && job.applicationLimit) {
      if (job.currentApplications >= job.applicationLimit) {
        return res.status(400).json({ message: 'No more slots left for this job.' });
      }
    }

    const resumeUrl = seeker.resume?.url || seeker.resume;
    if (!resumeUrl) {
      return res.status(400).json({
        message: 'Resume not found. Upload in profile first.',
        requiresResumeUpload: true
      });
    }

    // ✅ Create application
    const application = await Application.create({
      job: targetJobId,
      originalJob: originalJobId,
      seeker: seekerId,
      resumeUrl,
      appliedVia: isReferral ? 'referral' : 'company',
      referrer: isReferral ? referrerId : null,
      companyStatus: isReferral ? null : 'applied',
      referrerStatus: isReferral ? 'applied' : null,
      companyStatusUpdatedAt: isReferral ? null : new Date(),
      referrerStatusUpdatedAt: isReferral ? new Date() : null,
      updatedBy: {
        kind: isReferral ? 'referrer' : 'company',
        id: isReferral ? referrerId : job.postedBy
      }
    });

    // ✅ Increment currentApplications for referrer jobs only
    if (job.postedByType === 'referrer' && job.applicationLimit) {
      job.currentApplications = (job.currentApplications || 0) + 1;
      await job.save();
    }

    return res.status(201).json({
      message: 'Application submitted successfully.',
      applicationId: application._id
    });

  } catch (err) {
    console.error('applyToJob error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};




exports.getSeekerApplications = async (req, res) => {
  try {
    const seekerId = req.userId;

    // Validate user is a seeker
    const user = await User.findById(seekerId, 'roles');
    if (!user?.roles?.seeker) {
      return res.status(403).json({ message: 'Only seekers can access applications' });
    }

    // Get applications with proper field selection
    const applications = await Application.find({ seeker: seekerId })
      .select('job referrerStatus companyStatus appliedVia resumeUrl createdAt updatedBy referrerStatusUpdatedAt companyStatusUpdatedAt')
      .sort('-createdAt')
      .populate({
        path: 'job',
       
        options: { lean: true }
      })
      .populate({
        path: 'updatedBy.id',
        select: 'name',
        options: { lean: true }
      })
      .lean();

 

    // Transform applications
    // const transformedApplications = applications.map(app => {
    //   const isReferral = app.appliedVia === 'referral';
      
    //   return {
    //     _id: app._id,
    //     applicationStatus: isReferral ? app.referrerStatus : app.companyStatus,
    //     statusUpdatedAt: isReferral ? app.referrerStatusUpdatedAt : app.companyStatusUpdatedAt,
    //     updatedBy: app.updatedBy,
    //     resumeUrl: app.resumeUrl,
    //     appliedVia: app.appliedVia,
    //     appliedViaReferral: isReferral,
    //     createdAt: app.createdAt,
    //     job: app.job ? {
    //       ...app.job,
    //       _id: app.job._id || app.job
    //     } : {
    //       _id: app.job,
    //       title: "Deleted Job",
    //       description: "This job is no longer available",
    //       status: "Deleted"
    //     }
    //   };
    // });


    const transformedApplications = applications.map(app => {
  const hasReferrerStatus = !!app.referrerStatus;

  return {
    _id: app._id,
    applicationStatus: hasReferrerStatus ? app.referrerStatus : app.companyStatus,
    statusUpdatedAt: hasReferrerStatus ? app.referrerStatusUpdatedAt : app.companyStatusUpdatedAt,
    updatedBy: app.updatedBy,
    statusSource: hasReferrerStatus ? 'referrer' : 'company',
    resumeUrl: app.resumeUrl,
    appliedVia: app.appliedVia,
    appliedViaReferral: app.appliedVia === 'referral',
    createdAt: app.createdAt,
    job: app.job ? {
      ...app.job,
      _id: app.job._id || app.job
    } : {
      _id: app.job,
      title: "Deleted Job",
      description: "This job is no longer available",
      status: "Deleted"
    }
  };
});

    // console.log(transformedApplications, 'applications found for seeker' );

    res.status(200).json(transformedApplications);
  } catch (err) {
    console.error('getSeekerApplications error:', err);
    res.status(500).json({ 
      message: 'Server error',
      error: err.message 
    });
  }
};

// Get applications received by the logged-in referrer


exports.getReferrerApplications = async (req, res) => {
  try {
    if (!req.user?.roles?.referrer) {
      return res.status(403).json({ message: 'Only referrers can access this.' });
    }

    const referrerId = req.userId;

    // Get jobs posted by referrer (including claimed copies)
    const jobs = await Job.find({
      $or: [
        { postedBy: referrerId, postedByType: 'referrer' }, // Referrer's own jobs
        { claimedBy: referrerId } // Jobs claimed by referrer
      ]
    }).lean();

    if (jobs.length === 0) {
      return res.json({ jobs: [] });
    }

    const jobIds = jobs.map(j => j._id);

    // Get applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('seeker', '-password')
      .populate('job')
      .lean();

    // Group by job
    const jobMap = new Map();
    jobs.forEach(job => {
      jobMap.set(job._id.toString(), {
        ...job,
        applicants: []
      });
    });

    applications.forEach(app => {
      const jobId = app.job._id.toString();
      if (jobMap.has(jobId)) {
        const job = jobMap.get(jobId);
        
        // For referral copies, show referrer status
        const displayStatus = job.isReferralCopy 
          ?  app.companyStatus : app.referrerStatus
     

        
        
        jobMap.get(jobId).applicants.push({
          _id: app._id,
          seeker: app.seeker,
          status: displayStatus,
          appliedVia: app.appliedVia,
          appliedAt: app.createdAt
        });
      }
    });
    
   

    res.status(200).json({ jobs: Array.from(jobMap.values()) });
  } catch (err) {
    console.error('getReferrerJobApplications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Update application status by referrer


exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { applicationId } = req.params;
    const userId = req.userId;

    // Validate input
    if (!applicationId || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get application with job details
    const application = await Application.findById(applicationId)
      .populate('job', 'postedBy postedByType isReferralCopy claimedBy')
      .select('appliedVia referrer job companyStatus referrerStatus originalJob');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Determine user type
    let userType = null;
    let user = await User.findById(userId).lean();
    
    if (user) {
      if (user.roles?.referrer) userType = 'referrer';
      else if (user.roles?.seeker) userType = 'seeker';
      else if (user.roles === 'company') userType = 'company'; // Handle company role in User model
    } else {
      user = await Company.findById(userId).lean();
      if (user) userType = 'company';
    }

    if (!userType) {
      return res.status(404).json({ message: 'User not found' });
    }

    // DEBUG: Log user and application info
    // console.log(`Status update request:
    //   User ID: ${userId}
    //   User Type: ${userType}
    //   Application ID: ${applicationId}
    //   Applied Via: ${application.appliedVia}
    //   Job Type: ${application.job?.postedByType}
    //   Is Referral Copy: ${application.job?.isReferralCopy}`);

    // Determine which status to update
    let statusField = null;
    let isValid = false;

    // Case 1: Referrer updating referral application
    if (userType === 'referrer' && (
        // For claimed jobs
        (application.appliedVia === 'referral' && application.referrer?.toString() === userId) ||
        // For jobs posted directly by referrer
        (application.job?.postedByType === 'referrer' && application.job?.postedBy?.toString() === userId)
    )) {
      statusField = 'referrerStatus';
      isValid = true;
    } 
    // Case 2: Company updating direct application
    else if (userType === 'company' && (
        // For direct applications to company job
        (application.appliedVia === 'company' && application.job?.postedBy?.toString() === userId) ||
        // For original job owner
        (application.job?.postedByType === 'company' && application.job?.postedBy?.toString() === userId)
    )) {
      statusField = 'companyStatus';
      isValid = true;
    }

    if (!isValid) {
      return res.status(403).json({ 
        message: 'Unauthorized to update this application',
        details: {
          userType,
          appliedVia: application.appliedVia,
          jobOwner: application.job?.postedBy?.toString(),
          userId
        }
      });
    }

    // Validate status transition
    const validTransitions = {
      applied: ['reviewed'],
      reviewed: ['accepted', 'rejected'],
      accepted: ['hired'],
      rejected: ['reviewed'] // Allow reconsideration
    };

    const currentStatus = application[statusField];
    // if (validTransitions[currentStatus] && !validTransitions[currentStatus].includes(status)) {
    //   return res.status(400).json({
    //     message: `Invalid status transition from ${currentStatus} to ${status}`
    //   });
    // }

    // Prepare update data
    const updateData = {
      [statusField]: status,
      [`${statusField}UpdatedAt`]: new Date(),
      'updatedBy.kind': userType,
      'updatedBy.id': userId
    };

    // Perform atomic update
    const result = await Application.updateOne(
      {
        _id: applicationId,
        [statusField]: currentStatus
      },
      { $set: updateData }
    );

    

    if (result.modifiedCount === 0) {
      return res.status(409).json({ 
        message: 'Application was modified concurrently. Please retry.' 
      });
    }


    res.status(200).json({
      message: 'Status updated successfully',
      newStatus: status,
      statusField
    });

    
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


//get individual job with applicants for company
exports.getApplicantsForJob = async (req, res) => {
console.log('Fetching applicants for job:');

  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);


    if (!job) return res.status(404).json({ message: 'Job not found' });

    const applications = await Application.find({ job: jobId })
      .populate('seeker', 'name email profile resume');

    console.log('Applications:', applications);
    res.status(200).json(applications);
  } catch (err) {
    console.error('getApplicantsForJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// Get all jobs posted by current user, along with applicants per job

exports.getJobsWithApplicants = async (req, res) => {
  try {
    const userId = req.userId;
    const userType = req.userType; 

    let jobQuery = {};

    if (userType==='referrer') {
      const claimedJobs = await ReferralClaim.find({
        referrer: userId,
        status: 'Active'
      }).select('job');

      const claimedJobIds = claimedJobs.map(c => c.job);

      jobQuery = {
        $or: [
          { postedBy: userId, postedByType: 'referrer' },
          { _id: { $in: claimedJobIds } }
        ]
      };
    } else if (userType === 'company') {
      jobQuery = {
        postedBy: userId,
        postedByType: 'company'
      };
    } else {
      return res.status(403).json({ message: 'Unauthorized user type' });
    }

    const jobs = await Job.find(jobQuery).lean();
    const jobIds = jobs.map(job => job._id);

    // 💡 Application filter
    const appFilter = {
      job: { $in: jobIds },
    };

    if (userType==='referrer') {
      appFilter.appliedVia = 'referral';
      appFilter.referrer = userId;
    } else if (userType === 'company') {
      appFilter.appliedVia = 'company';
    }

    const applications = await Application.find(appFilter)
      .populate('seeker', 'name email profile')
      .lean();

    const applicationsByJob = applications.reduce((acc, app) => {
      const jobId = app.job.toString();
      acc[jobId] = acc[jobId] || [];
      acc[jobId].push(app);
      return acc;
    }, {});

    const jobsWithApplicants = jobs.map(job => ({
      ...job,
      applicants: applicationsByJob[job._id.toString()] || []
    }));


//       console.log('🧾 JOB IDS', jobIds);
// console.log('🔍 Application Filter', appFilter);

    res.status(200).json(jobsWithApplicants);
  } catch (err) {
    console.error('getJobsWithApplicants error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// get individual job applicants  for company

exports.fetchJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Fetch the job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });


    // Fetch applications for the job
    const applications = await Application.find({ job: jobId })
      .populate('seeker', 'name email profile') // populate seeker details
      .sort({ createdAt: -1 });

    res.json({ job, applicants: applications });
  } catch (error) {
    console.error('Error fetching job with applications:', error);
    res.status(500).json({ message: 'Server error' });
  }



};




exports.fetchSeekerSingleJobDetail = async (req, res) => {
  try {
    const seekerId = req.userId;
    const jobId = req.params.jobId;

    // Validate jobId format
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }

    // Find application and populate referenced fields
    const application = await Application.findById(jobId).populate('job')     // populate the original job
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Optionally check if this application belongs to the logged-in seeker
    if (application.seeker.toString() !== seekerId.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to this application' });
    }

  

    return res.status(200).json({ application });
  } catch (error) {
    console.error('Error fetching job detail:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



exports.getCompanyApplications = async (req, res) => {
  try {
    const companyId = req.userId;

    // Get only original jobs (not referral copies)
    const jobs = await Job.find({
      postedBy: companyId,
      postedByType: 'company',
      isReferralCopy: false
    }).lean();

    const jobIds = jobs.map(j => j._id);
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('seeker', '-password')
      .populate('job')
      .lean();

    // Group applications by job
    const jobMap = new Map();
    jobs.forEach(job => {
      jobMap.set(job._id.toString(), {
        ...job,
        applicants: applications
          .filter(app => app.job._id.toString() === job._id.toString())
          .map(app => ({
            _id: app._id,
            seeker: app.seeker,
            status: app.companyStatus, // Always show company status
            appliedVia: app.appliedVia,
            appliedAt: app.createdAt
          }))
      });
    });

    res.status(200).json({ jobs: Array.from(jobMap.values()) });
  } catch (err) {
    console.error('getCompanyApplications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};