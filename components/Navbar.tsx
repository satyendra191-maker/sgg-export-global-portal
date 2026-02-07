export default function Navbar() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-slate-900">SGG Export</h1>

        <nav className="flex gap-6 font-semibold text-slate-800">
          <a href="#/" className="hover:text-amber-600">Home</a>
          <a href="#/products" className="hover:text-amber-600">Products</a>
          <a href="#/services" className="hover:text-amber-600">Services</a>
          <a href="#/about" className="hover:text-amber-600">About</a>
          <a href="#/contact" className="hover:text-amber-600">Contact</a>
          <a
            href="#/rfq"
            className="bg-amber-500 text-black px-4 py-1 rounded hover:bg-amber-600"
          >
            RFQ
          </a>
        </nav>
      </div>
    </header>
  );
}
