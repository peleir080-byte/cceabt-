import { Calendar, ArrowRight } from 'lucide-react';

export default function News() {
  const articles = [
    {
      id: 1,
      title: 'Lancement du nouveau programme d\'accès à l\'eau en zone rurale',
      excerpt: 'Le CCEABT lance une initiative ambitieuse pour améliorer l\'accès à l\'eau potable dans 50 villages du Togo.',
      date: '15 Mars 2025',
      image: 'https://images.pexels.com/photos/1102915/pexels-photo-1102915.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Projets',
    },
    {
      id: 2,
      title: 'Atelier national sur les politiques d\'assainissement',
      excerpt: 'Plus de 100 acteurs du secteur EHA réunis pour discuter des stratégies d\'assainissement durable.',
      date: '8 Mars 2025',
      image: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Événements',
    },
    {
      id: 3,
      title: 'Journée Mondiale de l\'Eau 2025 : Célébration nationale',
      excerpt: 'Le CCEABT mobilise la société civile pour sensibiliser à l\'importance de préserver les ressources en eau.',
      date: '22 Février 2025',
      image: 'https://images.pexels.com/photos/1146708/pexels-photo-1146708.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Actualités',
    },
    {
      id: 4,
      title: 'Nouveau partenariat avec l\'Union Européenne',
      excerpt: 'Signature d\'un accord de financement pour renforcer les infrastructures d\'eau et d\'assainissement.',
      date: '10 Février 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Partenariats',
    },
    {
      id: 5,
      title: 'Formation de 200 gestionnaires de points d\'eau',
      excerpt: 'Le CCEABT conclut avec succès un programme de renforcement des capacités dans cinq régions.',
      date: '28 Janvier 2025',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Formations',
    },
    {
      id: 6,
      title: 'Rapport annuel 2024 : Bilan des actions du CCEABT',
      excerpt: 'Découvrez les réalisations et impacts du réseau au cours de l\'année écoulée.',
      date: '15 Janvier 2025',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Publications',
    },
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-4">Actualités</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Restez informés de nos actions, événements et réalisations dans le secteur EHA.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-cceabt-green bg-cceabt-green/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-cceabt-blue mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <button className="flex items-center text-cceabt-blue font-semibold hover:text-cceabt-green transition-colors duration-200">
                  Lire la suite
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-cceabt-blue hover:bg-cceabt-blue/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
            Voir toutes les actualités
          </button>
        </div>
      </div>
    </section>
  );
}
