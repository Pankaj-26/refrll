



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
//     const { jobId, referrerId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//     const [seeker, job, existingApplication] = await Promise.all([
//       User.findById(seekerId, 'roles resume'),
//       Job.findById(jobId),
//       Application.findOne({ job: jobId, seeker: seekerId })
//     ]);

//     if (!seeker?.roles?.seeker) {
//       return res.status(403).json({ message: 'Only seekers can apply to jobs.' });
//     }

//     if (!job) {
//       return res.status(404).json({ message: 'Job not found.' });
//     }

//     if (existingApplication) {
//       return res.status(400).json({ message: 'Already applied to this job.' });
//     }

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // ✅ Determine application mode
//     const isReferral = !!referrerId;

//     if (isReferral) {
//       // Ensure claim exists
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       });

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }
//     }

//     const applicationData = {
//       job: jobId,
//       seeker: seekerId,
//       resumeUrl,
//       appliedVia: isReferral ? 'referral' : 'company',
//       referrer: isReferral ? referrerId : undefined
//     };

//     // ✅ Optional: Prevent accidental referrerId in company apply
//     if (!isReferral && referrerId) {
//       return res.status(400).json({ message: 'Company applications must not include a referrer.' });
//     }

//     const application = await Application.create(applicationData);

//     return res.status(201).json({
//       message: 'Application submitted successfully.',
//       applicationId: application._id
//     });

//   } catch (err) {
//     console.error('applyToJob error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };working

// exports.applyToJob = async (req, res) => {
//   try {
//     const seekerId = req.userId;
//     const { jobId, referrerId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//     const [seeker, job, existingApplication] = await Promise.all([
//       User.findById(seekerId, 'roles resume'),
//       Job.findById(jobId),
//       Application.findOne({ job: jobId, seeker: seekerId })
//     ]);

//     if (!seeker?.roles?.seeker) {
//       return res.status(403).json({ message: 'Only seekers can apply to jobs.' });
//     }

//     if (!job) {
//       return res.status(404).json({ message: 'Job not found.' });
//     }

//     if (existingApplication) {
//       return res.status(400).json({ message: 'Already applied to this job.' });
//     }

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // Validate application type
//     const isReferral = !!referrerId;
//     let appliedVia = 'company';
//     let referrer = null;

//     if (isReferral) {
//       // Ensure claim exists and is active
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('_id').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       appliedVia = 'referral';
//       referrer = referrerId;
//     } else {
//       // Ensure no referrer ID is provided for direct applications
//       if (referrerId) {
//         return res.status(400).json({ 
//           message: 'Referrer ID should not be provided for direct applications.' 
//         });
//       }
//     }

//     // Create application with proper type
//     const application = await Application.create({
//       job: jobId,
//       seeker: seekerId,
//       resumeUrl,
//       appliedVia,
//       referrer
//     });

//     return res.status(201).json({
//       message: 'Application submitted successfully.',
//       applicationId: application._id,
//       applicationType: appliedVia
//     });

//   } catch (err) {
//     console.error('applyToJob error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// above one is correct

// exports.applyToJob = async (req, res) => {
//   try {
//     const seekerId = req.userId;
//     const { jobId, referrerId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//       // Determine actual job ID to apply to
//     let targetJobId = jobId;
//     let isReferral = false;

//     if (referrerId) {
//       // Find active claim for this job+referrer
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('referralJob').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       targetJobId = claim.referralJob; // Apply to the referral copy
//       isReferral = true;
//     }

//      // Now use targetJobId for all subsequent operations
//     const [seeker, job, existingApplication] = await Promise.all([
//       User.findById(seekerId, 'roles resume'),
//       Job.findById(targetJobId),
//       Application.findOne({ job: targetJobId, seeker: seekerId })
//     ]);

//     if (!seeker?.roles?.seeker) {
//       return res.status(403).json({ message: 'Only seekers can apply to jobs.' });
//     }

//     if (!job) {
//       return res.status(404).json({ message: 'Job not found.' });
//     }

//     if (existingApplication) {
//       return res.status(400).json({ message: 'Already applied to this job.' });
//     }

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // Validate application type
   
//     let appliedVia = 'company';
//     let referrer = null;

//     if (isReferral) {
//       // Ensure claim exists and is active
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('_id').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       appliedVia = 'referral';
//       referrer = referrerId;
//     } else {
//       // Ensure no referrer ID is provided for direct applications
//       if (referrerId) {
//         return res.status(400).json({ 
//           message: 'Referrer ID should not be provided for direct applications.' 
//         });
//       }
//     }

//    // Inside applyToJob controller

// // Set status based on application type
//  const application = await Application.create({
//       job: targetJobId,
//       seeker: seekerId,
//       resumeUrl: seeker.resume?.url || seeker.resume,
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


// the above one is working and the below one is to track if he alerady applied to a job claimed by other referrer

// exports.applyToJob = async (req, res) => {
//   try {
//     const seekerId = req.userId;
//     const { jobId, referrerId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//       // Determine actual job ID to apply to
//     let targetJobId = jobId;
//     let isReferral = false;
//  let originalJobId = jobId; 

//     if (referrerId) {
//       // Find active claim for this job+referrer
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('referralJob').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       targetJobId = claim.referralJob; // Apply to the referral copy
//       isReferral = true;
//       originalJobId = jobId;
//     }

//      // Check if seeker has already applied to any version of this job
//     const existingApplication = await Application.findOne({
//       originalJob: originalJobId,
//       seeker: seekerId
//     });

//     if (existingApplication) {
//       return res.status(400).json({ 
//         message: 'You have already applied to this job position',
//         existingApplicationId: existingApplication._id
//       });
//     }

//      // Now use targetJobId for all subsequent operations
//       // Get job and seeker details
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

//     if (existingApplication) {
//       return res.status(400).json({ message: 'Already applied to this job.' });
//     }

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // Validate application type
   
//     let appliedVia = 'company';
//     let referrer = null;

//     if (isReferral) {
//       // Ensure claim exists and is active
//       const claim = await ReferralClaim.findOne({
//         job: jobId,
//         referrer: referrerId,
//         status: 'Active'
//       }).select('_id').lean();

//       if (!claim) {
//         return res.status(400).json({ message: 'Invalid or inactive referral claim.' });
//       }

//       appliedVia = 'referral';
//       referrer = referrerId;
//     } else {
//       // Ensure no referrer ID is provided for direct applications
//       if (referrerId) {
//         return res.status(400).json({ 
//           message: 'Referrer ID should not be provided for direct applications.' 
//         });
//       }
//     }

//    // Inside applyToJob controller

// // Set status based on application type
//    // Create application
//     const application = await Application.create({
//       job: targetJobId,
//       originalJob: originalJobId, // Store original job reference
//       seeker: seekerId,
//       resumeUrl: seeker.resume?.url || seeker.resume,
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








// exports.applyToJob = async (req, res) => {
//   try {
//     const seekerId = req.userId;
//     const { jobId, referrerId } = req.body;

//     console.log(referrerId)

//     if (!jobId) {
//       return res.status(400).json({ message: 'Job ID is required.' });
//     }

//     // Determine actual job ID to apply to
//     let targetJobId = jobId;
//     let isReferral = false;
//     let originalJobId = jobId; // Default to original job ID

//     if (referrerId) {
//       // Find active claim for this job+referrer
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
//       originalJobId = jobId; // Original job ID is the claimed job ID
//     }

//     // Check if seeker has already applied to any version of this job
//     const existingApplication = await Application.findOne({
//       originalJob: originalJobId,
//       seeker: seekerId
//     });

//     if (existingApplication) {
//       return res.status(400).json({ 
//         message: 'You have already applied to this job position',
//         existingApplicationId: existingApplication._id
//       });
//     }

//     // Get job and seeker details
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

//     const resumeUrl = seeker.resume?.url || seeker.resume;
//     if (!resumeUrl) {
//       return res.status(400).json({
//         message: 'Resume not found. Upload in profile first.',
//         requiresResumeUpload: true
//       });
//     }

//     // DEBUG: Log application type detection
//     console.log(`Creating application: 
//       Target Job: ${targetJobId}
//       Original Job: ${originalJobId}
//       Is Referral: ${isReferral}
//       Job Type: ${job.postedByType}
//       Is Referral Copy: ${job.isReferralCopy}`);

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

//     // DEBUG: Log created application
//     console.log(`Created application: 
//       ID: ${application._id}
//       Applied Via: ${application.appliedVia}
//       Referrer: ${application.referrer || 'None'}`);

//     return res.status(201).json({
//       message: 'Application submitted successfully.',
//       applicationId: application._id
//     });

//   } catch (err) {
//     console.error('applyToJob error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };



// Get applications of the logged-in seeker in seeker dashboard


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

    const resumeUrl = seeker.resume?.url || seeker.resume;
    if (!resumeUrl) {
      return res.status(400).json({
        message: 'Resume not found. Upload in profile first.',
        requiresResumeUpload: true
      });
    }

    // Create application
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

// exports.getReferrerApplications = async (req, res) => {

//   try {
//     if (!req.user?.roles?.referrer) {
//       return res.status(403).json({ message: 'Only referrers can access this.' });
//     }

//     const referrerId = req.userId;

//     // Get claimed and posted jobs
//     const [claimedJobs, postedJobs] = await Promise.all([
//       ReferralClaim.find({ referrer: referrerId, status: 'Active' }).select('job').lean(),
//       Job.find({ postedBy: referrerId, postedByType: 'referrer' }).select('_id').lean()
//     ]);

//     // Extract job IDs
//     const claimedJobIds = claimedJobs.map(c => c.job);
//     const postedJobIds = postedJobs.map(j => j._id);
//     const allJobIds = [...claimedJobIds, ...postedJobIds];

//     if (allJobIds.length === 0) {
//       return res.json({ jobs: [] });
//     }

//     // Get job details
//     const jobs = await Job.find({ _id: { $in: allJobIds } })
//       // .select('title company location postedByType')
//       .lean();

//     // Get applications with BOTH status fields
//     const applications = await Application.find({
//       $or: [
//         { job: { $in: claimedJobIds }, referrer: referrerId },
//         { job: { $in: postedJobIds } }
//       ]
//     })
//     .populate('seeker', '-password')
    
//     .lean();

//     // Create job-applicant mapping
//     const jobMap = new Map();
//     jobs.forEach(job => {
//       jobMap.set(job._id.toString(), {
//         ...job,
//         applicants: []
//       });
//     });

//     // Group applications by job and determine display status
//     applications.forEach(app => {
//       const jobId = app.job.toString();
//       if (jobMap.has(jobId)) {
//         const job = jobMap.get(jobId);
        
//         // Determine which status to show based on job type
//         const displayStatus = job.postedByType === 'referrer' 
//           ? app.companyStatus   // For jobs posted by referrer
//           : app.referrerStatus; // For claimed jobs

//         jobMap.get(jobId).applicants.push({
//           _id: app._id,
//           seeker: app.seeker,
//           status: displayStatus, // The correct status to display
//           appliedVia: app.appliedVia,
//           appliedAt: app.createdAt,
//           // Include both for debugging if needed:
//           companyStatus: app.companyStatus,
//           referrerStatus: app.referrerStatus
//         });
//       }
//     });

//     const result = Array.from(jobMap.values());
//     res.status(200).json({ jobs: result });
//   } catch (err) {
//     console.error('getReferrerJobApplications error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }

// //  try {
// //     const seekerId = req.userId;
// //     // const { resumeUrl } = req.body;
// //     const jobId = req.params.jobId; // This is the cloned job ID
// //   console.log( jobId)

// //     // Validate input
// //     // if (!resumeUrl) {
// //     //   return res.status(400).json({ message: 'Resume is required' });
// //     // }

// //     // Fetch the cloned job (must be posted by referrer)
// //     const job = await Job.findOne({ 
// //       _id: jobId,
// //       postedByType: 'referrer'
// //     });

// //     if (!job) {
// //       return res.status(404).json({ message: 'Referral job not found or not valid' });
// //     }

// //     // Check if already applied
// //     const existing = await Application.findOne({ seeker: seekerId, job: jobId });
// //     if (existing) {
// //       return res.status(409).json({ message: 'Already applied to this job' });
// //     }

// //     // Create application
// //     const application = new Application({
// //       job: job._id,
// //       seeker: seekerId,
// //       // resumeUrl,
// //       appliedVia: 'referral',
// //       referrer: job.postedBy,
// //       referrerStatus: 'applied',
// //       referrerStatusUpdatedAt: new Date(),
// //       updatedBy: {
// //         kind: 'referrer',
// //         id: job.postedBy
// //       }
// //     });

// //     await application.save();

// //     res.status(201).json({ message: 'Application submitted via referral', application });

// //   } catch (err) {
// //     console.error('applyViaReferral error:', err);
// //     res.status(500).json({ message: 'Server error' });
// //   }


// };


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
          ? app.referrerStatus
          : app.companyStatus;
        
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

// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const { applicationId } = req.params;
//     const userId = req.userId;
   

//     // Validate input
//     if (!applicationId || !status) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Get application with job details
//     const application = await Application.findById(applicationId)
//       .populate('job', 'postedBy postedByType')
//       .select('job referrer appliedVia companyStatus referrerStatus');

    
    
//     if (!application) {
//       return res.status(404).json({ message: 'Application not found' });
//     }




//     // Get user roles
//     // const user = await User.findById(userId, 'roles');
//     // if (!user) return res.status(404).json({ message: 'User not found' });



// let user = await User.findById(userId, 'roles');
// let isCompany = false;

// if (!user) {
  
//    user = await Company.findById(userId);
//   if (user) {
//     isCompany = true;
//   } else {
//     return res.status(404).json({ message: 'User or company not found' });
//   }
// }



//     // Authorization checks
//     let isAuthorized = false;
//     let statusField = null;
//     let statusUpdateData = {};

 

//     // 1. Check company permissions
//     if (user.roles ==='company') {
//       if (application.job.postedByType === 'company' && 
//           application.job.postedBy.toString() === userId.toString()) {
        
//         isAuthorized = true;
//         statusField = 'companyStatus';
        
//         statusUpdateData = {
//           companyStatus: status,
//           companyStatusUpdatedAt: new Date(),
//           'updatedBy.kind': 'company',
//           'updatedBy.id': userId
//         };
//       }
//     }

    
//     // 2. Check referrer permissions
//     if (!isAuthorized && user.roles.referrer) {
//       // For jobs posted by referrer
//       if (application.job.postedByType === 'referrer' && 
//           application.job.postedBy.toString() === userId.toString()) {
//         isAuthorized = true;
//         statusField = 'referrerStatus';
        
//         statusUpdateData = {
//           referrerStatus: status,
//           referrerStatusUpdatedAt: new Date(),
//           'updatedBy.kind': 'referrer',
//           'updatedBy.id': userId
//         };
//       }
//       // For referral claims - direct match
//       else if (application.referrer && application.referrer.toString() === userId.toString()) {
//         isAuthorized = true;
//         statusField = 'referrerStatus';
        
//         statusUpdateData = {
//           referrerStatus: status,
//           referrerStatusUpdatedAt: new Date(),
//           'updatedBy.kind': 'referrer',
//           'updatedBy.id': userId
//         };
//       }
//       // For claimed jobs without referrer set
//       else if (application.job.postedByType === 'company') {
//         // Check if user has active claim for this job
//         const claimExists = await ReferralClaim.exists({
//           job: application.job._id,
//           referrer: userId,
//           status: 'Active'
//         });
        
//         if (claimExists) {
//           isAuthorized = true;
//           statusField = 'referrerStatus';
          
//           statusUpdateData = {
//             referrerStatus: status,
//             referrerStatusUpdatedAt: new Date(),
//             'updatedBy.kind': 'referrer',
//             'updatedBy.id': userId
//           };
//         }
//       }
//     }

//     if (!isAuthorized) {
//       return res.status(403).json({ message: 'Unauthorized to update this application' });
//     }

//     // Prevent invalid status transitions
//     // const validTransitions = {
//     //   applied: ['reviewed'],
//     //   reviewed: ['accepted', 'rejected'],
//     //   accepted: [],
//     //   rejected: []
//     // };

//     const currentStatus = application[statusField];
//     // if (!validTransitions[currentStatus]?.includes(status)) {
//     //   return res.status(400).json({
//     //     message: `Invalid status transition from ${currentStatus} to ${status}`
//     //   });
//     // }

//     // Atomic update with concurrency control
//     const query = {
//       _id: applicationId,
//       [statusField]: currentStatus
//     };

//     const updatedApp = await Application.findOneAndUpdate(
//       query,
//       { $set: statusUpdateData },
//       {
//         new: true,
//         runValidators: true,
//         select: `${statusField} updatedBy referrerStatusUpdatedAt companyStatusUpdatedAt`
//       }
//     );

//     if (!updatedApp) {
//       return res.status(409).json({ 
//         message: 'Application was modified concurrently. Please try again.' 
//       });
//     }

//     console.log()

//     res.status(200).json({
//       message: 'Status updated successfully',
//       updatedStatus: updatedApp[statusField],
//       updatedBy: updatedApp.updatedBy,
//       updatedAt: updatedApp[`${statusField}UpdatedAt`] || new Date()
//     });
    
//   } catch (err) {
//     console.error('updateApplicationStatus error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const { applicationId } = req.params;
//     const userId = req.userId;

//     // Validate input
//     if (!applicationId || !status) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Get application with minimal data
//     const application = await Application.findById(applicationId)
//       .populate('job', 'postedBy postedByType isReferralCopy claimedBy')
//       .select('appliedVia referrer job companyStatus referrerStatus originalJob');

//     if (!application) {
//       return res.status(404).json({ message: 'Application not found' });
//     }

//     // Safeguard for missing originalJob (shouldn't happen after migration)
//     if (!application.originalJob) {
//       try {
//         // Determine original job ID from job data
//         if (application.job.isReferralCopy) {
//           application.originalJob = application.job.originalJob;
//         } else {
//           application.originalJob = application.job._id;
//         }
        
//         // Save the fixed application
//         await Application.updateOne(
//           { _id: applicationId },
//           { $set: { originalJob: application.originalJob } }
//         );
//       } catch (err) {
//         console.error('Error fixing missing originalJob:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//     }

//     // Determine user type
//     const user = await User.findById(userId).lean() || 
//                  await Company.findById(userId).lean();
    
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     console.log(user, 'isCompany');

    
//     const isCompany = user.roles === 'company';
//     const isReferrer = user.roles?.referrer;

//     // Determine which status to update
//     let statusField = null;
//     let isValid = false;

//     if (isReferrer && application.appliedVia === 'referral') {
//       statusField = 'referrerStatus';
//       isValid = true;
//     } 
//     else if (isCompany && application.appliedVia === 'company') {
//       statusField = 'companyStatus';
//       isValid = true;
      
//     }
//     if (!isValid) {
//       return res.status(403).json({ message: 'Unauthorized to update this application' });
//     }

//     // Validate status transition
//     const validTransitions = {
//       applied: ['reviewed'],
//       reviewed: ['accepted', 'rejected'],
//       accepted: ['hired'],
//       rejected: ['reviewed'] // Allow reconsideration
//     };

//     const currentStatus = application[statusField];
//     if (validTransitions[currentStatus] && !validTransitions[currentStatus].includes(status)) {
//       return res.status(400).json({
//         message: `Invalid status transition from ${currentStatus} to ${status}`
//       });
//     }

//     // Prepare update data
//     const updateData = {
//       [statusField]: status,
//       [`${statusField}UpdatedAt`]: new Date(),
//       'updatedBy.kind': isCompany ? 'company' : 'referrer',
//       'updatedBy.id': userId
//     };

//     // Perform atomic update with concurrency control
//     const result = await Application.updateOne(
//       {
//         _id: applicationId,
//         [statusField]: currentStatus, // Ensure status hasn't changed
//         originalJob: application.originalJob // Include required field
//       },
//       { $set: updateData }
//     );

//     if (result.modifiedCount === 0) {
//       return res.status(409).json({ 
//         message: 'Application was modified concurrently. Please retry.' 
//       });
//     }

//     res.status(200).json({
//       message: 'Status updated successfully',
//       newStatus: status,
//       statusField
//     });
    
//   } catch (err) {
//     console.error('Status update error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

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
    console.log(`Status update request:
      User ID: ${userId}
      User Type: ${userType}
      Application ID: ${applicationId}
      Applied Via: ${application.appliedVia}
      Job Type: ${application.job?.postedByType}
      Is Referral Copy: ${application.job?.isReferralCopy}`);

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
    console.log(`Status updated:
      Application ID: ${applicationId}
      New Status: ${status}
      Updated By: ${userId}
      Status Field: ${statusField}`);

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


// exports.fetchSeekerSingleJobDetail = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const userId = req.userId;

//     // Find the job by ID
//     const job = await Job.findById(jobId)
//       .populate('postedBy', 'name')
//       .populate('originalJob', 'title description requirements')
//       .populate('claimedBy', 'name');

//     if (!job) {
//       return res.status(404).json({ message: 'Job not found' });
//     }

//     // If it's a referral copy, merge original job details
//     if (job.isReferralCopy && job.originalJob) {
//       job.title = job.originalJob.title;
//       job.description = job.originalJob.description;
//       job.requirements = job.originalJob.requirements;
//       job.company = job.originalJob.company;
//       job.location = job.originalJob.location;
//     }

//     // Check if user has applied to this job position
//     let hasApplied = false;
//     if (userId) {
//       hasApplied = await Application.exists({
//         $or: [
//           { job: jobId, seeker: userId },
//           { originalJob: job.isReferralCopy ? job.originalJob : jobId, seeker: userId }
//         ]
//       });
//     }

//     res.json({ 
//       ...job.toObject(),
//       hasApplied
//     });
//   } catch (error) {
//     console.error('Error fetching job details for seeker:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// exports.fetchSeekerSingleJobDetail = async (req, res) => {
 



//   try {
//     const seekerId = req.userId;
//     const jobId = req.params.jobId;

// console.log('Seeker ID:', seekerId);
// console.log('Job ID from params:', jobId);


//     let application;

//     // Try direct match with job ID
//     application = await Application.findOne({
//       job: jobId,
//       seeker: seekerId,
//     })
//       .populate({
//         path: 'job',
//         populate: { path: 'postedBy', select: 'name email' },
//       })
//       .populate('seeker', 'name email');

//       console.log('Result of job match query:', application);


//     // If not found, try matching with originalJob field directly on Application
//     if (!application) {
//       application = await Application.findOne({
//         seeker: seekerId,
//         originalJob: jobId, // here's the fix!
//       })
//         .populate({
//           path: 'job', // now populate job even if null originally
//           populate: { path: 'postedBy', select: 'name email' },
//         })
//         .populate('seeker', 'name email');
//     }

//     console.log('Application found:', application);

//     if (!application) {
//       return res.status(404).json({ message: 'Application not found or unauthorized' });
//     }

//     res.json(application);
//   } catch (error) {
//     console.error('Error fetching job detail for seeker:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }


// };

// Backend: controllers/jobController.js


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