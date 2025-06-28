const Company = require('../models/Company');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (company) => {
  return jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.signupCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let company = await Company.findOne({ email });
    if (company) return res.status(400).json({ message: 'Company already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    company = new Company({
      name,
      email,
      password: hashedPassword,
      
    });

    await company.save();

    const token = createToken(company);

    res.status(201).json({ token, company: { id: company._id, name: company.name, email: company.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signinCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(company);

    res.status(200).json({ token, company: { id: company._id, name: company.name, email: company.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.companyId).select('-password');
    if (!company) return res.status(404).json({ message: 'Company not found' });

    res.status(200).json({ company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};



// controllers/companyController.js
exports.updateCompanyProfile = async (req, res) => {
  try {
    const companyId = req.userId; // assuming userId is company ID
    const updatedData = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedData, {
      new: true,
    });

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json(updatedCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
