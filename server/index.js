
// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const companyAuthRoutes = require('./routes/companyAuthRoutes');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');
const notificationRoutes =require('./routes/notificationRoutes')
const adminRoutes =require("./routes/adminRoutes")
const apiLimiter = require('./middlewares/rateLimiter');
// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());


app.use(helmet());


app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
// Enable CORS for frontend
app.use(
  cors({
    origin: 'https://refrll-frontend.onrender.com', 
    credentials: true,

  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(cookieParser());


app.use(session({
  secret: process.env.SESSION_SECRET || 'your_default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set true in production behind HTTPS
    httpOnly: true,
    sameSite: 'strict'
  }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/api', apiLimiter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});



// Serve static files (resumes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyAuthRoutes
);

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/notifications',notificationRoutes);
app.use('/api/admin',adminRoutes);





// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



module.exports = app; 