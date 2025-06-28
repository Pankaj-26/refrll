

const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    applicationLimit: { type: Number, required: true, min: 1 },
    company: { type: String, required: true },
    skills: { type: [String], required: true },
    salaryRange: { type: String },
    employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'] },
    experienceRequired: { type: Number, required: true, min: 0 },
    status:{
      type:String,
      enum:['Open','Close'],
      default:'Open'
    },

     referralClaims: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ReferralClaim'
    }],
    claimedFrom: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Job',
  default: null
},
isReferralCopy: {
  type: Boolean,
  default: false
},
 originalJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
    claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

    
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    postedByType: { type: String, enum: ['referrer', 'company'], required: true }, // 🔥 important

  },
  { timestamps: true }
);
// In jobSchema
jobSchema.index({ postedByType: 1 }); // Add this index
jobSchema.index({ skills: 1, location: 1 });

module.exports = mongoose.model('Job', jobSchema);
