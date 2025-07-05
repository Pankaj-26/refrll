const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Company = require('../models/Company');

exports.getAdminStats = async (req, res) => {
  try {
    // ✅ Ensure only admin can access
    // if (!req.user?.roles?.admin) {
    //   return res.status(403).json({ message: "Only admin can access this route." });
    // }

    // ✅ Fetch counts
    const totalUsers = await User.countDocuments();
    const totalSeekers = await User.countDocuments({ 'roles.seeker': true });
    const totalReferrers = await User.countDocuments({ 'roles.referrer': true });
    const totalCompanies = await Company.countDocuments();
const latestUsers = await User.find().select('name email roles createdAt').limit(10);
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      totalUsers,
      totalSeekers,
      totalReferrers,
      totalCompanies,
      totalJobs,
      totalApplications,
      latestUsers
    });

  } catch (err) {
    console.error('getAdminStats error:', err);
    res.status(500).json({ message: 'Server error while fetching admin stats.' });
  }
};





exports.getCompanyJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;   // default page 1
    const limit = parseInt(req.query.limit) || 10; // default 10 jobs per page
    const skip = (page - 1) * limit;

    // ✅ Fetch total count first
    const totalJobs = await Job.countDocuments({ postedByType: 'company' });

    // ✅ Fetch jobs with pagination
    const jobs = await Job.find({ postedByType: 'company' })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // ✅ For each job, count its applications
    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
      const applicationCount = await Application.countDocuments({ job: job._id });
      return {
        ...job,
        applicationCount
      };
    }));

    res.status(200).json({
      success: true,
      count: jobsWithCounts.length,
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      jobs: jobsWithCounts,
    });

  } catch (err) {
    console.error('Error fetching company jobs:', err);
    res.status(500).json({ message: 'Server error while fetching company jobs' });
  }
};