// src/pages/HelpCenter.jsx
import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaUserFriends, FaBriefcase, FaCreditCard } from 'react-icons/fa';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  
  const categories = [
    { id: 'general', name: 'General', icon: <FaQuestionCircle /> },
    { id: 'jobseekers', name: 'Job Seekers', icon: <FaUserFriends /> },
    { id: 'referrers', name: 'Referrers', icon: <FaBriefcase /> },
    { id: 'companies', name: 'Companies', icon: <FaCreditCard /> }
  ];
  
  const faqs = {
    general: [
      {
        question: 'How do I create an account?',
        answer: 'To create an account, click the "Sign Up" button at the top right of our homepage. You can sign up using your email address or through LinkedIn. Once registered, you\'ll be able to complete your profile and start using Refrll.'
      },
      {
        question: 'Is Refrll free to use?',
        answer: 'Yes, Refrll is completely free for job seekers. Referrers can also use the platform for free. Companies pay to post jobs and access our premium hiring features.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'If you need to reset your password, click the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password.'
      }
    ],
    jobseekers: [
      {
        question: 'How do I apply for jobs?',
        answer: 'You can apply for jobs in two ways: 1) Browse open positions and apply directly through Refrll, or 2) Connect with referrers who can recommend you for positions at their companies. Your profile needs to be at least 70% complete to apply.'
      },
      {
        question: 'Can I apply for multiple jobs at once?',
        answer: 'Yes, you can apply for multiple jobs simultaneously. We recommend tailoring your application materials for each position to increase your chances of success.'
      },
      {
        question: 'How do I know if a company has viewed my application?',
        answer: 'You\'ll receive notifications in your Refrll dashboard when your application status changes. You can also see when your application has been viewed in your application history.'
      }
    ],
    referrers: [
      {
        question: 'How do I refer someone for a job?',
        answer: 'To refer someone: 1) Find a job you want to refer for (either from your company\'s job board or public listings), 2) Click "Refer Candidate", 3) Select a candidate from your network or invite someone new, 4) Submit your referral with any additional comments for the hiring team.'
      },
      {
        question: 'What information should I include in a referral?',
        answer: 'Effective referrals include: How you know the candidate, specific skills that make them a good fit for the role, examples of their relevant work or achievements, and why you think they\'d succeed at your company.'
      },
      {
        question: 'How and when do I receive referral rewards?',
        answer: 'Referral rewards are paid by the hiring company according to their policy. Most companies pay out rewards after the referred candidate has been employed for 90 days. You\'ll receive payment details once the reward is approved.'
      }
    ],
    companies: [
      {
        question: 'How do I post a job on Refrll?',
        answer: 'Company administrators can post jobs by: 1) Navigating to the company dashboard, 2) Clicking "Post New Job", 3) Completing the job details form, 4) Setting referral rewards and preferences, 5) Publishing the job. All jobs go through a brief review process before going live.'
      },
      {
        question: 'What information do I need to provide about my company?',
        answer: 'To create a company profile, we require: Official company name, website, industry, company size, and a brief description. You can also add your company logo, locations, and benefits information to attract better candidates.'
      },
      {
        question: 'How are referral rewards managed?',
        answer: 'Refrll provides a dashboard where you can set and manage referral rewards for different positions. We handle the tracking of successful referrals and can facilitate payments to referrers, or you can handle payments through your existing HR systems.'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions and learn how to get the most out of Refrll
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-colors ${
              activeCategory === category.id 
                ? 'border-indigo-600 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="text-indigo-600 text-2xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
          </button>
        ))}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {faqs[activeCategory].map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling;
                  content.style.display = content.style.display === 'none' ? 'block' : 'none';
                }}
              >
                <h3 className="font-medium text-lg text-gray-900">{faq.question}</h3>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="px-6 pb-6 hidden">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 pt-16 border-t border-gray-200">
        <div className="bg-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-700 mb-8">
              Our support team is ready to assist you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Contact Support
              </a>
              <button className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;