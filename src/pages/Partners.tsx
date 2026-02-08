import { ExternalLink, Handshake, Globe, Users, Building2, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { getPartnerStatus } from '../utils/partnerStatus';

export default function Partners() {
  const { t } = useTranslation();
  const { partners } = useData();

  // Grouping partners and sorting alphabetically
  const internationalMembers = partners
    .filter(p => p.type === 'International');
  const nationalMembers = partners
    .filter(p => p.type === 'National')
    .sort((a, b) => a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }));
  const institutionalPartners = partners
    .filter(p => p.type === 'Institutionnel');
  // Filtrer uniquement les 13 PTF de la liste définitive (pas tous les Technique/Financier)
  const techFinPartners = partners
    .filter(p => getPartnerStatus(p.name) === 'PTF');

  const getTranslatedType = (type: string) => {
    switch (type) {
      case 'International': return t('network.type_international');
      case 'National': return t('network.type_national');
      case 'Institutionnel': return t('network.type_institutional');
      case 'Technique': return t('network.type_technical');
      case 'Financier': return t('network.type_financial');
      default: return type;
    }
  };

  const PartnerSection = ({ title, subtitle, icon: Icon, colorClass, data }: any) => {
    if (data.length === 0) return null;
    return (
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className={`${colorClass} p-3 rounded-2xl text-white shadow-lg`}>
            <Icon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((partner: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {partner.logo && (
                      <div className="mb-4 h-16 flex items-center justify-start">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-[150px] object-contain"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {partner.name}
                    </h3>
                  </div>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink className="text-blue-600" size={20} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {partner.description || t('partners_page.committed_desc')}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {getTranslatedType(partner.type)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-green-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
              <Handshake className="text-blue-200" size={20} />
              <span className="text-sm font-semibold tracking-wide">{t('home.partners_subtitle')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              {t('network.hero_title')}
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed text-blue-50 max-w-3xl mx-auto">
              {t('network.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* 1. Organisations membres */}
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
                <Users className="text-blue-600" size={48} />
                <h2 className="text-4xl font-bold text-gray-900">{t('partners_page.orgs_members_title')}</h2>
              </div>

              <PartnerSection
                title={t('partners_page.national_title')}
                subtitle={t('partners_page.national_subtitle')}
                icon={Users}
                colorClass="bg-green-600"
                data={nationalMembers}
              />

              <PartnerSection
                title={t('partners_page.international_title')}
                subtitle={t('partners_page.international_subtitle')}
                icon={Globe}
                colorClass="bg-blue-600"
                data={internationalMembers}
              />
            </div>

            {/* 2. Partenaires institutionnels */}
            <PartnerSection
              title={t('partners_page.institutional_title')}
              subtitle={t('partners_page.institutional_subtitle')}
              icon={Building2}
              colorClass="bg-purple-600"
              data={institutionalPartners}
            />

            {/* 3. Partenaires techniques et financiers */}
            <PartnerSection
              title={t('partners_page.tech_fin_title')}
              subtitle={t('partners_page.tech_fin_subtitle')}
              icon={ShieldCheck}
              colorClass="bg-yellow-600"
              data={techFinPartners}
            />

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Handshake className="mx-auto mb-8 text-blue-600" size={70} />
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('home.view_all_members').split('...').join('')}
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              {t('home.cta_subtitle')}
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
            >
              {t('home.contact_us')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
