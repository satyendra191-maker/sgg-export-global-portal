
import React from 'react';
import { MOCK_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1494412574743-0194849a60ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Global Logistics" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Global Scale. <br/>
              <span className="text-amber-500 italic">Seamless</span> Logistics.
            </h1>
            <p className="text-xl text-slate-300 mb-8 font-light max-w-xl">
              SGG Export bridges the gap between premium manufacturers and global markets. 
              Efficiency, transparency, and worldwide reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#/rfq" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-bold text-center transition-all transform hover:-translate-y-1 shadow-xl">
                START RFQ NOW
              </a>
              <a href="#/products" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-center transition-all">
                EXPLORE CATALOG
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Countries Served', value: '45+' },
              { label: 'Annual Tonnage', value: '1.2M' },
              { label: 'Verified Suppliers', value: '250+' },
              { label: 'Global Clients', value: '1,500+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - NEW */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 italic brand-font">The SGG Export Workflow</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Our vertically integrated process ensures every shipment meets international standards with precision and speed.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-10 translate-y-[-2rem]"></div>
            
            {[
              {
                step: '01',
                title: 'Strategic Inquiry',
                desc: 'Submit detailed requirements via our AI RFQ portal. Our system instantly classifies and initiates sourcing.',
                icon: 'fa-file-invoice'
              },
              {
                step: '02',
                title: 'AI Optimization',
                desc: 'Gemini-driven analysis matches your technical specs with verified manufacturers and optimal trade routes.',
                icon: 'fa-robot'
              },
              {
                step: '03',
                title: 'Verified Transit',
                desc: 'Goods undergo SGS/ISO auditing. We manage multi-modal logistics with real-time port-to-port visibility.',
                icon: 'fa-ship'
              },
              {
                step: '04',
                title: 'Final Delivery',
                desc: 'Seamless customs clearance and last-mile distribution to your destination warehouse or port.',
                icon: 'fa-box-open'
              }
            ].map((item, i) => (
              <div key={i} className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-2">
                <div className="absolute -top-4 left-8 bg-amber-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-lg">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors shadow-lg">
                  <i className={`fas ${item.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Our Core Commodities</h2>
            <div className="w-24 h-1 bg-amber-500"></div>
          </div>
          <a href="#/products" className="text-amber-600 font-bold hover:underline mt-4 md:mt-0">View Full Catalog <i className="fas fa-arrow-right ml-2"></i></a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => (
            <div key={product.id} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="h-64 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded text-white text-xs uppercase tracking-tighter">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-400">Min Order: <span className="text-slate-900 font-semibold">{product.minOrder}</span></span>
                  <a href="#/rfq" className="text-amber-600 hover:text-amber-700 font-bold text-sm">ENQUIRE</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-600 py-20">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Expand Your Reach?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join hundreds of global partners who trust SGG Export for their supply chain requirements.
          </p>
          <a href="#/booking" className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl">
            Book a Strategy Call
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
