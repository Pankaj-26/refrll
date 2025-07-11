// src/App.js
import React, { useState } from 'react';
import { FaHandshake, FaSearch, FaChevronDown, FaInfoCircle, FaSyncAlt, FaBuilding, FaUser, FaShieldAlt, FaEnvelope } from 'react-icons/fa';

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: "Getting Started",
      icon: <FaInfoCircle className="text-blue-500" />,
      questions: [
        {
          question: "What is Refrll?",
          answer: "Refrll is a job referral platform that connects job seekers, employee referrers, and companies to simplify and fast-track hiring."
        },
        {
          question: "How do I create an account?",
          answer: "You can sign up as a job seeker  or company by clicking the Sign Up button and choosing your role."
        }
      ]
    },
    {
      category: "Referral System",
      icon: <FaSyncAlt className="text-purple-500" />,
      questions: [
        {
          question: "How does the referral system work?",
          answer: "Employees (referrers) post open jobs from their companies. Seekers can apply for these jobs and get referred internally by them."
        },
        {
          question: "How can I become a referrer?",
          answer: "Sign up as a seeker, and upgrade your role to referrer to start posting and referring jobs."
        }
      ]
    },
    {
      category: "For Companies",
      icon: <FaBuilding className="text-teal-500" />,
      questions: [
        {
          question: "How do companies post jobs on Refrll?",
          answer: "Companies can create an account, post jobs, and manage applications through their dashboard."
        },
        {
          question: "Is Refrll free to use?",
          // answer: "Refrll is free for job seekers and referrers. Companies can explore our pricing for advanced features."
          answer: "Refrll is free for now"

        }
      ]
    },
    {
      category: "For Job Seekers",
      icon: <FaUser className="text-amber-500" />,
      questions: [
        {
          question: "Can I track my application status?",
          answer: "Yes, you can view the status of each application in your dashboard."
        }
      ]
    },
    {
      category: "Security & Support",
      icon: <FaShieldAlt className="text-green-500" />,
      questions: [
        {
          question: "How secure is my data?",
          answer: "We use industry-standard encryption and security protocols to keep your data safe."
        },
        {
          question: "I forgot my password, how can I reset it?",
          answer: "Click on 'Forgot Password' on the login page to reset your password via email."
        },
        {
          question: "How do I contact support?",
          answer: "You can reach out to our support team via the Contact page or email us at support@refrll.com"
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <FaHandshake className="text-5xl text-white bg-blue-500 p-2 rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refrll Help Center</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common questions about our job referral platform
          </p>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto px-4 py-8 -mt-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for questions or topics..."
            className="w-full pl-10 pr-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          />
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No results found</h3>
            <p className="text-gray-600">
              We couldn't find any FAQs matching "{searchQuery}". Try another search term.
            </p>
          </div>
        ) : (
          filteredData.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <div className="flex items-center mb-6">
                {category.icon}
                <h2 className="ml-3 text-2xl font-bold text-gray-800">{category.category}</h2>
              </div>
              
              <div className="space-y-4">
                {category.questions.map((item, index) => {
                  const questionIndex = `${catIndex}-${index}`;
                  const isActive = activeIndex === questionIndex;
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <button
                        className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleQuestion(questionIndex)}
                      >
                        <h3 className="font-medium text-lg text-gray-800 pr-4">{item.question}</h3>
                        <FaChevronDown 
                          className={`text-blue-500 transition-transform duration-300 ${isActive ? 'transform rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-96' : 'max-h-0'}`}
                      >
                        <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

     
      </div>


    </div>
  );
}

export default Faq;