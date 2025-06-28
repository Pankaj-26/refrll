// models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  description: { type: String },
  website: { type: String, trim: true },
  roles: { type: String, enum: ['company'], default: 'company' }, 
  location:{type:String},
  companySize:{type:String},
  founded:{type:String},
  specialties: {type: [String]},
  tagline: { type: String, trim: true },
  bannerUrl:{type:String},
  logoUrl:{type:String},
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
