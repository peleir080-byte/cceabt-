import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DonationModal from './DonationModal';
import { AnimatePresence } from 'framer-motion';

export default function Footer() {
  const { i18n, t } = useTranslation();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const quickLinks = [
    { name: t('header.home'), path: '/' },
    { name: t('header.about'), path: '/about' },
    { name: t('header.network'), path: '/network' },
    { name: t('header.news'), path: '/news' },
    { name: t('header.contact'), path: '/contact' },
    { name: t('header.portal'), path: '/partner-portal' },
  ];

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <footer className="bg-blue-800 text-white w-full">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img
                src="/images/logo CCEABT.png"
                alt="Logo CCEABT"
                className="h-16 w-auto mb-4 bg-white rounded-lg p-1"
              />
              <h3 className="text-xl font-bold mb-1">CCEABT</h3>
              <p className="text-xs font-semibold text-blue-200 mb-4 italic leading-tight">{t('footer.full_name')}</p>
              <p className="text-gray-200 text-sm">
                {t('footer.network_desc')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={scrollToTop}
                      className="text-sm text-gray-200 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('header.contact')}</h4>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-200">
                  <p>{t('footer.address')}</p>
                  <p className="mt-1 font-semibold italic">260 BP 478 Kpalimé - Togo</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <div className="text-sm text-gray-200">
                  <a href="mailto:cceabt2013@gmail.com" className="hover:text-white block">cceabt2013@gmail.com</a>
                  <a href="mailto:info.cceabt@gmail.com" className="hover:text-white block">info.cceabt@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-200">
                  <p>(228) 70 88 88 74</p>
                  <p>91 12 61 60</p>
                  <p>22 55 81 64</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.follow_us')}</h4>
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://facebook.com/CCEABT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://linkedin.com/company/cceabt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </a>
              </div>
              <div className="space-y-2">
                <Link
                  to="/join"
                  onClick={scrollToTop}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors text-center"
                >
                  {t('footer.join_network')}
                </Link>
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors text-center"
                >
                  {t('footer.make_donation')}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8">
            <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm text-gray-200">
              <Link to="/legal" onClick={scrollToTop} className="hover:text-white">{t('footer.legal_mentions')}</Link>
              <span>•</span>
              <Link to="/privacy" onClick={scrollToTop} className="hover:text-white">{t('footer.privacy_policy')}</Link>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => i18n.changeLanguage('fr')}
                className={`text-sm font-semibold transition-colors ${i18n.language === 'fr' ? 'text-white underline' : 'text-gray-400 hover:text-white'}`}
              >
                FR
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`text-sm font-semibold transition-colors ${i18n.language === 'en' ? 'text-white underline' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            <p className="text-sm text-gray-200 text-center">
              © {new Date().getFullYear()} CCEABT - {t('footer.all_rights_reserved')}
            </p>
          </div>
        </div>
      </footer>
      {/* Donation Modal */}
      <AnimatePresence>
        {isDonationModalOpen && (
          <DonationModal onClose={() => setIsDonationModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
