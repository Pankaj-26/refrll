

const mongoose = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
// const { sendEmail, sendSMS } = require('../utils/notificationService');

// Helper middleware to check if user is referrer
// const isReferrer = async (userId) => {
//   const user = await User.findById(userId).select('roles');
//   return user?.roles?.referrer === true;
// };


// exports.createJob = async (req, res) => {
//   try {
//     // Check if the user is a referrer
//     const userIsReferrer = await isReferrer(req.userId);
//     if (!userIsReferrer) {
//       return res.status(403).json({ message: 'Only referrers can post jobs' });
//     }

//     const {
//       title,
//       company,
//       description,
//       location,
//       applicationLimit,
//       experienceRequired,
//       skills,
//       salaryRange,
//       employmentType,
//     } = req.body;

//     // Validate required fields
//     if (
//       !title?.trim() ||
//       !description?.trim() ||
//       !location?.trim() ||
//       !company?.trim() ||
//       !applicationLimit ||
//       experienceRequired === undefined ||
//       !Array.isArray(skills) ||
//       skills.length === 0
//     ) {
//       return res.status(400).json({ message: 'Required fields missing or invalid' });
//     }

//     // Create and save the job
//     const job = new Job({
//       title: title.trim(),
//       company: company.trim(),
//       description: description.trim(),
//       location: location.trim(),
//       applicationLimit,
//       experienceRequired,
//       skills,
//       salaryRange,
//       employmentType,
//       postedBy: req.userId,
//     });

//     await job.save();

//     // Fetch all seekers
//     const seekers = await User.find({ 'roles.seeker': true });

//     // Notify seekers via email/SMS (non-blocking, safe)
//     // await Promise.all(
//     //   seekers.map(async (seeker) => {
//     //     try {
//     //       if (seeker.email) {
//     //         await sendEmail(
//     //           seeker.email,
//     //           'New Job Posted',
//     //           `A new job titled "${job.title}" has been posted in ${job.location}. Check it out on the platform!`
//     //         );
//     //       }
//     //       if (seeker.phoneNumber) {
//     //         await sendSMS(
//     //           seeker.phoneNumber,
//     //           `New job: "${job.title}" in ${job.location}. Apply now on the platform.`
//     //         );
//     //       }
//     //     } catch (notifyErr) {
//     //       console.error(`Notification failed for ${seeker._id}:`, notifyErr.message);
//     //     }
//     //   })
//     // );

//     return res.status(201).json({ message: 'Job posted successfully', job });

//   } catch (err) {
//     console.error('Error in createJob:', err.message);
//     return res.status(500).json({ message: 'Server error while posting job' });
//   }
// };
const ReferralClaim = require('../models/ReferralClaim');

exports.updateJob = async (req, res) => {
  try {
    if (!(await isReferrer(req.userId))) {
      return res.status(403).json({ message: 'Only referrers can update jobs' });
    }

    const jobId = req.params.id;
    const updates = req.body;

    // Ensure referrer owns the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized to update this job' });
    }

    // Update allowed fields only
    const allowedFields = ['title', 'description', 'location', 'applicationLimit', 'experienceRequired'];
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) job[field] = updates[field];
    });

    await job.save();

    res.json({ message: 'Job updated successfully', job });
  } catch (err) {
    console.error('updateJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { location, maxExperience, search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (maxExperience !== undefined) {
      query.experienceRequired = { $lte: Number(maxExperience) };
    }

    if (search) {
      const keywords = search.split(' ').filter(Boolean);
      query.$or = [];
      keywords.forEach(word => {
        query.$or.push({ title: { $regex: word, $options: 'i' } });
        query.$or.push({ description: { $regex: word, $options: 'i' } });
      });
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('postedBy', 'email roles');

    const total = await Job.countDocuments(query);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      jobs,
    });
  } catch (err) {
    console.error('searchJobs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};



// exports.createJob = async (req, res) => {
//   try {
//     const { userId, roles } = req.user;

//     console.log(req.user)

   
//     // Check if user is allowed to post
//     if (roles?.referrer) {
 
//       const user = await User.findById(userId).select('roles');
      
     
//       if (!user?.roles?.referrer) {
          
//         return res.status(403).json({ message: 'Only referrers or companies can post jobs' });
//       }
//     } else if (roles !== 'company') {
//       return res.status(403).json({ message: 'Only referrers or companies can post jobs' });
//     }

//     const {
//       title,
//       company,
//       description,
//       location,
//       applicationLimit,
//       experienceRequired,
//       skills,
//       salaryRange,
//       employmentType,
//     } = req.body;

//   console.log(req.body)
  

//     if (
//       !title?.trim() ||
//       !description?.trim() ||
//       !location?.trim() ||
//       !company?.trim() ||
//       !applicationLimit ||
//       experienceRequired === undefined ||
//       !Array.isArray(skills) ||
//       skills.length === 0
//     ) {
//       return res.status(400).json({ message: 'Required fields missing or invalid' });
//     }

//    let postedByType=""

//     if(roles?.referrer){
//       postedByType="referrer"
//     }else{
//       postedByType="company"
//     }

//     const job = new Job({
//       title: title.trim(),
//       company: company.trim(),
//       description: description.trim(),
//       location: location.trim(),
//       applicationLimit,
//       experienceRequired,
//       skills,
//       salaryRange,
//       employmentType,
//       postedBy: userId,
//       postedByType: postedByType , // 'User' or 'Company'
//     });

//     await job.save();

//     // Notify seekers (you can keep this the same)
//     const seekers = await User.find({ 'roles.seeker': true });

//     return res.status(201).json({ message: 'Job posted successfully', job });

//   } catch (err) {
//     console.error('Error in createJob:', err.message);
//     return res.status(500).json({ message: 'Server error while posting job' });
//   }
// };

exports.createJob = async (req, res) => {
  try {
    const { userId, roles } = req.user;
    console.log(req.user);

    // Check if user is allowed to post
    if (roles?.referrer) {
      const user = await User.findById(userId).select('roles');
      if (!user?.roles?.referrer) {
        return res.status(403).json({ message: 'Only referrers or companies can post jobs' });
      }
    } else if (roles !== 'company') {
      return res.status(403).json({ message: 'Only referrers or companies can post jobs' });
    }

    const {
      title,
      company,
      description,
      location,
      applicationLimit,
      experienceRequired,
      skills,
      salaryRange,
      employmentType,
    } = req.body;

    console.log(req.body);

    if (
      !title?.trim() ||
      !description?.trim() ||
      !location?.trim() ||
      !company?.trim() ||
      experienceRequired === undefined ||
      !Array.isArray(skills) ||
      skills.length === 0
    ) {
      return res.status(400).json({ message: 'Required fields missing or invalid' });
    }

    let postedByType = roles?.referrer ? "referrer" : "company";

    const jobData = {
      title: title.trim(),
      company: company.trim(),
      description: description.trim(),
      location: location.trim(),
      experienceRequired,
      skills,
      salaryRange,
      employmentType,
      postedBy: userId,
      postedByType,
    };

    // ✅ Set applicationLimit for referrer jobs only
    if (postedByType === 'referrer') {
      jobData.applicationLimit = applicationLimit || 10; // default to 10 if not passed
      jobData.currentApplications = 0;
    }

    const job = new Job(jobData);
    await job.save();

    // Notify seekers (optional, keep as is)
    const seekers = await User.find({ 'roles.seeker': true });

    return res.status(201).json({ message: 'Job posted successfully', job });

  } catch (err) {
    console.error('Error in createJob:', err.message);
    return res.status(500).json({ message: 'Server error while posting job' });
  }
};






exports.claimJobForReferral = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;
    const { contactInfo } = req.body;

  

    const originalJob = await Job.findById(jobId);
    if (!originalJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check for existing claim
    const existingClaim = await ReferralClaim.findOne({
      job: jobId,
      referrer: userId,
      status: 'Active'
    });

    if (existingClaim) {
      return res.status(400).json({ message: 'You already claimed this job' });
    }

    // Create job copy for referrer
    const jobCopy = new Job({
      ...originalJob.toObject(),
      _id: new mongoose.Types.ObjectId(),
      postedBy: userId,
      postedByType: 'referrer',
      isReferralCopy: true,
       applicationLimit:10,
      originalJob: jobId,
      claimedBy: userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    await jobCopy.save();
  

    // Create referral claim
    const referralClaim = new ReferralClaim({
      job: jobId,
      referrer: userId,
      referralJob: jobCopy._id,
      contactInfo: contactInfo || req.user.email
    });
    
    await referralClaim.save();
   

    // Update original job
    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { referralClaims: referralClaim._id }
    });

    res.status(201).json({
      message: 'Job claimed successfully',
      referralJob: jobCopy,
      claim: referralClaim
    });

  } catch (err) {
    console.error('Error claiming job:', err);
    res.status(500).json({ message: 'Failed to claim job' });
  }
};


// exports.getJobs = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { tab } = req.query;

//     const query = {};

//     if (tab === 'company') {
//       query.postedByType = 'company';
//     }

//     if (tab === 'referral') {
//       // Step 1: Get all active claimed jobs (by any referrer)
//       const claimedJobs = await ReferralClaim.find({ status: 'Active' })
//         .select('referralJob referrer')
//         .lean();

//       const claimedJobIds = claimedJobs
//         .filter(c => c.referrer.toString() !== userId) // ❌ Exclude jobs claimed by this user
//         .map(c => c.referralJob);

//       // Step 2: Get jobs posted by other referrers (not this user)
//       query.$or = [
//         { postedByType: 'referrer', postedBy: { $ne: userId } }, // ✅ Jobs posted by other referrers
//         { _id: { $in: claimedJobIds } } // ✅ Jobs claimed by other referrers
//       ];
//     }

//     const jobs = await Job.find(query)
//       .populate({
//         path: 'referralClaims',
//         match: { status: 'Active' },
//         select: 'contactInfo referrer',
//         populate: {
//           path: 'referrer',
//           select: 'name email profile.company'
//         }
//       })
//       .lean();

//     // Optional: attach seeker’s application info
//     let applications = [];
//     if (userId) {
//       applications = await Application.find({ seeker: userId }).select('job status').lean();
//     }

//     const appliedMap = {};
//     applications.forEach(app => {
//       appliedMap[app.job.toString()] = app.status || 'Pending';
//     });

//     const enrichedJobs = jobs.map(job => ({
//       ...job,
//       applied: !!appliedMap[job._id.toString()],
//       applicationStatus: appliedMap[job._id.toString()] || null,
//     }));

//     res.status(200).json(enrichedJobs);
//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ message: 'Failed to fetch jobs' });
//   }
// };




// exports.getJobs = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { tab } = req.query;

//     const query = {};

//     if (tab === 'company') {
//       query.postedByType = 'company';
//     }

//     if (tab === 'referral') {
//       // Step 1: Get all active claimed jobs (by any referrer)
//       const claimedJobs = await ReferralClaim.find({ status: 'Active' })
//         .select('referralJob referrer')
//         .lean();

//       const claimedJobIds = claimedJobs
//         .filter(c => c.referrer.toString() !== userId) // ❌ Exclude jobs claimed by this user
//         .map(c => c.referralJob);

//       // Step 2: Get jobs posted by other referrers (not this user)
//       query.$or = [
//         { postedByType: 'referrer', postedBy: { $ne: userId } }, // ✅ Jobs posted by other referrers
//         { _id: { $in: claimedJobIds } } // ✅ Jobs claimed by other referrers
//       ];
//     }

//     const jobs = await Job.find(query)
//       .populate({
//         path: 'referralClaims',
//         match: { status: 'Active' },
//         select: 'contactInfo referrer',
//         populate: {
//           path: 'referrer',
//           select: 'name email profile.company'
//         }
//       })
//       .lean();

//     // Optional: attach seeker’s application info
//     let applications = [];
    
//      applications = await Application.find({ seeker: userId })
//   .select('job originalJob status')
//   .lean();
    

// const appliedMap = {};
// applications.forEach(app => {
//   if (app.job) appliedMap[app.job.toString()] = app.status || 'Pending';
//   if (app.originalJob) appliedMap[app.originalJob.toString()] = app.status || 'Pending';
// });

// const enrichedJobs = jobs.map(job => {
//   const jobId = job._id.toString();
//   const originalJobId = job.originalJob?.toString();

//   const applied = appliedMap[jobId] || appliedMap[originalJobId];
//   const applicationStatus = appliedMap[jobId] || appliedMap[originalJobId] || null;

//   return {
//     ...job,
//     applied: !!applied,
//     applicationStatus
//   };
// });

// // console.log('AppliedSet:', [...appliedSet]);

// // jobs.forEach(job => {
// //   console.log('Job:', job._id.toString(), 'Original:', job.originalJob?.toString(), 'Applied:', appliedSet.has(job._id.toString()) || appliedSet.has(job.originalJob?.toString()));
// // });

//     res.status(200).json(enrichedJobs);
//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ message: 'Failed to fetch jobs' });
//   }
// };
// this is the working code 



// exports.getJobs = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { tab, search, experience, salaryRange, location, page = 1, limit = 10 } = req.query;

//     const query = {};

//     // ✅ Tab filtering
//     if (tab === 'company') {
//       query.postedByType = 'company';
//     }

//     console.log("Final search query:", JSON.stringify(query, null, 2));


//     if (tab === 'referral') {
//       const claimedJobs = await ReferralClaim.find({ status: 'Active' }).select('referralJob referrer').lean();
//       const claimedJobIds = claimedJobs
//         .filter(c => c.referrer.toString() !== userId)
//         .map(c => c.referralJob);

//       query.$or = [
//         { postedByType: 'referrer', postedBy: { $ne: userId } },
//         { _id: { $in: claimedJobIds } }
//       ];
//     }

//     // ✅ Text search across title, company, and skills
//     // if (search) {
//     //   query.$text = { $search: search };
//     // }

//     console.log(search)

//     if (search && search.trim() !== "") {
//   const searchRegex = new RegExp(search, 'i');
//   query.$or = [
//     { title: searchRegex },
//     { company: searchRegex },
//     { skills: searchRegex }
//   ];
// }


//     // ✅ Experience filter (>= selected experience)
// if (experience !== undefined && experience !== "") {
//   const expNum = Number(experience);
//   if (!isNaN(expNum)) {
//     query.experienceRequired = expNum;
//   }
// }



//     if (experience) {
//       query.experienceRequired = { $gte: Number(experience) };
//     }

//     // ✅ Salary range exact match (string)
//     if (salaryRange) {
//       query.salaryRange = salaryRange;
//     }

//     // ✅ Location filter (partial match, case-insensitive)
//     if (location) {
//       query.location = new RegExp(location, 'i');
//     }

//     // ✅ Pagination
//     const skip = (Number(page) - 1) * Number(limit);

//     // ✅ Fetch jobs with pagination
//     const jobs = await Job.find(query)
//       .skip(skip)
//       .limit(Number(limit))
//       .populate({
//         path: 'referralClaims',
//         match: { status: 'Active' },
//         select: 'contactInfo referrer',
//         populate: {
//           path: 'referrer',
//           select: 'name email profile.company'
//         }
//       })
//       .lean();

//     console.log("Final search query:", JSON.stringify(query, null, 2));


//     // ✅ Count total matching jobs for frontend pagination UI
//     const totalCount = await Job.countDocuments(query);

//     // ✅ Fetch seeker applications to mark applied jobs
//     const applications = await Application.find({ seeker: userId })
//       .select('job originalJob status')
//       .lean();

//     const appliedMap = {};
//     applications.forEach(app => {
//       if (app.job) appliedMap[app.job.toString()] = app.status || 'Pending';
//       if (app.originalJob) appliedMap[app.originalJob.toString()] = app.status || 'Pending';
//     });

//     const enrichedJobs = jobs.map(job => {
//       const jobId = job._id.toString();
//       const originalJobId = job.originalJob?.toString();
//       const applied = appliedMap[jobId] || appliedMap[originalJobId];
//       return {
//         ...job,
//         applied: !!applied,
//         applicationStatus: applied || null,
//       };
//     });

//     res.status(200).json({
//       jobs: enrichedJobs,
//       total: totalCount,
//       page: Number(page),
//       totalPages: Math.ceil(totalCount / Number(limit))
//     });

//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ message: 'Failed to fetch jobs' });
//   }
// };

exports.getJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const { tab, page = 1, limit = 10, search, ...filters } = req.query;
    const { jobType, experience, salaryRange, location } = filters;

    const query = {};
    const conditions = [];

    // 🔷 Tab filtering (company or referral)
    if (tab === 'company') {
      conditions.push({ postedByType: 'company' });
    } else if (tab === 'referral') {
      const claimedJobs = await ReferralClaim.find({ status: 'Active' })
        .select('referralJob referrer')
        .lean();

      const claimedJobIds = claimedJobs
        .filter(c => c.referrer.toString() !== userId)
        .map(c => c.referralJob);

      conditions.push({
        $or: [
          { postedByType: 'referrer', postedBy: { $ne: userId } }, // referrer posted jobs excluding user's own
          { _id: { $in: claimedJobIds } } // claimed jobs
        ]
      });
    }

    // 🔷 Search functionality
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), 'i');
      conditions.push({
        $or: [
          { title: searchRegex },
          { company: searchRegex },
          { description: searchRegex },
          { skills: searchRegex }
        ]
      });
    }

    // 🔷 Job Type filter
    if (jobType) {
      const types = Array.isArray(jobType) ? jobType : [jobType];
      conditions.push({ employmentType: { $in: types } });
    }

    // 🔷 Experience filter
    if (experience && !isNaN(experience)) {
      conditions.push({ experienceRequired: { $gte: Number(experience) } });
    }

    // 🔷 Salary Range filter
    if (salaryRange) {
      conditions.push({ salaryRange });
    }

    // 🔷 Location filter
    if (location) {
      const locationRegex = new RegExp(location, 'i');
      conditions.push({ location: locationRegex });
    }

    // Combine all conditions
    if (conditions.length > 0) {
      query.$and = conditions;
    }

    // 🔷 Pagination setup
    const skip = (Number(page) - 1) * Number(limit);

    // 🔷 Total count for pagination
    const totalCount = await Job.countDocuments(query);

    // 🔷 Fetch jobs
    const jobs = await Job.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate({
        path: 'referralClaims',
        match: { status: 'Active' },
        select: 'contactInfo referrer',
        populate: {
          path: 'referrer',
          select: 'name email profile.company'
        }
      })
      .lean();

    // 🔷 Fetch seeker applications to mark applied jobs
    const applications = await Application.find({ seeker: userId })
      .select('job originalJob status')
      .lean();

    const appliedMap = {};
    applications.forEach(app => {
      if (app.job) appliedMap[app.job.toString()] = app.status || 'Pending';
      if (app.originalJob) appliedMap[app.originalJob.toString()] = app.status || 'Pending';
    });

    const enrichedJobs = jobs.map(job => {
      const jobId = job._id.toString();
      const originalJobId = job.originalJob?.toString();
      const applied = appliedMap[jobId] || appliedMap[originalJobId];
      return {
        ...job,
        applied: !!applied,
        applicationStatus: applied || null,
      };
    });

    console.log("Tab param received:", tab);

    res.status(200).json({
      jobs: enrichedJobs,
      totalCount,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / Number(limit))
    });

  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};


// exports.getJobs = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { tab, search, experience, salaryRange, location, page = 1, limit = 20 } = req.query;

//     const query = {};
//     const conditions = [];

//     // Tab filtering
//     if (tab === 'company') {
//       conditions.push({ postedByType: 'company' });
//     } else if (tab === 'referral') {
//       const claimedJobs = await ReferralClaim.find({ status: 'Active' }).select('referralJob referrer').lean();
//       const claimedJobIds = claimedJobs
//         .filter(c => c.referrer.toString() !== userId)
//         .map(c => c.referralJob);

//       conditions.push({
//         $or: [
//           { postedByType: 'referrer', postedBy: { $ne: userId } },
//           { _id: { $in: claimedJobIds } }
//         ]
//       });
//     }

//     // Text search across title, company, and skills
//     if (search && search.trim() !== "") {
//       const searchRegex = new RegExp(search, 'i');
//       conditions.push({
//         $or: [
//           { title: searchRegex },
//           { company: searchRegex },
//           { skills: searchRegex }
//         ]
//       });
//     }

//     // Experience filter
//     if (experience !== undefined && experience !== "") {
//       const expNum = Number(experience);
//       if (!isNaN(expNum)) {
//         conditions.push({ experienceRequired: { $gte: expNum } });
//       }
//     }

//     // Salary range
//     if (salaryRange) {
//       conditions.push({ salaryRange });
//     }

//     // Location filter
//     if (location) {
//       conditions.push({ location: new RegExp(location, 'i') });
//     }

//     // Combine all conditions
//     if (conditions.length > 0) {
//       if (conditions.length === 1) {
//         Object.assign(query, conditions[0]);
//       } else {
//         query.$and = conditions;
//       }
//     }

//     // Log the final query
//     console.log("Final search query:", JSON.stringify(query, (key, value) => {
//       if (value instanceof RegExp) return value.toString();
//       return value;
//     }, 2));

//     // Pagination
//     const skip = (Number(page) - 1) * Number(limit);

//     // Fetch jobs with pagination
//     const jobs = await Job.find(query)
//       .skip(skip)
//       .limit(Number(limit))
//       .populate({
//         path: 'referralClaims',
//         match: { status: 'Active' },
//         select: 'contactInfo referrer',
//         populate: {
//           path: 'referrer',
//           select: 'name email profile.company'
//         }
//       })
//       .lean();

//     // Count total matching jobs
//     const totalCount = await Job.countDocuments(query);

//     // Fetch seeker applications to mark applied jobs
//     const applications = await Application.find({ seeker: userId })
//       .select('job originalJob status')
//       .lean();

//     const appliedMap = {};
//     applications.forEach(app => {
//       if (app.job) appliedMap[app.job.toString()] = app.status || 'Pending';
//       if (app.originalJob) appliedMap[app.originalJob.toString()] = app.status || 'Pending';
//     });

//     const enrichedJobs = jobs.map(job => {
//       const jobId = job._id.toString();
//       const originalJobId = job.originalJob?.toString();
//       const applied = appliedMap[jobId] || appliedMap[originalJobId];
//       return {
//         ...job,
//         applied: !!applied,
//         applicationStatus: applied || null,
//       };
//     });

//     res.status(200).json({
//       jobs: enrichedJobs,
//       total: totalCount,
//       page: Number(page),
//       totalPages: Math.ceil(totalCount / Number(limit))
//     });

//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ message: 'Failed to fetch jobs' });
//   }
// };


// exports.getJobs = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const { 
//       tab, 
//       search, 
//       experience, 
//       salaryRange, 
//       location, 
//       page = 1, 
//       limit = 20 
//     } = req.query;

//     // Validate and sanitize input
//     const pageNum = Math.max(1, parseInt(page)) || 1;
//     const limitNum = Math.min(Math.max(1, parseInt(limit)), 100) || 20; // Cap limit to 100
//     const skip = (pageNum - 1) * limitNum;

//     const query = {};
//     const conditions = [];

//     // Tab filtering - ensure it's one of the expected values
//     if (['company', 'referral'].includes(tab)) {
//       if (tab === 'company') {
//         conditions.push({ postedByType: 'company' });
//       } else if (tab === 'referral') {
//         const claimedJobs = await ReferralClaim.find({ 
//           status: 'Active' 
//         }).select('referralJob referrer').lean();
        
//         const claimedJobIds = claimedJobs
//           .filter(c => c.referrer.toString() !== userId)
//           .map(c => c.referralJob);

//         conditions.push({
//           $or: [
//             { postedByType: 'referrer', postedBy: { $ne: userId } },
//             { _id: { $in: claimedJobIds } }
//           ]
//         });
//       }
//     }

//     // Text search - prevent regex DOS attacks
//     if (search && search.trim() !== "") {
//       const safeSearch = search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
//       const searchRegex = new RegExp(safeSearch, 'i');
      
//       conditions.push({
//         $or: [
//           { title: searchRegex },
//           { company: searchRegex },
//           { skills: searchRegex }
//         ]
//       });
//     }

//     // Experience filter - validate number
//     if (experience !== undefined && experience !== "") {
//       const expNum = Number(experience);
//       if (!isNaN(expNum)) {
//         conditions.push({ experienceRequired: { $gte: expNum } });
//       }
//     }

//     // Salary range - prevent regex DOS
//     if (salaryRange) {
//       // If you have predefined salary ranges, validate against them
//       conditions.push({ salaryRange });
//     }

//     // Location filter - prevent regex DOS
//     if (location) {
//       const safeLocation = location.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
//       conditions.push({ location: new RegExp(safeLocation, 'i') });
//     }

//     // Combine conditions - always use $and for consistency
//     if (conditions.length > 0) {
//       query.$and = conditions;
//     }

//     // Logging - only in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log("Query:", JSON.stringify(query, null, 2));
//     }

//     // Use Promise.all for parallel execution
//     const [jobs, totalCount] = await Promise.all([
//       Job.find(query)
//         .skip(skip)
//         .limit(limitNum)
//         .populate({
//           path: 'referralClaims',
//           match: { status: 'Active' },
//           select: 'contactInfo referrer',
//           populate: {
//             path: 'referrer',
//             select: 'name email profile.company'
//           }
//         })
//         .lean(),
        
//       Job.countDocuments(query)
//     ]);

//     // Get applications in a single query
//     const applications = await Application.find({
//       $or: [
//         { job: { $in: jobs.map(j => j._id) } },
//         { originalJob: { $in: jobs.map(j => j.originalJob).filter(Boolean) } }
//       ],
//       seeker: userId
//     }).select('job originalJob status').lean();

//     // Create application map
//     const appliedMap = applications.reduce((map, app) => {
//       if (app.job) map[app.job.toString()] = app.status || 'Pending';
//       if (app.originalJob) map[app.originalJob.toString()] = app.status || 'Pending';
//       return map;
//     }, {});

//     // Enrich jobs with application status
//     const enrichedJobs = jobs.map(job => {
//       const jobId = job._id.toString();
//       const originalJobId = job.originalJob?.toString();
//       const applied = appliedMap[jobId] || appliedMap[originalJobId];
      
//       return {
//         ...job,
//         applied: !!applied,
//         applicationStatus: applied || null,
//       };
//     });

//     res.status(200).json({
//       jobs: enrichedJobs,
//       total: totalCount,
//       page: pageNum,
//       totalPages: Math.ceil(totalCount / limitNum)
//     });

//   } catch (err) {
//     console.error('Error fetching jobs:', err);
//     res.status(500).json({ message: 'Failed to fetch jobs' });
//   }
// };