import { Users, Building2 } from 'lucide-react';

export default function Members() {
  const members = [
    'Association pour le Développement Rural',
    'ONG Eau Vive Togo',
    'Caritas Togo',
    'RAFIA (Réseau des Acteurs du Financement de l\'Assainissement)',
    'Action Contre la Faim',
    'Plan International Togo',
    'UNICEF Togo',
    'Vision du Monde',
  ];

  const partners = [
    'Ministère de l\'Eau et de l\'Hydraulique Villageoise',
    'GIZ (Coopération allemande)',
    'Agence Française de Développement',
    'Union Européenne',
    'Banque Mondiale',
    'Water Aid',
    'WASH Alliance International',
    'OMS (Organisation Mondiale de la Santé)',
  ];

  return (
    <section id="members" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-4">
            Membres & Partenaires
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Le CCEABT rassemble un réseau dynamique d'organisations et collabore avec des partenaires stratégiques.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-cceabt-blue p-3 rounded-full">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cceabt-blue">
                  Organisations Membres
                </h3>
              </div>
            </div>

            <div className="grid gap-4">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-cceabt-light-blue/10 to-transparent p-4 rounded-lg border-l-4 border-cceabt-blue hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800 font-medium">{member}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-cceabt-green p-3 rounded-full">
                  <Building2 size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cceabt-blue">
                  Partenaires Stratégiques
                </h3>
              </div>
            </div>

            <div className="grid gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-cceabt-green/10 to-transparent p-4 rounded-lg border-l-4 border-cceabt-green hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800 font-medium">{partner}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
