// migrations/backfillOriginalJob.js
const mongoose = require('mongoose');
require('dotenv').config();
const Application = require('../models/Application');
const Job = require('../models/Job');

async function backfillOriginalJob() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Find applications missing originalJob
    const applications = await Application.find({ originalJob: { $exists: false } });
    console.log(`Found ${applications.length} applications to update`);

    for (const app of applications) {
      try {
        const job = await Job.findById(app.job);
        if (job) {
          // Determine original job ID
          const originalJobId = job.isReferralCopy ? job.originalJob : job._id;
          
          await Application.updateOne(
            { _id: app._id },
            { $set: { originalJob: originalJobId } }
          );
        }
      } catch (err) {
        console.error(`Error updating application ${app._id}:`, err);
      }
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

backfillOriginalJob();