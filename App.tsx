import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RFQ from "./pages/RFQ";

export default function App() {
  const [path, setPath] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderPage = () => {
    switch (path) {
      case "#/":
        return <Home />;
      case "#/products":
        return <Products />;
      case "#/services":
        return <Services />;
      case "#/about":
        return <About />;
      case "#/contact":
        return <Contact />;
      case "#/rfq":
        return <RFQ />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}
