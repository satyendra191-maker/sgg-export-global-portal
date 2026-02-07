export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[85vh] bg-slate-900 text-white flex items-center">
        <img
          src="https://images.unsplash.com/photo-1494412574743-0194849a60ef?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Global Scale.{" "}
            <span className="text-amber-400">Seamless</span> Logistics.
          </h1>

          <p className="text-lg max-w-2xl mb-8">
            SGG Export connects manufacturers and global buyers through trusted
            sourcing, quality control, and international logistics.
          </p>

          <div className="flex gap-4">
            <a
              href="#/rfq"
              className="bg-amber-500 text-black px-6 py-3 font-bold rounded"
            >
              Start RFQ
            </a>
            <a
              href="#/products"
              className="border border-white px-6 py-3 rounded"
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      {/* APPLICATION AREAS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-2">Industrial Supply</h3>
            <p>Raw materials, machinery parts and industrial goods.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Global Trade</h3>
            <p>Import–export management with verified suppliers.</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Logistics</h3>
            <p>End-to-end shipping and customs handling.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
