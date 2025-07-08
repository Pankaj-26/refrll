
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: {
    type: String,
    required: function() {
      return !this.googleId; 
    }
  },
  roles: {
    seeker: { type: Boolean, default: true },
    referrer: { type: Boolean, default: false },
  },
  resume: {
    url: { type: String, trim: true },
    public_id: { type: String },
    uploadedAt: { type: Date, default: null },
  },
  profile: {
    fullName: { type: String, trim: true },
    experience: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    linkedIn: { type: String, trim: true },
    github: { type: String, trim: true },
    company: { type: String, trim: true },
    phone: { type: String },
    designation: { type: String },
    location: { type: String },
    profileImg: { type: String, trim: true, default: null },
  },
  isVerified: { type: Boolean, default: false },
badge: {
  type: String,
  enum: ['gold', 'silver', 'bronze', null],
  default: null,
},
  referrerProfile: {
    company: { type: String, trim: true },
  },
  referralCount: { type: Number, default: 0 },
  googleId: { type: String, trim: true },
  resetPasswordToken: { type: String, trim: true },
  resetPasswordExpire: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  status: {
  type: String,
  enum: ['active', 'suspended', 'deleted'],
  default: 'active',
},
}, { timestamps: true });

userSchema.index({ 'roles.referrer': 1 });
userSchema.index({ 'roles.seeker': 1 });
userSchema.index({ isVerified: 1 });

module.exports = mongoose.model('User', userSchema);