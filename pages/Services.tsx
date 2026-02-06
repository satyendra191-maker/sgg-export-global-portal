
import React from 'react';

const Services: React.FC = () => {
  const serviceList = [
    {
      title: 'Ocean & Sea Freight',
      desc: 'Full Container Load (FCL) and Less than Container Load (LCL) solutions across major global trade lanes.',
      icon: 'fa-ship',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Air Cargo Express',
      desc: 'Time-sensitive logistics for high-value commodities with door-to-door tracking and priority handling.',
      icon: 'fa-plane-departure',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Customs Brokerage',
      desc: 'Expert handling of documentation, compliance, and duty optimization for seamless border crossing.',
      icon: 'fa-file-signature',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Quality Inspection',
      desc: 'Third-party SGS and Bureau Veritas auditing to ensure your cargo meets international standards.',
      icon: 'fa-check-double',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20"
            alt="Logistics Hub"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold brand-font mb-6 italic">Global Solutions</h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">
            SGG provides a vertically integrated supply chain, managing everything from the factory floor to the final destination port.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {serviceList.map((service, i) => (
            <div key={i} className="flex gap-6 group">
              <div className={`w-20 h-20 rounded-3xl shrink-0 flex items-center justify-center text-3xl transition-transform group-hover:rotate-12 ${service.color}`}>
                <i className={`fas ${service.icon}`}></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.desc}
                </p>
                <button className="mt-4 text-amber-600 font-bold text-sm hover:underline">LEARN MORE <i className="fas fa-arrow-right ml-1"></i></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 italic brand-font">Our Logistics Ecosystem</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             {/* Mock Partner Logos */}
             <div className="text-2xl font-black text-slate-400 italic">MAERSK</div>
             <div className="text-2xl font-black text-slate-400 italic">MSC</div>
             <div className="text-2xl font-black text-slate-400 italic">FEDEX</div>
             <div className="text-2xl font-black text-slate-400 italic">DHL</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
