import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <a href="#/" className="text-2xl font-bold text-slate-900">
          SGG<span className="text-amber-500">Export</span>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-8 font-semibold text-slate-900">
          <a href="#/" className="hover:text-amber-600">Home</a>
          <a href="#/products" className="hover:text-amber-600">Products</a>
          <a href="#/services" className="hover:text-amber-600">Services</a>
          <a href="#/about" className="hover:text-amber-600">About</a>
          <a href="#/contact" className="hover:text-amber-600">Contact</a>
        </nav>

        {/* DESKTOP RFQ */}
        <a
          href="#/rfq"
          className="hidden md:inline-block bg-amber-500 text-black px-5 py-2 rounded-md font-bold hover:bg-amber-600 transition"
        >
          RFQ
        </a>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col p-6 gap-4 font-semibold text-slate-900">
            <a href="#/" onClick={() => setOpen(false)}>Home</a>
            <a href="#/products" onClick={() => setOpen(false)}>Products</a>
            <a href="#/services" onClick={() => setOpen(false)}>Services</a>
            <a href="#/about" onClick={() => setOpen(false)}>About</a>
            <a href="#/contact" onClick={() => setOpen(false)}>Contact</a>

            <a
              href="#/rfq"
              onClick={() => setOpen(false)}
              className="mt-4 bg-amber-500 text-black px-4 py-3 rounded-md text-center font-bold"
            >
              REQUEST RFQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
