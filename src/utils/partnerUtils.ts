// Mapping des noms de partenaires avec leurs variations possibles
// Gère les variations d'orthographe, les formats de fichiers, et les noms alternatifs
export const partnerNameMapping: Record<string, string[]> = {
  // Conseil d'administration
  'PADI': ['padi', 'padie', 'p-a-d-i', 'padi-togo', 'padi-tg'],
  'Chaine de l\'espoir': [
    'chaine-de-lespoir', 
    'chaine-espoir', 
    'chainedelespoir', 
    'chaine-de-l-espoir',
    'chaine-espoir-togo',
    'chainedelespoir-togo'
  ],
  'FIADI': ['fiadi', 'f-i-a-d-i', 'fiadi-togo', 'fiadi-tg'],
  'ODIAE': ['odiae', 'o-d-i-a-e', 'odiae-togo', 'odiae-tg'],
  'ADESCO': ['adesco', 'a-d-e-s-c-o', 'adesco-togo', 'adesco-tg'],
  'AJT': ['ajt', 'a-j-t', 'ajt-togo', 'ajt-tg'],
  'CDD': ['cdd', 'c-d-d', 'cdd-togo', 'cdd-tg', 'communication-developpement-durable'],
  'CCDD': ['ccdd', 'c-c-d-d', 'ccdd-togo', 'ccdd-tg', 'collectif-citoyens-developpement-durable'],
  
  // PTF
  'AESEN': ['aesen', 'a-e-s-e-n', 'aesen-togo', 'aesen-tg'],
  'AFD': [
    'afd', 
    'a-f-d', 
    'agence-francaise-developpement',
    'afd-togo',
    'afd-france',
    'agence-francaise-developpement-togo'
  ],
  'UE': [
    'ue', 
    'u-e', 
    'union-europeenne', 
    'european-union', 
    'eu',
    'ue-togo',
    'union-europeenne-togo',
    'european-commission'
  ],
  'PSEAU': ['pseau', 'p-s-e-a-u', 'pseau-togo', 'pseau-tg'],
  'Coalition Eau': [
    'coalition-eau', 
    'coalitioneau', 
    'coalition-eau-france',
    'coalition-eau-togo',
    'coalitioneau-france'
  ],
  'SWA': [
    'swa', 
    's-w-a', 
    'sanitation-water-alliance',
    'swa-alliance',
    'sanitation-water-for-all'
  ],
  'AAFEA': ['aafea', 'a-a-f-e-a', 'aafea-togo', 'aafea-tg'],
  'ENDWATERPOVERTY': [
    'endwaterpoverty', 
    'end-water-poverty', 
    'ewp',
    'end-water-poverty-togo',
    'ewp-togo'
  ],
  'Ambassade de France au Togo': [
    'ambassade-france-togo', 
    'ambassade-france', 
    'france-togo', 
    'ambassade-fr-togo',
    'ambassade-france-lome',
    'ambassade-france-au-togo',
    'french-embassy-togo'
  ],
  'GENDA Water Alliance': [
    'genda-water-alliance', 
    'genda', 
    'genda-alliance',
    'genda-water',
    'genda-alliance-togo'
  ],
  'Plan International Togo': [
    'plan-international-togo', 
    'plan-togo', 
    'plan-international',
    'plan-international-tg',
    'plan-togo-country'
  ],
  'SEVES': ['seves', 's-e-v-e-s', 'seves-togo', 'seves-tg'],
  'CAWST': ['cawst', 'c-a-w-s-t', 'cawst-togo', 'cawst-tg']
};

// Mapping direct des URLs des logos (priorité haute)
// Ces URLs sont utilisées directement pour un chargement immédiat
// 
// Logos documentés :
// - CDD: Triangle jaune avec "CDD" en vert (Communication Développement Durable)
// - SEVES: Logo avec forme blanche et texte "SEVES" sur fond bleu-gris foncé
// - Plan International: Logo avec forme bleue et texte "PLAN INTERNATIONAL"
// - END WATER POVERTY: Logo avec main noire et goutte d'eau bleue
// - AAFEA: Logo avec formes bleues ressemblant à des gouttes d'eau
// - UE: Drapeau européen avec étoiles dorées sur fond bleu
// - AFD: Logo avec cercle dégradé bleu-rouge et texte "AFD"
export const partnerLogoUrls: Record<string, string> = {
  // Conseil d'administration
  'CDD': '', // Logo CDD - Triangle jaune avec "CDD" en vert - Cherche dans /public/images/partners/cdd.png
  
  // PTF
  'Coalition Eau': 'https://coalition-eau.org/wp-content/themes/coalition-eau/assets/images/logo.png',
  'AFD': 'https://www.afd.fr/sites/afd/files/logo_0.png',
  'UE': 'https://europa.eu/european-union/sites/default/files/logo/logo-eu-1500x844.png',
  'AAFEA': 'https://alliance-aafea.org/wp-content/uploads/2025/04/Nouveau-logo-AAFEA-format-horizontal-08-01-2025.png',
  'ENDWATERPOVERTY': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPm6p9ICZW4lqgjCivVeD5vdDLqUpsx2iALQ&s',
  'Plan International Togo': 'https://yop.l-frii.com/wp-content/uploads/2024/09/PLAN-INTERNATIONAL-recrute-pour-ce-poste-30-Septembre-2024.jpg',
  'SEVES': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIyZb_0lQoUifxOQ0KnrZA1K27cumupDcR6A&s'
};

// Extensions d'images à essayer
const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

/**
 * Génère toutes les variations possibles d'un nom de fichier pour un partenaire
 */
export function generateImagePaths(partnerName: string): string[] {
  const basePaths = ['/images/partners/', '/images/'];
  const variations = partnerNameMapping[partnerName] || [];
  
  // Ajouter la variation standard (nom normalisé)
  const standardVariation = partnerName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/\s+/g, '-')
    .replace(/'/g, '')
    .replace(/[^a-z0-9-]/g, '');
  
  const allVariations = [standardVariation, ...variations];
  
  // Générer tous les chemins possibles avec toutes les extensions et tous les dossiers
  const paths: string[] = [];
  
  basePaths.forEach(basePath => {
    allVariations.forEach(variation => {
      imageExtensions.forEach(ext => {
        paths.push(`${basePath}${variation}${ext}`);
        // Ajouter aussi la version avec majuscule initiale
        const capitalized = variation.charAt(0).toUpperCase() + variation.slice(1);
        paths.push(`${basePath}${capitalized}${ext}`);
      });
    });
  });
  
  // Supprimer les doublons tout en préservant l'ordre
  return Array.from(new Set(paths));
}

/**
 * Trouve le premier chemin d'image valide pour un partenaire
 * Priorité : URL directe (si non vide) > fichiers locaux
 */
export function findPartnerImage(partnerName: string): string | null {
  // D'abord vérifier si on a une URL directe (et qu'elle n'est pas vide)
  const directUrl = partnerLogoUrls[partnerName];
  if (directUrl && directUrl.trim() !== '') {
    return directUrl;
  }
  
  // Sinon, chercher dans les fichiers locaux
  const paths = generateImagePaths(partnerName);
  // On retourne le premier chemin (le plus probable)
  // Le composant React testera si l'image existe
  return paths[0] || null;
}
