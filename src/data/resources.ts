export interface Resource {
    id: string;
    title: string;
    type: 'PDF' | 'Word' | 'Excel' | 'Autre';
    size: string;
    year: number;
    theme: 'Plaidoyer' | 'Gouvernance' | 'Rapport' | 'Formation' | 'Politique' | 'Planification' | 'Technique' | 'Autre';
    url: string;
    description?: string;
    author?: string; // e.g. "CCEABT", "OMS", "Ministère"
}

export const resources: Resource[] = [
    {
        id: '1',
        title: "Guide de plaidoyer pour l'eau et l'assainissement",
        type: 'PDF',
        size: '2.5 MB',
        year: 2023,
        theme: 'Plaidoyer',
        url: '#',
        author: 'CCEABT'
    },
    {
        id: '2',
        title: "Étude sur la gouvernance du secteur EHA au Togo",
        type: 'PDF',
        size: '3.1 MB',
        year: 2022,
        theme: 'Gouvernance',
        url: '#',
        author: 'CCEABT & Partenaires'
    },
    {
        id: '3',
        title: "Rapport annuel d'activités 2023",
        type: 'PDF',
        size: '4.2 MB',
        year: 2023,
        theme: 'Rapport',
        url: '#',
        author: 'CCEABT'
    },
    {
        id: '4',
        title: "Manuel de formation - Hygiène communautaire",
        type: 'PDF',
        size: '1.8 MB',
        year: 2021,
        theme: 'Formation',
        url: '#',
        author: 'UNICEF'
    },
    {
        id: '5',
        title: "Stratégie nationale Eau-Hygiène-Assainissement",
        type: 'PDF',
        size: '2.9 MB',
        year: 2020,
        theme: 'Politique',
        url: '#',
        author: 'Ministère de l\'Eau'
    },
    {
        id: '6',
        title: "Plan d'action opérationnel 2024-2025",
        type: 'PDF',
        size: '1.2 MB',
        year: 2024,
        theme: 'Planification',
        url: '#',
        author: 'CCEABT'
    },
    {
        id: '7',
        title: "Rapport d'analyse de la qualité de l'eau dans la région maritime",
        type: 'PDF',
        size: '5.5 MB',
        year: 2022,
        theme: 'Technique',
        url: '#',
        author: 'Laboratoire National'
    },
    {
        id: '8',
        title: "Note de position sur la tarification de l'eau",
        type: 'PDF',
        size: '0.8 MB',
        year: 2023,
        theme: 'Plaidoyer',
        url: '#',
        author: 'CCEABT'
    }
];
