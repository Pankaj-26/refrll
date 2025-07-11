const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


const storage  = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'raw', 
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});


const upload = multer({ storage: storage });
exports.upload = upload;
