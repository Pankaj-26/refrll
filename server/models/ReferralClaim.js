

// models/ReferralClaim.js
const mongoose = require('mongoose');

const referralClaimSchema = new mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  referrer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  contactInfo: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Closed'], 
    default: 'Active' 
  },
  claimedAt: { 
    type: Date, 
    default: Date.now 
  },
   referralJob: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
}, { timestamps: true });

// Indexes for efficient querying
referralClaimSchema.index({ job: 1, referrer: 1 });
referralClaimSchema.index({ referrer: 1, status: 1 });
referralClaimSchema.index({ job: 1, referredCandidate: 1 });

module.exports = mongoose.model('ReferralClaim', referralClaimSchema);