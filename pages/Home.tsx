import React from "react";

const Home: React.FC = () => {
  return (
    <div className="font-sans">

      {/* HERO SECTION */}
      <section className="min-h-[80vh] bg-slate-900 text-white flex items-center px-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Global Scale. <br />
            <span className="text-amber-500 italic">Seamless</span> Logistics.
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-2xl">
            SGG Export connects premium manufacturers with global markets.
            Reliable sourcing, transparent trade, and worldwide delivery.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="#/rfq"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-3 rounded-md transition"
            >
              START RFQ
            </a>

            <a
              href="#/products"
              className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition"
            >
              VIEW PRODUCTS
            </a>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-slate-100">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-3xl font-bold">45+</h2>
            <p className="text-slate-600">Countries Served</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">1.2M</h2>
            <p className="text-slate-600">Annual Tonnage</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">250+</h2>
            <p className="text-slate-600">Verified Suppliers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">1500+</h2>
            <p className="text-slate-600">Global Clients</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-amber-500 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Expand Your Reach?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Partner with SGG Export for reliable global trade solutions and
          end-to-end logistics excellence.
        </p>

        <a
          href="#/contact"
          className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition"
        >
          CONTACT US
        </a>
      </section>

    </div>
  );
};

export default Home;
