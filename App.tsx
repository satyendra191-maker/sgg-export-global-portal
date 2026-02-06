
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import About from './pages/About';
import RFQ from './pages/RFQ';
import Admin from './pages/Admin';
import Products from './pages/Products';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const base = currentPath.split('?')[0];
    switch (base) {
      case '#/': return <Home />;
      case '#/about': return <About />;
      case '#/products': return <Products />;
      case '#/services': return <Services />;
      case '#/blog': return <Blog />;
      case '#/rfq': return <RFQ />;
      case '#/contact': return <Contact />;
      case '#/admin': return <Admin />;
      default: return <Home />;
    }
  };

  const isAdmin = currentPath.startsWith('#/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAdmin && <Footer />}
      <AIChatbot />
    </div>
  );
};

export default App;
