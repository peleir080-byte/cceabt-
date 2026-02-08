// Définition des statuts des partenaires pour éviter les conflits d'intérêts
// Système hiérarchique : Statut > Catégorie

// Membres du Conseil d'Administration
export const CA_MEMBERS = [
  'Chaine de l\'espoir',
  'Chaîne de l\'Espoir',
  'La Chaîne de l\'Espoir',
  'La CDE',
  'CDE',
  'FIADI',
  'ODIAE',
  'ADESCO',
  'AJT',
  'CDD'
];

// Partenaires Techniques et Financiers (liste complète et définitive)
export const PTF_MEMBERS = [
  'AESEN',
  'AFD',
  'UE',
  'pS-Eau',
  'Coalition Eau',
  'SWA',
  'AAFEA',
  'ENDWATERPOVERTY',
  'Ambassade de France au Togo',
  'GENDA Water Alliance',
  'Plan International Togo',
  'SEVES',
  'CAWST',
  'SEDIF',
  'Commune des Lacs 1',
  'PADIE',
  'Agence de l\'eau Seine-Normandie',
  'Service Public de l\'eau',
  'Région Maritime',
  'République Française'
];

/**
 * Normalise un nom de partenaire pour la comparaison
 */
function normalizePartnerName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/^la\s+/i, '') // Supprimer "La" au début
    .replace(/^le\s+/i, '') // Supprimer "Le" au début
    .replace(/^les\s+/i, '') // Supprimer "Les" au début
    .replace(/\s*-\s*/g, ' ') // Remplacer les tirets par des espaces
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();
}

/**
 * Détermine le statut d'un partenaire
 */
export function getPartnerStatus(partnerName: string): 'CA' | 'PTF' | 'Other' {
  const normalizedName = normalizePartnerName(partnerName);

  // Exclusion explicite : CCDD ne fait PAS partie du CA
  if (normalizedName.includes('ccdd') || normalizedName === 'collectif des citoyens pour le developpement durable') {
    return 'Other';
  }

  // Vérifier si c'est un membre du CA
  for (const ca of CA_MEMBERS) {
    const normalizedCA = normalizePartnerName(ca);

    // Correspondance exacte
    if (normalizedName === normalizedCA) {
      return 'CA';
    }

    // Pour CDD, vérifier que ce n'est pas CCDD
    if (normalizedCA === 'cdd') {
      // CDD = Communication pour un Développement Durable
      // Ne pas confondre avec CCDD = Collectif des citoyens
      if (normalizedName.includes('cdd') && !normalizedName.includes('ccdd') &&
        (normalizedName.includes('communication') || normalizedName === 'cdd')) {
        return 'CA';
      }
      continue; // Passer au suivant si ce n'est pas un match sûr
    }

    // Correspondance partielle (sauf pour CDD qui nécessite une vérification spéciale)
    if (normalizedName.includes(normalizedCA) || normalizedCA.includes(normalizedName)) {
      return 'CA';
    }

    // Vérifier aussi les acronymes et mots-clés pour Chaine de l'espoir
    if (normalizedCA === 'chaine de lespoir' || normalizedCA === 'chaîne de lespoir') {
      if (normalizedName.includes('chaine') && normalizedName.includes('espoir')) {
        return 'CA';
      }
      if (normalizedName.includes('cde') && normalizedName.includes('espoir')) {
        return 'CA';
      }
    }
  }

  // Exclusion explicite : les ministères ne sont PAS des PTF
  if (normalizedName.includes('ministère') || normalizedName.includes('ministere') ||
    normalizedName.includes('autorité de régulation') || normalizedName.includes('autorite de regulation')) {
    return 'Other';
  }

  // Vérifier si c'est un PTF (UNIQUEMENT les 13 noms exacts de la liste)
  // Correspondance stricte uniquement avec les noms normalisés de la liste PTF_MEMBERS
  for (const ptf of PTF_MEMBERS) {
    const normalizedPTF = normalizePartnerName(ptf);

    // Correspondance exacte uniquement (pas de correspondance partielle)
    if (normalizedName === normalizedPTF) {
      return 'PTF';
    }

    // Pour certains PTF, accepter aussi les acronymes si le nom complet est présent
    if (ptf === 'AFD' && (normalizedName === 'afd' || normalizedName.includes('agence francaise developpement'))) {
      return 'PTF';
    }
    if (ptf === 'UE' && (normalizedName === 'ue' || normalizedName.includes('union europeenne'))) {
      return 'PTF';
    }
    if (ptf === 'Coalition Eau' && normalizedName.includes('coalition') && normalizedName.includes('eau')) {
      return 'PTF';
    }
    if (ptf === 'SWA' && (normalizedName === 'swa' || normalizedName.includes('sanitation water'))) {
      return 'PTF';
    }
    if (ptf === 'ENDWATERPOVERTY' && (normalizedName.includes('endwaterpoverty') || normalizedName.includes('end water poverty'))) {
      return 'PTF';
    }
    if (ptf === 'Ambassade de France au Togo' && normalizedName.includes('ambassade') && normalizedName.includes('france') && normalizedName.includes('togo')) {
      return 'PTF';
    }
    if (ptf === 'GENDA Water Alliance' && normalizedName.includes('genda') && normalizedName.includes('water')) {
      return 'PTF';
    }
    if (ptf === 'UE' && (normalizedName === 'ue' || normalizedName.includes('union europeenne'))) {
      return 'PTF';
    }
    if (ptf === 'SWA' && (normalizedName === 'swa' || normalizedName.includes('sanitation') || normalizedName.includes('water for all'))) {
      return 'PTF';
    }
    if (ptf === 'AAFEA' && (normalizedName.includes('aafea') || normalizedName.includes('alliance africaine'))) {
      return 'PTF';
    }
    if (ptf === 'ENDWATERPOVERTY' && (normalizedName.includes('endwaterpoverty') || normalizedName.includes('end water poverty'))) {
      return 'PTF';
    }
    if (ptf === 'GENDA Water Alliance' && (normalizedName.includes('genda') || normalizedName.includes('gender water'))) {
      return 'PTF';
    }
    if (ptf === 'Plan International Togo' && normalizedName.includes('plan international')) {
      return 'PTF';
    }
    if (ptf === 'CAWST' && normalizedName.includes('cawst')) {
      return 'PTF';
    }
    if (ptf === 'pS-Eau' && (normalizedName.includes('pseau') || normalizedName.includes('ps-eau'))) {
      return 'PTF';
    }
    if (ptf === 'SEDIF' && (normalizedName.includes('sedif') || normalizedName.includes('service public'))) {
      return 'PTF';
    }
    if (ptf === 'AESEN' && (normalizedName.includes('aesen') || normalizedName.includes('seine-normandie') || normalizedName.includes('seine normandie'))) {
      return 'PTF';
    }
    if (ptf === 'Commune des Lacs 1' && (normalizedName.includes('lacs 1') || normalizedName.includes('lacs1') || normalizedName.includes('region maritime'))) {
      return 'PTF';
    }
    if (ptf === 'PADIE' && (normalizedName.includes('padie') || normalizedName.includes('pionniers'))) {
      return 'PTF';
    }
    if (ptf === 'SEVES' && normalizedName.includes('seves')) {
      return 'PTF';
    }
  }

  return 'Other';
}

/**
 * Ordre de priorité pour l'affichage
 * 1. Statut (CA > PTF > Other)
 * 2. Catégorie (National > International > Institutionnel)
 */
export function getPartnerDisplayOrder(
  status: 'CA' | 'PTF' | 'Other',
  category: 'National' | 'International' | 'Institutionnel' | 'Technique' | 'Financier'
): number {
  // Priorité de statut (plus petit = plus prioritaire)
  const statusPriority = {
    'CA': 1,
    'PTF': 2,
    'Other': 3
  };

  // Priorité de catégorie (National avant International)
  const categoryPriority = {
    'National': 1,
    'International': 2,
    'Institutionnel': 3,
    'Technique': 4,
    'Financier': 5
  };

  // Combiner les priorités (statut * 100 + catégorie pour garantir l'ordre)
  return statusPriority[status] * 100 + (categoryPriority[category] || 99);
}
