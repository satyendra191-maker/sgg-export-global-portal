
import React from 'react';
import { MOCK_BLOGS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-20 px-6 mb-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold brand-font italic mb-4">Trade Insights</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Expert analysis on international markets, regulatory changes, and emerging export opportunities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {MOCK_BLOGS.map(post => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row hover:shadow-xl transition-all group">
              <div className="md:w-1/2 overflow-hidden h-64 md:h-auto">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-4">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 leading-tight group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <a href="#" className="text-slate-900 font-bold text-sm flex items-center space-x-2">
                  <span>Read full analysis</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
