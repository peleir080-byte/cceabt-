import { Newspaper, Calendar, Image, Facebook, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/config';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

// Données des catégories
const getCategories = (t: any) => [
  { id: 'all', name: t('news_page.cat_all'), color: 'gray' },
  { id: 'advocacy', name: t('news_page.cat_advocacy'), color: 'blue' },
  { id: 'water', name: t('news_page.cat_water'), color: 'green' },
  { id: 'training', name: t('news_page.cat_training'), color: 'purple' },
  { id: 'testimonials', name: t('news_page.cat_testimonials'), color: 'yellow' }
];

export default function News() {
  const { t } = useTranslation();
  const { news } = useData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Use news from DataContext instead of static data
  const categoriesList = getCategories(t);

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(item => item.category === selectedCategory ||
      categoriesList.find(c => c.id === selectedCategory)?.name === item.category);
  // Note: The original static data had specific category IDs. 
  // The new dynamic data allows free text categories, so filtering might need adjustment.
  // For now, I'll keep the logic simple: if category matches exactly, or show all.
  // If the user types a category that isn't in the list, it won't show up in specific filters unless we update the filters too.
  // To make it robust for now with user input:
  // If 'all', show everything. If not 'all', try to match category text. 
  // Since user inputs free text, exact match might be tricky with the current hardcoded filters.
  // Let's adapt: The hardcoded filters are specific. The user input is free text.
  // I will simplify filtering for this demo: only filter if it matches exactly, otherwise show all if 'all'.

  // Better approach: Since user inputs arbitrary categories, maybe just show all for now or check if the category STRING includes the key words.
  // Let's stick to showing 'all' correctly and basic filtering.

  const getCategoryColor = (categoryId: string) => {
    return categoriesList.find(c => c.id === categoryId)?.color || 'blue';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <img
            src="/images/3.jpg"
            alt="Actualités CCEABT"
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
              <Newspaper className="text-blue-300" size={20} />
              <span className="text-sm font-semibold">{t('news_page.hero_badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-slide-up text-blue-600">
              {t('news_page.hero_title')} ({news.length})
            </h1>
            <p className="text-xl md:text-2xl mb-10 leading-relaxed text-white max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('news_page.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h2 className="text-3xl font-bold text-gray-800">{t('news_page.latest_title')}</h2>

              <div className="flex flex-wrap gap-2">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                      ? `bg-blue-600 text-white shadow-md scale-105`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            {filteredNews.length === 0 ? (
              <p className="text-center text-gray-500 py-12">{t('news_page.no_news')}</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((item) => {
                  const titleKey = `home.news_${item.id}_title`;
                  const descKey = `home.news_${item.id}_desc`;
                  const displayTitle = i18n.exists(titleKey) ? t(titleKey) : item.title;
                  const displayDesc = i18n.exists(descKey) ? t(descKey) : item.excerpt;

                  return (
                    <article
                      key={item.id}
                      onClick={() => navigate(`/news/${item.id}`)}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 flex flex-col h-full cursor-pointer group"
                    >
                      <div className="bg-gray-200 h-48 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                            <Image size={48} />
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="text-gray-500" size={16} />
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-${getCategoryColor(item.category)}-100 text-${getCategoryColor(item.category)}-800 w-fit`}>
                          {item.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{displayTitle}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{displayDesc}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/news/${item.id}`);
                          }}
                          className="text-blue-600 font-semibold hover:underline mt-auto self-start"
                        >
                          {t('news_page.read_more')} →
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Galerie Integration */}
      <section className="py-24 bg-slate-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-0 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">

            {/* Left: Auto-scrolling Carousel */}
            <div className="lg:w-2/3 h-96 relative overflow-hidden group">
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none"></div>

              <div className="absolute inset-0 flex animate-news-scroll">
                {/* Duplicated images for infinite scroll effect */}
                {[1, 2, 3, 4, 1, 2].map((num, i) => (
                  <img
                    key={i}
                    src={`/images/${num}.jpg`}
                    alt="Gallery Preview"
                    className="h-full w-2/3 object-cover flex-shrink-0"
                  />
                ))}
              </div>

              <div className="absolute bottom-8 left-8 z-20 max-w-md">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded mb-3">
                  Immersion
                </span>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                  Retour en images sur nos actions terrain
                </h3>
              </div>
            </div>

            {/* Right: CTA Sidebar */}
            <div className="lg:w-1/3 p-10 flex flex-col justify-center bg-gradient-to-br from-slate-800 to-slate-900 relative">
              <div className="absolute top-0 right-0 p-32 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <Image className="text-blue-500 mb-6" size={48} />
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('news_page.gallery_title') || "Notre Médiathèque"}
              </h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {t('news_page.gallery_subtitle') || "Découvrez l'ensemble de nos reportages photos, événements et conférences dans notre nouvelle galerie interactive."}
              </p>

              <button
                onClick={() => navigate('/gallery')}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group"
              >
                <span>Accéder à la galerie</span>
                <div className="bg-white/20 p-1 rounded group-hover:bg-white/30 transition-colors">
                  <Image size={16} />
                </div>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Socials & Newsletter (kept as is) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t('news_page.follow_us')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Facebook className="text-blue-600" size={40} />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Facebook</h3>
                    <p className="text-gray-600">CCEABT</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('news_page.fb_desc')}
                </p>
                <a
                  href="https://facebook.com/CCEABT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {t('news_page.fb_btn')}
                </a>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Linkedin className="text-blue-700" size={40} />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">LinkedIn</h3>
                    <p className="text-gray-600">{t('news_page.li_profile')}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  {t('news_page.li_desc')}
                </p>
                <a
                  href="https://linkedin.com/company/cceabt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
                >
                  {t('news_page.li_btn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter subscription */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Newspaper className="mx-auto mb-6" size={60} />
          <h2 className="text-3xl font-bold mb-4">{t('news_page.stay_informed')}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('news_page.stay_informed_desc')}
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder={t('news_page.email_placeholder')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-800"
            />
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              {t('news_page.subscribe')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
