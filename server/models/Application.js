
// the below ne is to track if the seeker has already applied to a job claimed by other referrer

const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String, required: true },

    appliedVia: {
      type: String,
      enum: ['referral', 'company'],
      required: true,
    },

    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    
    },

    // ✅ NEW status fields
  // models/Application.js
companyStatus: {
  type: String,
  enum: ['applied', 'reviewed', 'accepted', 'rejected', null],
  default: null
},
referrerStatus: {
  type: String,
  enum: ['applied', 'reviewed', 'accepted', 'rejected', null],
  default: null
},
        companyStatusUpdatedAt: Date,
    referrerStatusUpdatedAt: Date,
    updatedBy: {
      kind: { type: String, enum: ['referrer', 'company'] },
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
     originalJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
     index: true
  }
  

  },
  { timestamps: true }
);


// Add pre-save hook to ensure originalJob is set
// models/Application.js
applicationSchema.pre('save', async function(next) {
  if (!this.originalJob) {
    try {
      console.log(`Fixing missing originalJob for application ${this._id}`);
      const job = await Job.findById(this.job);
      
      if (job) {
        this.originalJob = job.isReferralCopy ? job.originalJob : job._id;
        console.log(`Set originalJob to ${this.originalJob}`);
      }
    } catch (err) {
      console.error('Error setting originalJob:', err);
    }
  }
  next();
});
applicationSchema.index({ job: 1, seeker: 1  }, { unique: true });
applicationSchema.index({ seeker: 1, createdAt: -1 });
module.exports = mongoose.model('Application', applicationSchema);
