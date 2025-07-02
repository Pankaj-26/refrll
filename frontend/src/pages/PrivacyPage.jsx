// src/pages/PrivacyPolicy.jsx
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600">Effective Date: July 1, 2023</p>
      </div>
      
      <div className="prose prose-indigo max-w-none bg-white p-8 rounded-xl shadow-sm">
        <p className="lead">
          At Refrll, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you use our referral platform.
        </p>
        
        <h2>1. Information We Collect</h2>
        
        <h3>Personal Data</h3>
        <p>
          We collect personally identifiable information that you voluntarily provide to us when you 
          register on the platform, express an interest in obtaining information about us or our products 
          and services, or otherwise when you contact us.
        </p>
        <p>The personal information we collect may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Job title and employment history</li>
          <li>Resume/CV information</li>
          <li>Company information</li>
        </ul>
        
        <h3>Usage Data</h3>
        <p>
          We automatically collect certain information when you visit, use, or navigate the platform. 
          This information does not reveal your specific identity but may include:
        </p>
        <ul>
          <li>IP address and device characteristics</li>
          <li>Browser and device type</li>
          <li>Operating system</li>
          <li>Referring URLs</li>
          <li>Pages viewed and time spent</li>
          <li>Search terms used</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use personal information collected via our platform for various business purposes:</p>
        <ul>
          <li>To facilitate account creation and authentication</li>
          <li>To deliver and facilitate delivery of services</li>
          <li>To manage user accounts</li>
          <li>To send administrative information</li>
          <li>To respond to user inquiries</li>
          <li>To send marketing communications</li>
          <li>To improve our platform and user experience</li>
          <li>For business transfers in case of merger or acquisition</li>
        </ul>
        
        <h2>3. Sharing Your Information</h2>
        <p>We may share information in specific situations:</p>
        <ul>
          <li>
            <strong>With Other Users:</strong> When you submit a job application through our platform, 
            your profile information will be shared with the referrer and hiring company.
          </li>
          <li>
            <strong>With Service Providers:</strong> We may share your data with third-party vendors, 
            service providers, or agents who perform services for us.
          </li>
          <li>
            <strong>Business Transfers:</strong> We may share or transfer your information in connection 
            with, or during negotiations of, any merger, sale of company assets, financing, or acquisition 
            of all or a portion of our business to another company.
          </li>
        </ul>
        
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures designed to protect the 
          security of any personal information we process. However, please remember that no method of 
          transmission over the Internet, or method of electronic storage is 100% secure.
        </p>
        
        <h2>5. Your Privacy Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul>
          <li>Request access to your personal information</li>
          <li>Request correction of inaccurate personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of marketing communications</li>
        </ul>
        <p>
          To exercise these rights, please contact us at privacy@refrll.com.
        </p>
        
        <h2>6. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be indicated by an 
          updated "Effective Date" and will be effective as soon as it is accessible.
        </p>
        
        <h2>7. Contact Us</h2>
        <p>
          If you have questions or comments about this policy, you may email us at privacy@refrll.com or 
          contact us by post at:
        </p>
        <address className="not-italic">
          Refrll Inc.<br />
          123 Innovation Drive<br />
          San Francisco, CA 94107<br />
          United States
        </address>
      </div>
    </div>
  );
};

export default PrivacyPolicy;