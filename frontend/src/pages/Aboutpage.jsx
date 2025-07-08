// src/pages/AboutPage.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaCogs, FaHandshake } from 'react-icons/fa';
import FeatureCard from '../components/FeatureCard';
// import TeamMember from '../components/TeamMember';

const AboutPage = () => {
  const navigate=useNavigate();
  useEffect(()=>{
     document.title = "About | Refrll – Where Connections Create Careers";
  },[])
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Refrll</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering Referrals, Empowering Careers
        </p>
      </div>
      
      <div className="mb-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700 mb-8">
            At Refrll, we believe that great opportunities are best shared. We are a tech-enabled job referral platform built to simplify and amplify the power of employee referrals in hiring.
          </p>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg">
              To make hiring more efficient, transparent, and human by leveraging the power of referrals – because the best opportunities often come from people you trust.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<FaHandshake className="text-indigo-600" size={28} />}
            title="For Referrers"
            description="Post or claim jobs to refer talented seekers within your networks, helping others while earning rewards."
          />
          <FeatureCard 
            icon={<FaRocket className="text-indigo-600" size={28} />}
            title="For Job Seekers"
            description="Discover exclusive referral opportunities or apply directly to company postings, increasing your chances of getting noticed."
          />
          <FeatureCard 
            icon={<FaCogs className="text-indigo-600" size={28} />}
            title="For Companies"
            description="Post jobs and tap into the trusted networks of real employees to find the best-fit candidates faster."
          />
        </div>
      </div>
      
      <div className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* <div className="md:w-1/2">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80" />
          </div> */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded with a vision to bridge the gap between talented job seekers and employee referrers, Refrll is designed to remove friction from traditional referrals. 
            </p>
            <p className="text-gray-700">
              No more chasing connections or missing out on roles – we make the process seamless for everyone involved.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Our Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaLightbulb className="text-yellow-500 mr-2" /> Modern Tech Stack
            </h3>
            <p className="text-gray-700 mb-4">
              Built with the latest MERN stack, scalable backend patterns, and clean user-first design, Refrll ensures a smooth, fast, and secure experience.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <span>Real-time application updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <span>Role-based dashboards</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <span>Resume and profile management</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔️</span>
                <span>Smart referral claiming and job cloning</span>
              </li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Join the Refrll Community</h3>
            <p className="text-gray-700 mb-6">
              Whether you're a job seeker looking for your next role, a referrer who wants to help others grow, or a company seeking the best talent – Refrll is here to empower your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300" onClick={()=>navigate("/signup")}>
                Sign Up 
              </button>
              {/* <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-6 rounded-lg transition duration-300">
                Post a Job
              </button> */}
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Passionate professionals dedicated to transforming the job referral landscape
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <TeamMember 
            name="Alex Johnson"
            role="Founder & CEO"
            bio="10+ years in HR tech"
          />
          <TeamMember 
            name="Maria Garcia"
            role="CTO"
            bio="Full stack expert"
          />
          <TeamMember 
            name="David Kim"
            role="Product Lead"
            bio="UX specialist"
          />
          <TeamMember 
            name="Sarah Chen"
            role="Growth Manager"
            bio="Talent acquisition"
          />
        </div>
      </div> */}
    </div>
  );
};

export default AboutPage;