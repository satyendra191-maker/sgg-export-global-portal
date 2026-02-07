import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

const App = () => {
  const [path, setPath] = useState(window.location.hash || "#/");

  useEffect(() => {
    if (!window.location.hash) window.location.hash = "#/";

    const onHashChange = () => setPath(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const renderPage = () => {
    switch (path) {
      case "#/about":
        return <About />;
      case "#/products":
        return <Products />;
      case "#/services":
        return <Services />;
      case "#/contact":
        return <Contact />;
      case "#/":
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1 }}>{renderPage()}</div>
      <Footer />
    </div>
  );
};

export default App;
