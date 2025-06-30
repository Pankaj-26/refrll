
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
    public_id: {type:String},
    uploadedAt: { type: Date, default: null },
  },
  
  profile: {
    fullName: { type: String, trim: true },
    experience: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    linkedIn: { type: String, trim: true },
    github: { type: String, trim: true },
    company: { type: String, trim: true }, 
     phone:{type:String},
     designation:{type:String},
     location:{type:String},
     profileImg:{type: String, trim: true, default: null }, 
  },

  referrerProfile: {  
    company: { type: String, trim: true },
    
  },
  googleId: { type: String, trim: true },


  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('User', userSchema);