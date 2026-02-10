export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        <a href="#/home" className="font-bold">Home</a>
        <a href="#/about">About</a>
        <a href="#/products">Products</a>
        <a href="#/services">Services</a>
        <a href="#/blog">Blog</a>
        <a href="#/contact">Contact</a>
        <a href="#/rfq">RFQ</a>
      </div>
    </nav>
  );
}
