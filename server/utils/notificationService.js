// const nodemailer = require('nodemailer');
// const twilio = require('twilio');

// // Configure these with your actual credentials/env variables
// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;

// const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
// const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
// const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });

// const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// async function sendEmail(to, subject, text) {
//   try {
//     await transporter.sendMail({
//       from: EMAIL_USER,
//       to,
//       subject,
//       text,
//     });
//   } catch (error) {
//     console.error('sendEmail error:', error);
//   }
// }

// async function sendSMS(to, body) {
//   try {
//     await twilioClient.messages.create({
//       body,
//       from: TWILIO_PHONE_NUMBER,
//       to,
//     });
//   } catch (error) {
//     console.error('sendSMS error:', error);
//   }
// }

// module.exports = {
//   sendEmail,
//   sendSMS,
// };



// utils/notifications.js

// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config(); // Load environment variables from .env file
// // Configure these with your actual credentials or from environment variables
// const EMAIL_USER = process.env.EMAIL_USER;
// const EMAIL_PASS = process.env.EMAIL_PASS;



// // Create transporter for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// });




// transporter.verify((error, success) => {

//   if (error) {
//     console.log(EMAIL_PASS, EMAIL_USER);
//     console.log('Transporter error:', error);
//   } else {
//     console.log('✅ Email server ready');
//   }
// });

// async function sendEmail(to, subject, text) {
//   try {
//     await transporter.sendMail({
//       from: EMAIL_USER,
//       to,
//       subject,
//       text,
//     });
//     console.log(`📧 Email sent to ${to}`);
//   } catch (error) {
//     console.error('sendEmail error:', error);
//   }
// }

// // Dummy SMS handler (no-op)
// async function sendSMS(to, message) {
//   console.log(`📱 Skipping SMS (Twilio not configured): to=${to}, message="${message}"`);
// }

// module.exports = {
//   sendEmail,
//   sendSMS, // still exported to avoid breaking the app, acts as a no-op
// };
