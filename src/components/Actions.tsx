import { useState } from 'react';
import { Droplet, Sparkles, Building, Megaphone } from 'lucide-react';

export default function Actions() {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous', icon: null },
    { id: 'water', name: 'Eau potable', icon: Droplet },
    { id: 'hygiene', name: 'Hygiène', icon: Sparkles },
    { id: 'sanitation', name: 'Assainissement', icon: Building },
    { id: 'advocacy', name: 'Plaidoyer', icon: Megaphone },
  ];

  const projects = [
    {
      id: 1,
      title: 'Construction de puits communautaires',
      category: 'water',
      image: 'https://images.pexels.com/photos/1029870/pexels-photo-1029870.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Installation de points d\'eau potable dans les zones rurales pour améliorer l\'accès à l\'eau.',
      beneficiaries: '10,000 personnes',
    },
    {
      id: 2,
      title: 'Campagne de lavage des mains',
      category: 'hygiene',
      image: 'https://images.pexels.com/photos/4149051/pexels-photo-4149051.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Sensibilisation aux bonnes pratiques d\'hygiène dans les écoles et communautés.',
      beneficiaries: '50,000 enfants',
    },
    {
      id: 3,
      title: 'Latrines publiques écologiques',
      category: 'sanitation',
      image: 'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Construction de latrines durables et respectueuses de l\'environnement.',
      beneficiaries: '5,000 familles',
    },
    {
      id: 4,
      title: 'Plaidoyer politique EHA',
      category: 'advocacy',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Influence des politiques publiques pour un meilleur accès aux services EHA.',
      beneficiaries: 'National',
    },
    {
      id: 5,
      title: 'Systèmes d\'adduction d\'eau villageois',
      category: 'water',
      image: 'https://images.pexels.com/photos/1145434/pexels-photo-1145434.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Mise en place de réseaux d\'eau potable dans les villages isolés.',
      beneficiaries: '25,000 personnes',
    },
    {
      id: 6,
      title: 'Formation en gestion de l\'eau',
      category: 'advocacy',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Renforcement des capacités des comités de gestion de l\'eau.',
      beneficiaries: '200 gestionnaires',
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="actions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-4">Nos Actions</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Découvrez nos projets et initiatives pour améliorer l'accès à l'eau, l'hygiène et l'assainissement au Togo.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-cceabt-blue text-white shadow-lg'
                  : 'bg-white text-cceabt-blue hover:bg-gray-100'
              }`}
            >
              {category.icon && <category.icon size={20} />}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-cceabt-blue mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cceabt-green font-semibold">
                    {project.beneficiaries}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
