import { useState } from 'react';
import { ArrowRight, Droplet, Users, TrendingUp, Lightbulb, Sparkles, X, Megaphone, Droplets, GraduationCap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import { AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';
import ContactForm from '../components/ContactForm';
import DonationModal from '../components/DonationModal';
import PartnerScrollBand from '../components/PartnerScrollBand';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { news } = useData();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/back%20cceabt.jpeg'), url('/images/1.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(1.15) contrast(1.1) saturate(1.1)',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-10 animate-fade-in">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-base font-bold text-white">{t('home.slogan')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                {t('home.hero_title')}
              </span>
              <br />
              <span className="text-white">{t('home.hero_subtitle')}</span>
            </h1>

            <div className="flex flex-wrap gap-4 justify-center animate-fade-in mt-20" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => navigate('/join?type=member')}
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all border border-white/30 hover:scale-105"
              >
                {t('home.join_btn')} {/* Adhérer */}
              </button>
              <button
                onClick={() => navigate('/join?type=partner')}
                className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 shadow-lg flex items-center gap-2 hover:scale-105"
              >
                Devenir Partenaire
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105"
              >
                {t('home.donate_btn')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-4">
                <Lightbulb className="text-blue-600" size={28} />
                <span className="text-blue-600 font-semibold">{t('home.mission')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{t('home.who_are_we')}</h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-4xl mx-auto">
                {t('home.mission_desc').split('<1>').join('').split('</1>').join('')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-blue-600 hover:-translate-y-2">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Droplet className="text-blue-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform">{t('home.stat_water_title')}</h3>
                <p className="text-gray-700 font-medium">{t('home.stat_water_desc')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('home.stat_water_year')}</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-green-600 hover:-translate-y-2">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-green-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform">{t('home.stat_members_title')}</h3>
                <p className="text-gray-700 font-medium">{t('home.stat_members_desc')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('home.stat_members_extra')}</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-t-4 border-purple-600 hover:-translate-y-2">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-purple-600" size={40} />
                </div>
                <h3 className="text-5xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform">{t('home.stat_years_title')}</h3>
                <p className="text-gray-700 font-medium">{t('home.stat_years_desc')}</p>
                <p className="text-sm text-gray-500 mt-2">{t('home.stat_years_extra')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos axes d'action */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('home.action_axes')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.action_axes_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="group relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Megaphone size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('home.axis_1_title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">{t('home.axis_1_desc')}</p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-green-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Droplet size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('home.axis_2_title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">{t('home.axis_2_desc')}</p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Droplets size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('home.axis_3_title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">{t('home.axis_3_desc')}</p>
              </div>
            </div>

            <div className="group relative p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="bg-yellow-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('home.axis_4_title')}</h3>
                <p className="text-gray-700 leading-relaxed mb-2">{t('home.axis_4_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actualités récentes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('home.recent_news')}</h2>
            <p className="text-xl text-gray-600">{t('home.news_subtitle')}</p>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            {news.slice(0, 3).map((item, index) => {
              // Use translation keys if available for the first 3 items (matching mock data), otherwise fallback to item content
              const titleKey = `home.news_${index + 1}_title`;
              const descKey = `home.news_${index + 1}_desc`;

              // Use i18n.exists to strictly check if the translation key exists
              const displayTitle = i18n.exists(titleKey) ? t(titleKey) : item.title;
              const displayDesc = i18n.exists(descKey) ? t(descKey) : item.excerpt;

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="group bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-blue-600 text-white rounded-lg p-2">
                      <Award size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {displayTitle}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {displayDesc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/news')}
              className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {t('home.view_all_news')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Nos partenaires */}
      <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Décoration de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t('home.our_partners')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.partners_subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-20">
            {/* Organisations membres du Conseil d'administration */}
            <PartnerScrollBand
              partners={['PADI', 'Chaine de l\'espoir', 'FIADI', 'ODIAE', 'ADESCO', 'AJT', 'CDD']}
              title="Organisations membres du Conseil d'administration"
              icon={<Users className="text-blue-600" size={28} />}
              gradientFrom="from-blue-50"
              gradientTo="to-green-50"
              borderColor="border-blue-200"
              hoverColor="group-hover:text-blue-600"
              animationDuration="45s"
              partnerType="CA"
            />

            {/* Partenaires Techniques et Financiers (PTF) */}
            <PartnerScrollBand
              partners={['AESEN', 'AFD', 'UE', 'PSEAU', 'Coalition Eau', 'SWA', 'AAFEA', 'ENDWATERPOVERTY', 'Ambassade de France au Togo', 'GENDA Water Alliance', 'Plan International Togo', 'SEVES', 'CAWST']}
              title="Partenaires Techniques et Financiers (PTF)"
              icon={<TrendingUp className="text-yellow-600" size={28} />}
              gradientFrom="from-yellow-50"
              gradientTo="to-orange-50"
              borderColor="border-yellow-200"
              hoverColor="group-hover:text-yellow-600"
              animationDuration="50s"
              partnerType="PTF"
            />

            {/* Bouton pour voir tous les partenaires */}
            <div className="text-center pt-12">
              <button
                onClick={() => navigate('/partners')}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-blue-700 hover:via-blue-800 hover:to-green-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 transform"
              >
                <span>{t('home.view_all_members')}</span>
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            {t('home.cta_title')}
          </h2>

          <p className="text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
            {t('home.cta_subtitle')}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/network')}
              className="group bg-white text-blue-600 px-10 py-5 rounded-full font-bold hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 text-lg"
            >
              <span className="flex items-center gap-2">
                {t('home.join_btn')}
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-10 py-5 rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-110 text-lg"
            >
              {t('home.contact_us')}
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-blue-100 text-lg">
              <strong className="text-white">{t('home.every_drop_counts')}</strong> — {t('home.together_for_togo')}
            </p>
          </div>
        </div>
      </section>

      {/* Modal de contact */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-yellow-300 transition-colors"
              aria-label="Fermer le formulaire"
            >
              <X size={28} />
            </button>
            <ContactForm onClose={() => setIsContactModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Modal de don */}
      <AnimatePresence>
        {isDonationModalOpen && (
          <DonationModal onClose={() => setIsDonationModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
