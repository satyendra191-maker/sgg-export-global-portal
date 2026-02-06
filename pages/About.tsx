
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate Strategy" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold brand-font mb-4 italic">Our Heritage</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            Founded on the principles of integrity and global excellence, SGG Export has evolved into a premier facilitator of worldwide trade.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6 brand-font border-l-4 border-amber-500 pl-6">Our Mission</h2>
                <p className="text-slate-600 text-lg leading-relaxed italic">
                  "To revolutionize the global supply chain by integrating cutting-edge AI technology with time-honored manufacturing expertise, ensuring quality and transparency in every shipment."
                </p>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6 brand-font border-l-4 border-amber-500 pl-6">Our Vision</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We aim to be the world's most trusted gateway for international commodity trade, empowering businesses to reach new markets through seamless, verified, and sustainable logistics.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1000" 
                alt="Handshake Agreement" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-slate-900 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold brand-font italic">Values That Drive Us</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            {
              title: 'Integrity',
              desc: 'Unwavering commitment to honesty and transparency in all trade relations.',
              icon: 'fa-shield-halved'
            },
            {
              title: 'Innovation',
              desc: 'Leveraging AI and smart logistics to optimize global supply chains.',
              icon: 'fa-lightbulb'
            },
            {
              title: 'Sustainability',
              desc: 'Promoting eco-friendly manufacturing and ethical sourcing practices.',
              icon: 'fa-leaf'
            },
            {
              title: 'Excellence',
              desc: 'Setting the highest standards for product quality and delivery speed.',
              icon: 'fa-award'
            }
          ].map((value, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center group">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto group-hover:bg-amber-600 transition-colors">
                <i className={`fas ${value.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center brand-font mb-16">Our Milestone Journey</h2>
            <div className="relative border-l-2 border-slate-100 ml-4 md:ml-0 md:border-none">
              {[
                { year: '2010', event: 'SGG Export founded with a focus on local agriculture trade.' },
                { year: '2015', event: 'Expansion into international markets with London and Singapore hubs.' },
                { year: '2020', event: 'Digital Transformation: Launched first AI-driven logistics tracker.' },
                { year: '2025', event: 'Global Hub status reached with 45+ countries in the active network.' }
              ].map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 text-center md:text-left px-8">
                    <div className={`font-bold text-2xl text-amber-600 mb-2 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>{m.year}</div>
                    <p className={`text-slate-600 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>{m.event}</p>
                  </div>
                  <div className="w-4 h-4 bg-slate-900 rounded-full border-4 border-white shadow-md relative z-10 my-4 md:my-0"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Call to Action */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 brand-font italic">Building the Future of Trade</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 font-light">
            Our team of trade experts, engineers, and logistics specialists is dedicated to your success. 
            Experience the SGG difference today.
          </p>
          <a href="#/contact" className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-2xl hover:-translate-y-1">
            Connect With Our Experts
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
