import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Network from './pages/Network';
import News from './pages/News';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Admin from './pages/Admin';

import Resources from './pages/Resources';
import NewsReader from './pages/NewsReader';
import PartnerPortal from './pages/PartnerPortal';
import JoiningProcess from './pages/JoiningProcess';
import Gallery from './pages/Gallery';

import Organization from './pages/Organization';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/network" element={<Network />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsReader />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/partner-portal" element={<PartnerPortal />} />
          <Route path="/join" element={<JoiningProcess />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/cceabtadmin" element={<Admin />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
