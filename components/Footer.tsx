
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-bold tracking-tighter brand-font text-amber-500">SGG</span>
              <span className="text-xl font-light tracking-widest">EXPORT</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Bridging the gap between global manufacturers and the world's leading brands. 
              SGG Export stands for Quality, Integrity, and Global Reach.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Global Hubs</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><i className="fas fa-map-marker-alt text-amber-500 mr-2"></i> Mumbai HQ, India</li>
              <li><i className="fas fa-map-marker-alt text-amber-500 mr-2"></i> Logistics Node, Singapore</li>
              <li><i className="fas fa-map-marker-alt text-amber-500 mr-2"></i> Sales Office, London UK</li>
              <li><i className="fas fa-map-marker-alt text-amber-500 mr-2"></i> Distribution, Dubai UAE</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Ocean & Air Freight</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customs Brokerage</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Factory Auditing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Supply Chain Finance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Updates</h4>
            <p className="text-sm text-slate-400 mb-4">Join our quarterly global logistics report.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-slate-800 border-none px-4 py-3 rounded-l-lg text-sm w-full focus:ring-1 focus:ring-amber-500 outline-none"
              />
              <button className="bg-amber-600 hover:bg-amber-700 px-4 py-3 rounded-r-lg">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2024 SGG Export India Private Limited. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Trade</a>
            <a href="#" className="hover:text-white">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
