// src/pages/BlogPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const blogPosts = [
    {
      id: 'how-to-maximize-referrals',
      title: 'How to Maximize Your Referral Success Rate',
      excerpt: 'Learn proven strategies to increase your referral acceptance rate and earn more rewards.',
      date: 'June 15, 2023',
      category: 'Referral Tips',
      readTime: '5 min read'
    },
    {
      id: 'ai-in-hiring',
      title: 'The Role of AI in Modern Hiring Practices',
      excerpt: 'Explore how artificial intelligence is transforming recruitment and what it means for job seekers.',
      date: 'June 3, 2023',
      category: 'Industry Insights',
      readTime: '8 min read'
    },
    {
      id: 'building-strong-profile',
      title: 'Building a Strong Profile That Attracts Referrers',
      excerpt: 'Craft a compelling profile that makes referrers want to recommend you to hiring managers.',
      date: 'May 22, 2023',
      category: 'Career Advice',
      readTime: '6 min read'
    },
    {
      id: 'referral-program-success',
      title: 'Creating a Successful Employee Referral Program',
      excerpt: 'Key elements companies need to implement an effective referral program that delivers results.',
      date: 'May 10, 2023',
      category: 'HR Strategies',
      readTime: '7 min read'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refrll Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Insights, tips, and industry trends to help you succeed in your career and hiring journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Get the latest career advice, hiring trends, and Refrll updates delivered to your inbox
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-indigo-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;