import { useState, useEffect } from 'react';
import { generateImagePaths, findPartnerImage } from '../utils/partnerUtils';
import { useData } from '../context/DataContext';
import { Globe, Users, Building2, Briefcase, Handshake, TrendingUp } from 'lucide-react';

interface PartnerScrollBandProps {
  partners: string[];
  title: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  hoverColor: string;
  animationDuration?: string;
  partnerType?: 'CA' | 'PTF'; // Type de bande : Conseil d'administration ou PTF
}

interface PartnerImageState {
  currentPath: string | null;
  error: boolean;
  triedPaths: string[];
}

export default function PartnerScrollBand({
  partners,
  title,
  icon,
  gradientFrom,
  gradientTo,
  borderColor,
  hoverColor,
  animationDuration = '30s',
  partnerType = 'CA'
}: PartnerScrollBandProps) {
  const { partners: allPartners } = useData();
  const [imageStates, setImageStates] = useState<Record<string, PartnerImageState>>({});

  // Fonction pour trouver un partenaire par nom (gestion des variations)
  const findPartnerByName = (name: string) => {
    // Normaliser le nom pour la comparaison
    const normalize = (str: string) => 
      str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();

    const normalizedName = normalize(name);
    
    // Mapping spécial pour certains noms
    const nameMappings: Record<string, string[]> = {
      'padi': ['padi', 'padie'],
      'chaine de lespoir': ['chaine', 'espoir', 'chainedelespoir'],
      'fiadi': ['fiadi'],
      'odiae': ['odiae'],
      'adesco': ['adesco'],
      'ajt': ['ajt'],
      'cdd': ['cdd'],
      'aesen': ['aesen'],
      'afd': ['afd', 'agence francaise developpement'],
      'ue': ['ue', 'union europeenne', 'european union', 'eu'],
      'pseau': ['pseau'],
      'coalition eau': ['coalition eau', 'coalitioneau'],
      'swa': ['swa', 'sanitation water alliance'],
      'aafea': ['aafea'],
      'endwaterpoverty': ['endwaterpoverty', 'end water poverty', 'ewp'],
      'ambassade de france au togo': ['ambassade france', 'france togo', 'french embassy'],
      'genda water alliance': ['genda', 'genda water', 'genda alliance'],
      'plan international togo': ['plan international', 'plan togo'],
      'seves': ['seves'],
      'cawst': ['cawst']
    };

    // Chercher une correspondance exacte ou partielle
    return allPartners.find(p => {
      const partnerName = normalize(p.name);
      const partnerAcronym = p.acronym ? normalize(p.acronym) : '';
      
      // Correspondance exacte
      if (partnerName === normalizedName || partnerAcronym === normalizedName) {
        return true;
      }
      
      // Vérifier les mappings spéciaux
      const searchKey = normalizedName;
      if (nameMappings[searchKey]) {
        const variations = nameMappings[searchKey];
        if (variations.some(v => partnerName.includes(v) || partnerAcronym.includes(v))) {
          return true;
        }
      }
      
      // Correspondance partielle (le nom contient le partenaire ou vice versa)
      if (partnerName.includes(normalizedName) || normalizedName.includes(partnerName)) {
        return true;
      }
      
      // Correspondance par acronym
      if (partnerAcronym && (partnerAcronym === normalizedName || normalizedName.includes(partnerAcronym))) {
        return true;
      }
      
      // Correspondance par mots clés (prendre les premiers mots)
      const nameWords = normalizedName.split(' ').filter(w => w.length > 2);
      if (nameWords.length > 0) {
        const firstWord = nameWords[0];
        if (partnerName.includes(firstWord) || partnerAcronym.includes(firstWord)) {
          return true;
        }
      }
      
      return false;
    });
  };

  useEffect(() => {
    // Initialiser les états d'images pour tous les partenaires
    const initialStates: Record<string, PartnerImageState> = {};
    partners.forEach(name => {
      // Priorité 1: URL directe depuis le mapping
      const directUrl = findPartnerImage(name);
      if (directUrl && directUrl.startsWith('http')) {
        initialStates[name] = {
          currentPath: directUrl,
          error: false,
          triedPaths: []
        };
        return;
      }
      
      // Priorité 2: Logo du contexte de données
      const partnerData = findPartnerByName(name);
      if (partnerData?.logo) {
        initialStates[name] = {
          currentPath: partnerData.logo,
          error: false,
          triedPaths: []
        };
        return;
      }
      
      // Priorité 3: Fichiers locaux
      const paths = generateImagePaths(name);
      initialStates[name] = {
        currentPath: paths[0] || null,
        error: false,
        triedPaths: []
      };
    });
    setImageStates(initialStates);
  }, [partners, allPartners]);


  const handleImageError = (partnerName: string) => {
    setImageStates(prev => {
      const current = prev[partnerName];
      if (!current) return prev;

      // Construire tous les chemins possibles dans l'ordre de priorité
      const allPaths: string[] = [];
      
      // 1. URL directe depuis le mapping
      const directUrl = findPartnerImage(partnerName);
      if (directUrl && directUrl.startsWith('http')) {
        allPaths.push(directUrl);
      }
      
      // 2. Logo du contexte de données
      const partnerData = findPartnerByName(partnerName);
      if (partnerData?.logo) {
        allPaths.push(partnerData.logo);
      }
      
      // 3. Fichiers locaux
      const filePaths = generateImagePaths(partnerName);
      allPaths.push(...filePaths);
      
      const currentIndex = allPaths.indexOf(current.currentPath || '');
      
      if (currentIndex < allPaths.length - 1) {
        // Essayer le prochain chemin
        const nextPath = allPaths[currentIndex + 1];
        return {
          ...prev,
          [partnerName]: {
            currentPath: nextPath,
            error: false,
            triedPaths: [...current.triedPaths, current.currentPath || '']
          }
        };
      } else {
        // Tous les chemins ont été essayés, afficher le fallback
        return {
          ...prev,
          [partnerName]: {
            ...current,
            error: true
          }
        };
      }
    });
  };

  // Fonction pour obtenir l'icône appropriée selon le type de partenaire
  const getPartnerIcon = (name: string) => {
    const partnerData = findPartnerByName(name);
    
    // Si on a le type dans les données, l'utiliser
    if (partnerData?.type) {
      switch (partnerData.type) {
        case 'Institutionnel':
          return <Building2 size={32} className="text-gray-600" />;
        case 'International':
          return <Globe size={32} className="text-gray-600" />;
        case 'National':
          return <Users size={32} className="text-gray-600" />;
        case 'Technique':
        case 'Financier':
          return <Briefcase size={32} className="text-gray-600" />;
        default:
          return <Handshake size={32} className="text-gray-600" />;
      }
    }
    
    // Sinon, utiliser le type de bande (CA ou PTF)
    if (partnerType === 'PTF') {
      return <TrendingUp size={32} className="text-gray-600" />;
    }
    
    // Par défaut pour CA
    return <Users size={32} className="text-gray-600" />;
  };

  const PartnerCard = ({ name, isDuplicate = false }: { name: string; isDuplicate?: boolean }) => {
    const state = imageStates[name];
    const hasImage = state?.currentPath && !state?.error;

    return (
      <div
        className="w-full flex flex-col items-center justify-center h-64"
      >
        <div className={`w-full h-full flex items-center justify-center bg-transparent p-6 relative overflow-visible group transition-all duration-300 hover:scale-110`}>
          {hasImage ? (
            <div className="w-full h-full flex items-center justify-center overflow-visible min-h-0">
              <img
                src={state.currentPath!}
                alt={name}
                className="max-w-full max-h-[150px] w-auto h-auto object-contain group-hover:scale-110 transition-all duration-300 filter brightness-100 group-hover:brightness-105 opacity-95 group-hover:opacity-100 drop-shadow-sm group-hover:drop-shadow-md"
                onError={() => {
                  handleImageError(name);
                }}
                onLoad={() => {
                  // Image chargée avec succès
                }}
                style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className={`w-24 h-24 rounded-full ${gradientFrom} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                {getPartnerIcon(name)}
              </div>
              <span className={`text-gray-600 font-semibold text-center text-sm leading-tight ${hoverColor} transition-colors px-2`}>
                {name}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div className={`inline-flex items-center gap-3 ${gradientFrom} px-8 py-4 rounded-full mb-4 shadow-lg`}>
          {icon}
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            {title}
          </h3>
        </div>
      </div>

      {/* Bande de défilement par groupes de 4 */}
      <div className="relative overflow-hidden bg-transparent py-16">
        {/* Masques de gradient pour effet fade professionnel */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/98 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/98 to-transparent z-10 pointer-events-none"></div>
        
        {/* Grouper les partenaires par groupes de 4 */}
        {(() => {
          const groups: string[][] = [];
          for (let i = 0; i < partners.length; i += 4) {
            groups.push(partners.slice(i, i + 4));
          }
          
          // Dupliquer les groupes pour l'effet infini (3 séries)
          const allGroups = [...groups, ...groups, ...groups];
          
          return (
            <div 
              className="flex animate-slide-groups" 
              style={{ 
                animationDuration: `${Math.max(groups.length * 10, 40)}s`
              }}
            >
              {allGroups.map((group, groupIndex) => (
                <div
                  key={`group-${groupIndex}`}
                  className="flex-shrink-0 w-full flex items-center justify-center gap-10 px-10"
                >
                  {group.map((name, index) => (
                    <div 
                      key={`${groupIndex}-${index}`} 
                      className="flex-1 max-w-[240px] min-w-[200px] flex justify-center"
                    >
                      <PartnerCard name={name} />
                    </div>
                  ))}
                  {/* Remplir avec des espaces vides si le groupe a moins de 4 éléments */}
                  {Array.from({ length: 4 - group.length }).map((_, i) => (
                    <div key={`empty-${groupIndex}-${i}`} className="flex-1 max-w-[240px] min-w-[200px]"></div>
                  ))}
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
