// import { FiLinkedin, FiTwitter, FiInstagram, FiMail, FiGithub } from "react-icons/fi";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-16">
//       <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Refrll</h3>
//             <p className="text-sm">Connecting talent with hidden opportunities through trusted referrals.</p>
//           </div>

//  <div>
//           <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li><a href="/jobs" className="hover:underline">Jobs</a></li>
//             <li><a href="/referrals" className="hover:underline">Referrals</a></li>
//             <li><a href="/about" className="hover:underline">About Us</a></li>
//             <li><a href="/contact" className="hover:underline">Contact</a></li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
//           <div className="flex space-x-4">
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <FiLinkedin className="w-6 h-6 hover:text-gray-300" />
//             </a>
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//               <FiGithub className="w-6 h-6 hover:text-gray-300" />
//             </a>
//             <a href="mailto:support@refrll.com">
//               <FiMail className="w-6 h-6 hover:text-gray-300" />
//             </a>
//           </div>
//         </div>

//         </div>

//         <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
//           &copy; {new Date().getFullYear()} Refrll. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";

// export default function Footer() {
//   const footerRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setVisible(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
//     if (footerRef.current) observer.observe(footerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <footer
//       ref={footerRef}
//       className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-10 px-6 transition-all duration-1000 ease-out ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <h2 className="text-xl font-bold mb-4">Refrll</h2>
//           <p className="text-sm">
//             Empowering job seekers with trusted referrals and transparent applications.
//           </p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li><a href="/jobs" className="hover:underline">Jobs</a></li>
//             <li><a href="/referrals" className="hover:underline">Referrals</a></li>
//             <li><a href="/about" className="hover:underline">About Us</a></li>
//             <li><a href="/contact" className="hover:underline">Contact</a></li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Connect With Us</h2>
//           <div className="flex space-x-4">
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//               <FiLinkedin className="w-6 h-6 hover:text-gray-300" />
//             </a>
//             <a href="https://github.com" target="_blank" rel="noopener noreferrer">
//               <FiGithub className="w-6 h-6 hover:text-gray-300" />
//             </a>
//             <a href="mailto:support@refrll.com">
//               <FiMail className="w-6 h-6 hover:text-gray-300" />
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="mt-8 text-center text-xs text-gray-200">
//         © {new Date().getFullYear()} Refrll. All rights reserved.
//       </div>
//     </footer>
//   );
// }






// src/components/Footer.jsx
// import React from "react";
// import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";
// import Refrll from "../assets/Refrll.png";
// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center mb-4">
//               <img
//                 src={Refrll}
//                 alt="Refrll Logo"
//                 className=" h-14 w-auto object-contain cursor-pointer filter invert"
//               />
//             </div>
//             <p className="text-gray-400 mb-4">
//               Empowering referrals, empowering careers through trusted
//               connections.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaLinkedin size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaFacebook size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <FaGithub size={20} />
//               </a>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="/job/postings"
//                   className="text-gray-400 hover:text-white"
//                 >
//                   Browse Jobs
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/ReferralProgramPage"
//                   className="text-gray-400 hover:text-white"
//                 >
//                   Referral Program
//                 </a>
//               </li>
//               {/* <li><a href="#" className="text-gray-400 hover:text-white">Career Resources</a></li> */}
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   Success Stories
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-4">For Companies</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/post-job" className="text-gray-400 hover:text-white">
//                   Post a Job
//                 </a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   Pricing
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-4">Resources</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="/blog" className="text-gray-400 hover:text-white">
//                   Blog
//                 </a>
//               </li>
//               <li>
//                 <a href="/help" className="text-gray-400 hover:text-white">
//                   Help Center
//                 </a>
//               </li>
//               <li>
//                 <a href="/about" className="text-gray-400 hover:text-white">
//                   About
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-400">© 2023 Refrll. All rights reserved.</p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="/privacy" className="text-gray-400 hover:text-white">
//               Privacy Policy
//             </a>
//             <a href="/terms" className="text-gray-400 hover:text-white">
//               Terms of Service
//             </a>
//             {/* <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a> */}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from "react-icons/fa";
import Refrll from "../assets/Refrll.png";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={Refrll}
                alt="Refrll Logo"
                className=" h-14 w-auto object-contain cursor-pointer filter invert"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Empowering referrals, empowering careers through trusted
              connections.
            </p>
            
          </div>

           <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/job/postings" className="hover:underline">Jobs</a></li>
            <li><a href="/post-job" className="hover:underline">Post Job</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
             <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub size={20} />
              </a>
            </div>
 
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 Refrll. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            {/* <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
