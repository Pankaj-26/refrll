// src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { FaRocket, FaUserFriends, FaSearch, FaBell, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {

 useEffect(() => {
    document.title = "Refrll – Get Job Referrals Fast and Get Hired";

    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Refrll connects job seekers with referrers to get referred to top companies easily.";
    document.head.appendChild(metaDescription);

    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Refrll – Get Job Referrals Fast and Get Hired";
    document.head.appendChild(ogTitle);

    const ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.content = "Refrll connects job seekers with referrers to get referred to top companies easily.";
    document.head.appendChild(ogDesc);

    const ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = "https://yourdomain.com/preview.png"; // your logo or preview image url
    document.head.appendChild(ogImage);

    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = "https://yourdomain.com";
    document.head.appendChild(ogUrl);

    const twitterCard = document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.content = "summary_large_image";
    document.head.appendChild(twitterCard);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(ogTitle);
      document.head.removeChild(ogDesc);
      document.head.removeChild(ogImage);
      document.head.removeChild(ogUrl);
      document.head.removeChild(twitterCard);
    };
  }, []);


  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Empowering Referrals, <span className="text-indigo-600">Empowering Careers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Refrll connects job seekers, referrers, and companies to make hiring faster, simpler, and more human.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-center"
                >
                  Get Started Now
                </Link>
                <Link 
                  to="/company" 
                  className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg shadow-sm transition duration-300 text-center"
                >
                  For Companies – Post a Job
                </Link>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">1,500+ professionals</span> joined last week
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-600 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-4 bg-gray-800 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-300 font-medium">
                      Refrll Dashboard
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="text-indigo-600 font-semibold">Referrers</div>
                        <div className="text-2xl font-bold">12,542</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="text-indigo-600 font-semibold">Seekers</div>
                        <div className="text-2xl font-bold">28,367</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="text-indigo-600 font-semibold">Companies</div>
                        <div className="text-2xl font-bold">1,204</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm opacity-80">New Referral Opportunity</div>
                          <div className="font-bold text-lg">Senior Product Designer</div>
                        </div>
                        <div className="bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                          $1,500 Reward
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-medium">Your Applications</div>
                        <div className="text-sm text-indigo-600">View All</div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                            <div>
                              <div className="font-medium">UX Researcher</div>
                              <div className="text-sm text-gray-600">TechCorp Inc.</div>
                            </div>
                          </div>
                          <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            In Review
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                            <div>
                              <div className="font-medium">Frontend Developer</div>
                              <div className="text-sm text-gray-600">InnovateCo</div>
                            </div>
                          </div>
                          <div className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                            Interview
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Refrll Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process connects talent with opportunity through trusted referrals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <FaUserFriends className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Post or Claim Jobs</h3>
              <p className="text-gray-600 mb-4">
                Referrers can post jobs or claim company jobs to refer seekers easily.
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">Create your profile in minutes</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">Browse available referral opportunities</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <FaSearch className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Apply Effortlessly</h3>
              <p className="text-gray-600 mb-4">
                Job seekers apply via referral or company postings to boost visibility.
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">One-click application process</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">Personalized job recommendations</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6">
                <FaRocket className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Hire Faster</h3>
              <p className="text-gray-600 mb-4">
                Companies access a pool of trusted, referred candidates to find the best fit.
              </p>
              <div className="mt-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">AI-powered candidate matching</div>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div className="text-sm text-gray-700">Streamlined interview scheduling</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Join thousands who found their dream job through referrals
              </h3>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8x</div>
                  <div className="text-indigo-200">Higher interview rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">63%</div>
                  <div className="text-indigo-200">Faster hiring process</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">89%</div>
                  <div className="text-indigo-200">Higher retention rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Refrll?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're transforming the hiring experience for everyone involved
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaUserFriends className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Referral Claiming System</h3>
                  <p className="text-gray-600">
                    Claim and refer jobs seamlessly to help your network grow and earn rewards.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaSearch className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Company Postings</h3>
                  <p className="text-gray-600">
                    Access official job postings from verified companies with transparent application processes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaBell className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Updates</h3>
                  <p className="text-gray-600">
                    Stay informed with instant application and status updates throughout the hiring process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaFileAlt className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Resume Upload</h3>
                  <p className="text-gray-600">
                    Upload resumes securely and apply in just a few clicks with our streamlined process.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & User-First Design</h3>
                  <p className="text-gray-600">
                    Built with robust security and a clean interface for smooth, intuitive usage.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <FaRocket className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Matching Algorithm</h3>
                  <p className="text-gray-600">
                    Our AI connects you with the most relevant opportunities based on your profile and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
                <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-64" />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-6">
                  At Refrll, we believe that great opportunities are best shared. Our mission is to make hiring more efficient, transparent, and human by empowering referrals and empowering careers.
                </p>
                <p className="text-gray-600 mb-8">
                  Founded by industry veterans who saw the inefficiencies in traditional hiring, Refrll bridges the gap between talent and opportunity through trusted connections. We're committed to creating a platform that benefits everyone in the hiring ecosystem.
                </p>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  Learn More About Us
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from those who transformed their careers with Refrll
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Product Designer at TechInnovate</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Through Refrll, I connected with a referrer who believed in my skills. Within two weeks of applying, I had three interviews and landed my dream role with a 30% salary increase."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Senior Developer at FutureTech</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a referrer, I've helped five talented developers find great positions. The process is so smooth, and I've earned over $7,500 in referral rewards in just six months."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 mr-4" />
                <div>
                  <h4 className="font-bold text-gray-900">Alexis Rodriguez</h4>
                  <p className="text-sm text-gray-600">HR Director at GrowthStartups</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Refrll has transformed our hiring. We filled 12 critical positions in 3 months through employee referrals, reducing our time-to-hire by 65% and improving retention."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your career or hire faster?
          </h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals and companies who are already benefiting from the power of trusted referrals
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 text-lg"
            >
              Join Refrll Today
            </Link>
            <Link 
              to="/company" 
              className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 text-lg"
            >
              For Companies
            </Link>
          </div>
          <div className="mt-8 text-indigo-200">
            <p>No credit card required • currently free for job seekers</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;