
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="grid lg:grid-cols-2">
        {/* Left Side: Form */}
        <div className="p-12 lg:p-24 bg-slate-50 flex items-center justify-center">
          <div className="max-w-md w-full">
            <h1 className="text-4xl font-bold italic brand-font mb-4">Global Network</h1>
            <p className="text-slate-500 mb-10">
              Have a specific trade inquiry? Reach out to our regional desks for tailored assistance.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Subject of Inquiry</label>
                <select className="w-full bg-white border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-amber-500 outline-none appearance-none">
                  <option>General Export Inquiry</option>
                  <option>Shipment Tracking</option>
                  <option>Logistics Partnership</option>
                  <option>Supplier Verification</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500" />
                <input type="text" placeholder="Last Name" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <input type="email" placeholder="Corporate Email" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500" />
              <textarea rows={4} placeholder="Your Message" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500 resize-none"></textarea>
              <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-xl hover:bg-black transition-all shadow-xl">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Locations */}
        <div className="p-12 lg:p-24 flex flex-col justify-center">
          <div className="space-y-12">
            <div>
              <div className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mb-4">Headquarters</div>
              <h3 className="text-2xl font-bold mb-4">Mumbai, India</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Level 12, Trade Tower BKC,<br />
                Bandra Kurla Complex, Mumbai 400051<br />
                Tel: +91 22 4500 8900
              </p>
            </div>

            <div>
              <div className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mb-4">Logistics Hub</div>
              <h3 className="text-2xl font-bold mb-4">Singapore</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                8 Temasek Boulevard,<br />
                Suntec Tower Three, Singapore 038988<br />
                Tel: +65 6800 1200
              </p>
            </div>

            <div>
              <div className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mb-4">European Office</div>
              <h3 className="text-2xl font-bold mb-4">London, UK</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                25 Old Broad Street,<br />
                City of London, EC2N 1HQ<br />
                Tel: +44 20 7946 0000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
