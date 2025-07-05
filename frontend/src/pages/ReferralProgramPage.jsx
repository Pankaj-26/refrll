// src/App.js
import React, { useState } from 'react';
import { FaHandshake, FaLightbulb, FaRocket, FaComments, FaUsers, FaAward, FaNetworkWired, FaUserShield, FaSyncAlt, FaBolt } from 'react-icons/fa';

function ReferralProgramPage() {
  const [activeFaq, setActiveFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">What is a Referral Program?</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">Learn how Refrll helps you get referred by employees to land jobs faster and easier.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#how-it-works" className="border-2  border-white  text-primary font-bold py-3 px-8 rounded-full text-center hover:bg-gray-400 transition duration-300">How It Works</a>
              <a href="#benefits" className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-center hover:bg-gray-400 transition duration-300">See Benefits</a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
              <div className="absolute top-10 -right-6 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-6 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              <div className="relative z-10 rounded-2xl shadow-2xl w-full max-w-md h-64 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <FaHandshake className="text-white text-8xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-100 text-primary rounded-full px-4 py-1 mb-4">
            <FaHandshake className="inline mr-2" />Get Connected
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">The Power of Professional Connections</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            A referral program connects job seekers with employees (referrers) who can recommend them for open roles in their companies. This increases your chances of being noticed and getting hired faster.
          </p>
          <div className="flex justify-center">
            <div className="flex items-center bg-green-100 text-green-800 rounded-xl p-4 max-w-md">
              <FaLightbulb className="text-2xl mr-3" />
              <p className="font-medium">Getting referred makes you 4x more likely to land an interview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Referrals Matter */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Referrals Matter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">80%</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">of Jobs</h3>
              <p className="text-gray-600">are filled through referrals, making it the most effective way to get hired.</p>
            </div>
            
            <div className="stat-card bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500  rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRocket className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">4x More Likely</h3>
              <p className="text-gray-600">Referred candidates are 4x more likely to get hired than other applicants.</p>
            </div>
            
            <div className="stat-card bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500  rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Instant Trust</h3>
              <p className="text-gray-600">Referrals build trust with companies instantly through employee validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Refrll Works</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Our simple 4-step process to get you referred and hired faster</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="step-card bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <div className="text-5xl text-primary mb-6 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Jobs</h3>
              <p className="text-gray-600">Explore opportunities posted by companies and verified referrers.</p>
            </div>
            
            <div className="step-card bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <div className="text-5xl text-primary mb-6 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Apply for Referral</h3>
              <p className="text-gray-600">Submit your resume and details for the role you want.</p>
            </div>
            
            <div className="step-card bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <div className="text-5xl text-primary mb-6 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Reviewed</h3>
              <p className="text-gray-600">Referrers evaluate your profile and submit recommendations.</p>
            </div>
            
            <div className="step-card bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="gradient-bg w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <div className="text-5xl text-primary mb-6 flex justify-center">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Land the Job</h3>
              <p className="text-gray-600">Get noticed faster and track your application status in real-time.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-full max-w-4xl h-64 rounded-2xl shadow-xl flex items-center justify-center">
              <div className="text-white text-center px-8">
                <h3 className="text-2xl font-bold mb-4">The Referral Advantage</h3>
                <p className="text-xl">Join thousands who have accelerated their career through referrals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Benefits for Everyone</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-primary">For Job Seekers</h3>
              <div className="space-y-6">
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-primary rounded-full p-3 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Increased Visibility</h4>
                      <p className="text-gray-600">Stand out to internal employees and hiring managers.</p>
                    </div>
                  </div>
                </div>
                
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-primary rounded-full p-3 mr-4">
                      <FaRocket className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Faster Shortlisting</h4>
                      <p className="text-gray-600">Jump to the front of the line compared to direct applications.</p>
                    </div>
                  </div>
                </div>
                
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-primary rounded-full p-3 mr-4">
                      <FaComments className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Personalized Guidance</h4>
                      <p className="text-gray-600">Get insider advice and support from your referrer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 text-secondary">For Referrers</h3>
              <div className="space-y-6">
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-secondary rounded-full p-3 mr-4">
                      <FaUsers className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Help Talent Shine</h4>
                      <p className="text-gray-600">Connect great people with great opportunities at your company.</p>
                    </div>
                  </div>
                </div>
                
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-secondary rounded-full p-3 mr-4">
                      <FaAward className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Earn Rewards</h4>
                      <p className="text-gray-600">Get bonuses and recognition through your company's referral program.</p>
                    </div>
                  </div>
                </div>
                
                <div className="benefit-card bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start">
                    <div className="bg-purple-100 text-secondary rounded-full p-3 mr-4">
                      <FaNetworkWired className="text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-lg mb-2">Build Your Network</h4>
                      <p className="text-gray-600">Expand your professional connections and influence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-40 h-40 flex items-center justify-center">
                  <FaAward className="text-white text-5xl" />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">Referrers Earn Up To $5,000 Per Successful Hire</h3>
                <p className="text-gray-600 mb-4">Many companies offer substantial referral bonuses to employees who recommend great candidates. The exact amount varies by company and role.</p>
                <a href="#" className="inline-block gradient-bg text-white font-bold py-3 px-6 rounded-full hover:opacity-90 transition duration-300">Become a Referrer</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Refrll */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Refrll for Referrals?</h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">Our platform is designed to make the referral process seamless and effective for everyone</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <FaUserShield className="text-4xl text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Verified Referrers</h3>
              <p className="text-gray-600">All referrers are vetted employees at their companies</p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-2xl">
              <FaSyncAlt className="text-4xl text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">Monitor your application status every step of the way</p>
            </div>
            
            <div className="p-6 bg-blue-50 rounded-2xl">
              <FaBolt className="text-4xl text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Seamless Process</h3>
              <p className="text-gray-600">Simple, intuitive application with minimal effort</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-1 inline-block max-w-2xl">
            <div className="bg-white rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="gradient-bg rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Join Our Growing Community</h3>
                  <p className="text-gray-600">Over 50,000 professionals have found opportunities through Refrll referrals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item p-6 cursor-pointer ${index < faqData.length - 1 ? 'border-b border-gray-200' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <span className="text-primary">
                    {activeFaq === index ? '-' : '+'}
                  </span>
                </div>
                {activeFaq === index && (
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join thousands who have accelerated their job search with Refrll referrals</p>
          
          <div className="animate-pulse inline-block">
            <a href="#" className="bg-white text-primary font-bold py-4 px-12 rounded-full text-lg hover:bg-gray-100 transition duration-300 inline-block">
              Get Started Now
              <svg className="w-4 h-4 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          {/* <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-4 text-left">
                  <p className="text-white font-medium">Sarah K.</p>
                  <p className="text-blue-100 text-sm">Hired at Google</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-4 text-left">
                  <p className="text-white font-medium">Michael T.</p>
                  <p className="text-blue-100 text-sm">Hired at Microsoft</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-4 text-left">
                  <p className="text-white font-medium">Priya M.</p>
                  <p className="text-blue-100 text-sm">Hired at Amazon</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

// FAQ data
const faqData = [
  {
    question: "Is it free to get referrals on Refrll?",
    answer: "Yes, Refrll is completely free for job seekers. We believe everyone should have equal access to opportunities regardless of their financial situation."
  },
  {
    question: "How do I know if a referrer is genuine?",
    answer: "All referrers on our platform are verified employees at their companies. We confirm their employment status through multiple verification steps before they can refer candidates."
  },
  {
    question: "Can companies see my application status?",
    answer: "Companies only see your application after a referrer has submitted your profile. You maintain full control over who sees your information and when."
  },
  {
    question: "How long does the referral process take?",
    answer: "Most referrers respond within 3-5 business days. If you haven't heard back within a week, you can apply to other referrers for the same position."
  },
  {
    question: "What if I don't get selected after referral?",
    answer: "Even if you're not selected for one position, your profile remains in our system. Referrers may recommend you for other suitable opportunities in the future."
  }
];

// Add custom styles to index.css
export default ReferralProgramPage;