

import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";
import Refrll from "../assets/Refrll.png";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={Refrll}
                alt="Refrll Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Empowering referrals, empowering careers through trusted connections.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <ul className="space-y-3">
              <li><a href="/job/postings" className="text-gray-600 hover:text-blue-600 transition-colors">Jobs</a></li>
          
              <li><a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resources</h2>
            <ul className="space-y-3">
 
              <li><a href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQs</a></li>
             
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 Refrll. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;