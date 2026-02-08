import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { name: t('header.home'), path: '/' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.network'), path: '/network' },
    { name: t('header.news'), path: '/news' },
    { name: t('header.contact'), path: '/contact' },
  ];

  /* 
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  */

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <img
                src="/images/logo CCEABT.png"
                alt="Logo CCEABT"
                className="h-20 w-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold text-cceabt-blue">CCEABT</h1>
              <p className="text-xs text-gray-600">{t('header.full_name')}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {location.pathname !== '/organization' && navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={scrollToTop}
                className={`relative font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${location.pathname === item.path
                  ? 'text-white bg-blue-700 shadow-lg'
                  : item.path === '/network'
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    : 'text-cceabt-blue hover:text-cceabt-green hover:bg-blue-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Si Organisation, bouton Quitter sinon Rejoindre */}
            {/* Si Organisation, bouton Quitter, sinon rien */}
            {location.pathname === '/organization' && (
              <Link
                to="/about"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-gray-500 transition-all duration-200 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-900 border border-gray-200"
              >
                Quitter l'organigramme
              </Link>
            )}

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all group font-bold text-sm text-blue-700"
              title="Changer de langue / Change language"
            >
              <Globe size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="uppercase">{i18n.language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
            <button
              className="lg:hidden text-cceabt-blue"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Masquer le menu hamburger sur la page Organisation */}
      {isMenuOpen && location.pathname !== '/organization' && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}
                className={`text-left font-medium transition-colors duration-200 ${location.pathname === item.path
                  ? 'text-cceabt-blue font-bold'
                  : 'text-cceabt-blue hover:text-cceabt-blue hover:text-glow-blue'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
