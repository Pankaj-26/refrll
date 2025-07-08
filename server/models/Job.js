
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    applicationLimit: { type: Number, min: 1 ,default: null}, 
    currentApplications: { type: Number, default: 0 },

    company: { type: String, required: true },
    skills: { type: [String], required: true },
    salaryRange: { type: String },
    employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'] },
    experienceRequired: { type: Number, required: true, min: 0 },
    status:{
      type:String,
      enum:['Open','Closed'],
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
views: { type: Number, default: 0 },
expiryDate: { type: Date },
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    postedByType: { type: String, enum: ['referrer', 'company'], required: true }, 
  },
  { timestamps: true }
);

jobSchema.index({ postedByType: 1 });
jobSchema.index({ skills: 1, location: 1 });

jobSchema.index({
  title: 'text',
  company: 'text',
  skills: 'text', 
});


module.exports = mongoose.model('Job', jobSchema);
