const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');


// Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/resumes'); // folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     // unique filename: timestamp + original name
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });


const storage  = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'raw', // important for pdf, doc, docx
    allowed_formats: ['pdf', 'doc', 'docx'],
  },
});


const upload = multer({ storage: storage });
exports.upload = upload;
