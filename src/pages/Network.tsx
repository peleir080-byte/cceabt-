import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Download, UserPlus, Handshake, X, Building2, ExternalLink, Globe, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { getPartnerStatus, getPartnerDisplayOrder } from '../utils/partnerStatus';

export default function Network() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { partners } = useData();

  // Filtrer uniquement les CA et PTF
  const caAndPtfPartners = partners
    .map(p => ({
      ...p,
      status: getPartnerStatus(p.name),
      displayOrder: getPartnerDisplayOrder(getPartnerStatus(p.name), p.type)
    }))
    .filter(p => {
      // Exclure explicitement les ministères et organisations gouvernementales
      const normalizedName = p.name.toLowerCase();
      if (normalizedName.includes('ministère') || normalizedName.includes('ministere') ||
        normalizedName.includes('autorité') || normalizedName.includes('autorite')) {
        return false;
      }
      // Seulement CA et PTF de la liste définitive
      return p.status === 'CA' || p.status === 'PTF';
    })
    .sort((a, b) => {
      // D'abord par ordre hiérarchique (CA > PTF)
      if (a.displayOrder !== b.displayOrder) {
        return a.displayOrder - b.displayOrder;
      }
      // Ensuite par ordre alphabétique du nom
      return a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
    });

  // Compter les CA et PTF
  const caCount = caAndPtfPartners.filter(p => p.status === 'CA').length;
  const ptfCount = caAndPtfPartners.filter(p => p.status === 'PTF').length;

  const resources = [
    { title: t('network.resource_1'), type: 'PDF', size: '2.5 MB' },
    { title: t('network.resource_2'), type: 'PDF', size: '3.1 MB' },
    { title: t('network.resource_3'), type: 'PDF', size: '4.2 MB' },
    { title: t('network.resource_4'), type: 'PDF', size: '1.8 MB' },
    { title: t('network.resource_5'), type: 'PDF', size: '2.9 MB' }
  ];

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

  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/images/2.webp"
            alt="Réseau & Partenaires"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 40%',
              minHeight: '100%',
              minWidth: '100%',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-fade-in">
              <Users className="text-blue-300" size={20} />
              <span className="text-sm font-semibold">{t('network.hero_badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up">
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                {t('network.hero_title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-blue-100 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('network.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Section Réorganisée : Nos Partenaires avec Onglets */}
      <section className="py-24 bg-white min-h-[600px]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">{t('network.ecosystem_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('network.ecosystem_desc')}
              </p>
            </div>

            {/* Informations sur les CA et PTF */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50 border-2 border-blue-200">
                <Award className="text-blue-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600 font-medium">Membres du Conseil d'Administration</div>
                  <div className="text-2xl font-bold text-blue-700">{caCount}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-yellow-50 border-2 border-yellow-200">
                <TrendingUp className="text-yellow-600" size={24} />
                <div>
                  <div className="text-sm text-gray-600 font-medium">Partenaires Techniques et Financiers</div>
                  <div className="text-2xl font-bold text-yellow-700">{ptfCount}</div>
                </div>
              </div>
            </div>

            {/* Grille de Partenaires CA et PTF */}
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {/* Grouper les partenaires par statut */}
                {(() => {
                  const groupedPartners: Record<string, typeof caAndPtfPartners> = {
                    'CA': [],
                    'PTF': []
                  };

                  caAndPtfPartners.forEach(partner => {
                    const status = partner.status || 'Other';
                    if (status === 'CA' || status === 'PTF') {
                      groupedPartners[status].push(partner);
                    }
                  });

                  const statusOrder = ['CA', 'PTF'];

                  return statusOrder.map(status => {
                    if (!groupedPartners[status] || groupedPartners[status].length === 0) return null;

                    const statusData = groupedPartners[status];
                    const statusLabel = status === 'CA'
                      ? "Membres du Conseil d'Administration"
                      : "Partenaires Techniques et Financiers (PTF)";
                    const StatusIcon = status === 'CA' ? Award : TrendingUp;
                    const statusStyles = {
                      'CA': {
                        border: 'border-blue-200',
                        bg: 'bg-blue-100',
                        text: 'text-blue-600',
                        title: 'text-blue-700'
                      },
                      'PTF': {
                        border: 'border-yellow-200',
                        bg: 'bg-yellow-100',
                        text: 'text-yellow-600',
                        title: 'text-yellow-700'
                      }
                    };
                    const styles = statusStyles[status as 'CA' | 'PTF'];

                    return (
                      <div key={status} className="space-y-8">
                        {/* En-tête de section statut */}
                        <div className={`flex items-center gap-4 pb-4 border-b-2 ${styles.border}`}>
                          <div className={`p-3 rounded-xl ${styles.bg} ${styles.text}`}>
                            <StatusIcon size={24} />
                          </div>
                          <div>
                            <h3 className={`text-2xl font-bold ${styles.title}`}>{statusLabel}</h3>
                            <p className="text-sm text-gray-500">
                              {statusData.length} organisation{statusData.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        {/* Grille des partenaires */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {statusData.map((partner, index) => (
                            <motion.div
                              key={partner.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            >
                              {/* Background decoration */}
                              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>

                              <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                  {partner.logo ? (
                                    <div className="h-20 w-full flex items-center justify-start mb-2">
                                      <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="max-h-full max-w-[150px] object-contain"
                                      />
                                    </div>
                                  ) : (
                                    <div className={`p-4 rounded-2xl ${partner.type === 'Institutionnel' ? 'bg-purple-100 text-purple-600' :
                                      partner.type === 'International' ? 'bg-blue-100 text-blue-600' :
                                        partner.type === 'National' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                      }`}>
                                      {partner.type === 'Institutionnel' ? <Building2 size={24} /> :
                                        partner.type === 'International' ? <Globe size={24} /> : <Users size={24} />}
                                    </div>
                                  )}
                                  {/* New Actions */}
                                  <div className="flex gap-2">
                                    {partner.website && (
                                      <a href={partner.website} target="_blank" rel="noopener noreferrer"
                                        className="p-2 bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300">
                                        <ExternalLink size={18} />
                                      </a>
                                    )}
                                  </div>

                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                  {partner.name}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                                  {partner.description || t('partners_page.committed_desc')}
                                </p>

                                {/* Bouton Détails si info dispo */}
                                {(partner.vision || partner.mission) && (
                                  <button
                                    onClick={() => setSelectedPartner(partner)}
                                    className="w-full mt-auto py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <FileText size={16} />
                                    <span>Voir Détails</span>
                                  </button>
                                )}

                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {getTranslatedType(partner.type)}
                                  </span>
                                  <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                      <div key={i} className="w-1 h-1 bg-blue-200 rounded-full"></div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  }).filter(Boolean);
                })()}

                {caAndPtfPartners.length === 0 && (
                  <div className="py-20 text-center">
                    <Handshake size={64} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 text-xl italic font-display">{t('network.no_partners')}</p>
                  </div>
                )}

                {/* Bouton pour voir tous les partenaires */}
                <div className="text-center pt-12">
                  <button
                    onClick={() => navigate('/partners')}
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-600 text-white px-10 py-4 rounded-full font-bold hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-xl hover:scale-105"
                  >
                    <span>Voir tous les partenaires</span>
                    <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal Détails Partenaire */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-md"
                onClick={() => setSelectedPartner(null)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto p-8 md:p-12 text-left overflow-hidden border border-white/20 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors z-10"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Colonne Gauche: Identité */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-48">
                      {selectedPartner.logo ? (
                        <img src={selectedPartner.logo} alt={selectedPartner.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <div className="text-gray-300">
                          <Building2 size={64} />
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPartner.acronym || selectedPartner.name}</h2>
                      <p className="text-gray-500 text-sm">{selectedPartner.name}</p>
                    </div>

                    {selectedPartner.website && (
                      <a href={selectedPartner.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full justify-center bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                        <Globe size={20} />
                        Visiter le site
                      </a>
                    )}

                    <div className="bg-blue-50 p-4 rounded-xl text-sm">
                      <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Building2 size={16} /> Siège</h4>
                      <p className="text-blue-800">{selectedPartner.headquarters || "Non spécifié"}</p>
                    </div>
                  </div>

                  {/* Colonne Droite: Détails Stratégiques */}
                  <div className="lg:col-span-2 space-y-8">
                    {selectedPartner.vision && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-green-500 pl-3">Vision</h3>
                        <p className="text-gray-600 leading-relaxed bg-green-50/50 p-4 rounded-xl italic">
                          "{selectedPartner.vision}"
                        </p>
                      </div>
                    )}

                    {selectedPartner.mission && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedPartner.mission}
                        </p>
                      </div>
                    )}

                    {selectedPartner.intervention_domains && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-purple-500 pl-3">Domaines d'Intervention</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPartner.intervention_domains.map((domain, i) => (
                            <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPartner.projects && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">Projets Réalisés</h3>
                        <ul className="space-y-3">
                          {selectedPartner.projects.map((proj, i) => (
                            <li key={i} className="flex gap-3 text-gray-600 text-sm">
                              <span className="text-orange-500 mt-1">•</span>
                              <span>{proj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Ressources partagées */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <FileText className="text-blue-600" size={40} />
              <h2 className="text-3xl font-bold text-gray-800">{t('network.shared_resources')}</h2>
            </div>

            <div className="grid gap-6">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                      <p className="text-sm text-gray-600 font-medium">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold">
                    <Download size={20} />
                    <span>{t('network.download')}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/resources')}
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl hover:scale-105"
              >
                {t('network.all_resources')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à adhésion */}
      <section className="py-24 bg-gradient-to-r from-blue-700 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <UserPlus className="mx-auto mb-8" size={70} />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('network.join_title')}</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
            {t('network.join_desc')}
          </p>
          <button
            onClick={() => navigate('/join')}
            className="bg-white text-blue-700 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-110"
          >
            {t('network.join_btn_full')}
          </button>
        </div>
      </section>

      {/* Modal d'adhésion supprimé au profit de la page /join */}
    </div>
  );
}
