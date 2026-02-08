import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t('contact_page.hero_title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact_page.hero_desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start mb-20">
          {/* Formulaire -prend 2 colonnes sur large */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">{t('contact_page.send_message')}</h2>
            <ContactForm className="w-full" />
          </div>

          {/* Coordonnées détaillées */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-blue-200 transition-all group">
              <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact_page.national_office')}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('contact_page.address')}
              </p>
              <p className="mt-4 font-bold text-blue-700 italic bg-blue-50 p-3 rounded-xl inline-block">
                {t('contact_page.po_box')}
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-green-200 transition-all group">
              <div className="bg-green-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact_page.phone')}</h3>
              <div className="space-y-3">
                <a href="tel:+22870888874" className="text-lg text-gray-700 hover:text-green-600 block transition-colors font-medium">
                  (228) 70 88 88 74
                </a>
                <a href="tel:+22891126160" className="text-lg text-gray-700 hover:text-green-600 block transition-colors font-medium">
                  91 12 61 60
                </a>
                <a href="tel:+22822558164" className="text-lg text-gray-700 hover:text-green-600 block transition-colors font-medium">
                  22 55 81 64
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:border-purple-200 transition-all group">
              <div className="bg-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact_page.email')}</h3>
              <div className="space-y-3">
                <a href="mailto:cceabt2013@gmail.com" className="text-lg text-gray-700 hover:text-purple-600 block transition-colors font-medium break-all">
                  cceabt2013@gmail.com
                </a>
                <a href="mailto:info.cceabt@gmail.com" className="text-lg text-gray-700 hover:text-purple-600 block transition-colors font-medium break-all">
                  info.cceabt@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
