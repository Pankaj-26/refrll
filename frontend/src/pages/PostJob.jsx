

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobDetailForEdit, postJob, updateJob } from '../features/jobSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { BiRupee } from 'react-icons/bi';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign, 
  FiEdit3, 
  FiUserPlus,
  FiCheckCircle,
  FiHash,
  FiType,
  FiAlertCircle,
  FiX
} from 'react-icons/fi';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const PostJob = () => {
  const dispatch = useDispatch();
  const { editJob,loading } = useSelector((state) => state.jobs);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const { user } = useSelector((state) => state.auth);

  useEffect(()=>{
document.title = "Post Job | Refrll";
  },[])





  const [formData, setFormData] = useState({
    title: '',
    company: user?.company || '',
    description: '',
    location: user?.location || '',
    applicationLimit: 10,
    experienceRequired: 0,
    skills: '',
    salaryRange: '',
    employmentType: 'Full-Time',
  });


  useEffect(() => {
  if (editJob) {
    setFormData({
      title: editJob.title || '',
      company: editJob.company || '',
      description: editJob.description || '',
      location: editJob.location || '',
      applicationLimit: editJob.applicationLimit || 10,
      experienceRequired: editJob.experienceRequired || 0,
      skills: editJob.skills ? editJob.skills.join(', ') : '',
      salaryRange: editJob.salaryRange || '',
      employmentType: editJob.employmentType || 'Full-Time',
    });
  }
}, [editJob]);

const isEditing = !!editJob;


  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'title':
        if (value.length < 5) error = 'Title must be at least 5 characters';
        break;
      case 'company':
        if (value.length < 2) error = 'Please enter a valid company name';
        break;
      case 'location':
        if (value.length < 3) error = 'Please enter a valid location';
        break;
      case 'skills':
        if (value.split(',').filter(s => s.trim()).length < 1)
          error = 'Enter at least 1 skill';
        break;
      case 'description':
        if (value.length < 50) error = 'Description needs at least 50 characters';
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (!validateForm()) return;

    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);



  if (isEditing) {
  dispatch(updateJob({ 
    jobId, 
    updates: { ...formData, skills: skillsArray }
  })).then(()=>{
     setFormData({
          title: '',
          company: user?.company || '',
          description: '',
          location: user?.location || '',
          applicationLimit: 10,
          experienceRequired: 0,
          skills: '',
          salaryRange: '',
          employmentType: 'Full-Time',
        });
        toast.success('Job updated successfully!');
  })
}
else{
    
    dispatch(postJob({ 
      ...formData, 
      skills: skillsArray,
      referrer: user?._id 
    })).then(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        // Reset form after successful submission
        setFormData({
          title: '',
          company: user?.company || '',
          description: '',
          location: user?.location || '',
          applicationLimit: 10,
          experienceRequired: 0,
          skills: '',
          salaryRange: '',
          employmentType: 'Full-Time',
        });
        setTouched({});
      }, 2000);
    });
  }
  };

  const inputFields = [
    { label: 'Job Title', name: 'title', icon: <FiBriefcase />, required: true },
    { label: 'Company', name: 'company', icon: <FiBriefcase />, required: true },
    { label: 'Location', name: 'location', icon: <FiMapPin />, required: true },
    { label: 'Description', name: 'description', type: 'textarea', icon: <FiEdit3 />, required: true },
    { label: 'Skills (comma separated)', name: 'skills', icon: <FiHash />, required: true },
    { label: 'Salary', name: 'salaryRange', icon:    <BiRupee /> },
  ];


const { jobId } = useParams();

useEffect(() => {
  if (jobId) {
    dispatch(getJobDetailForEdit(jobId));
  }
}, [dispatch, jobId]);


  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-start justify-center">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        {/* Success Overlay */}
        {submitted && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-green-200 flex flex-col items-center max-w-sm">
              <FiCheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Job Posted!</h3>
              <p className="text-gray-600 text-center mb-6">
                Your job listing is now live and visible to seekers
              </p>
              <button
                type="button"
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                onClick={() => setSubmitted(false)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Post New Opportunity
          </h2>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details to attract top talent
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inputFields.slice(0, 3).map(({ label, name, type = 'text', icon, required }) => (
              <div key={name} className="space-y-1.5">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  {icon}
                  <span>{label} {required && <span className="text-red-500">*</span>}</span>
                </label>
                
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  className={`w-full p-2.5 bg-gray-50 border ${
                    errors[name] ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800`}
                  placeholder={label}
                />
                
                {touched[name] && errors[name] && (
                  <div className="flex items-start gap-1 text-red-500 text-xs mt-1">
                    <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                    <span>{errors[name]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
              <FiEdit3 />
              <span>Description <span className="text-red-500">*</span></span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className={`w-full p-2.5 bg-gray-50 border ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 min-h-[120px]`}
              placeholder="Enter job description..."
            />
            {touched.description && errors.description && (
              <div className="flex items-start gap-1 text-red-500 text-xs mt-1">
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                <span>{errors.description}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {inputFields.slice(4).map(({ label, name, type = 'text', icon, required }) => (
              <div key={name} className="space-y-1.5">
                <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                  {icon}
                  <span>{label} {required && <span className="text-red-500">*</span>}</span>
                </label>
                
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={required}
                  className={`w-full p-2.5 bg-gray-50 border ${
                    errors[name] ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800`}
                  placeholder={label}
                />
                
                {touched[name] && errors[name] && (
                  <div className="flex items-start gap-1 text-red-500 text-xs mt-1">
                    <FiAlertCircle className="mt-0.5 flex-shrink-0" />
                    <span>{errors[name]}</span>
                  </div>
                )}
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <FiUserPlus />
                <span>Experience Required</span>
              </label>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">0</span>
                <input
                  type="range"
                  name="experienceRequired"
                  min="0"
                  max="20"
                  value={formData.experienceRequired}
                  onChange={handleChange}
                  className="w-full accent-blue-500"
                />
                <span className="text-xs text-gray-500">20</span>
              </div>
              <div className="text-sm text-blue-600 font-medium mt-1">
                {formData.experienceRequired}+ years
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                <FiType />
                <span>Employment Type</span>
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              >
                {['Full-Time', 'Part-Time', 'Internship', 'Contract', 'Freelance'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-3 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="small" light />
            ) : (
              <>
                <FiBriefcase className="w-4 h-4" />
                {/* Post Job Opportunity */}
                 {isEditing ? 'Edit Job Opportunity' : 'Post New Opportunity'}
              </>
            )}
          </button>
          
          <button
            type="button"
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            onClick={() => {
              setFormData({
                title: '',
                company: user?.company || '',
                description: '',
                location: user?.location || '',
                applicationLimit: 10,
                experienceRequired: 0,
                skills: '',
                salaryRange: '',
                employmentType: 'Full-Time',
              });
              setTouched({});
            }}
          >
            <FiX className="w-4 h-4" />
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;