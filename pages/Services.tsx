export default function Services() {
  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
            className="rounded mb-4"
          />
          <h3 className="font-bold text-xl">Global Sourcing</h3>
          <p>
            Verified manufacturers and quality-checked suppliers worldwide.
          </p>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            className="rounded mb-4"
          />
          <h3 className="font-bold text-xl">Logistics & Shipping</h3>
          <p>
            Sea, air and land logistics with customs and documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
