import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface NewsItem {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
    content: string; // Pour le futur détail
}

export interface ResourceItem {
    id: string;
    title: string;
    type: string; // PDF, Rapport, etc.
    theme: string;
    year: string;
    author: string;
    size: string;
    downloadUrl: string; // Simulé pour l'instant
}

export interface PartnerItem {
    id: string;
    name: string;
    type: 'Technique' | 'Financier' | 'Institutionnel' | 'International' | 'National';
    description?: string;
    website?: string;
    logo?: string;
    email?: string;
    password?: string;
    phone?: string;
    acronym?: string;
    headquarters?: string;
    vision?: string;
    mission?: string;
    intervention_zone?: string;
    intervention_domains?: string[];
    projects?: string[];
}

export interface Submission {
    id: string;
    partnerName: string;
    projectTitle: string;
    location: string;
    period: string;
    beneficiaries: number;
    budget: string;
    status: 'en_attente' | 'reussi' | 'echoue';
    date: string;
    details: string;
    attachment?: string;
}

interface DataContextType {
    driveUrl: string;
    setDriveUrl: (url: string) => void;

    news: NewsItem[];
    addNews: (item: Omit<NewsItem, 'id'>) => void;
    deleteNews: (id: string) => void;
    updateNews: (id: string, updates: Partial<NewsItem>) => void;

    resources: ResourceItem[];
    addResource: (item: Omit<ResourceItem, 'id'>) => void;
    deleteResource: (id: string) => void;

    partners: PartnerItem[];
    addPartner: (item: Omit<PartnerItem, 'id'>) => void;
    deletePartner: (id: string) => void;
    updatePartner: (id: string, updates: Partial<PartnerItem>) => void;
    setPartners: React.Dispatch<React.SetStateAction<PartnerItem[]>>;
    initialPartners: PartnerItem[];

    submissions: Submission[];
    addSubmission: (item: Omit<Submission, 'id' | 'date'> & { status?: Submission['status'] }) => void;
    deleteSubmission: (id: string) => void;
    updateSubmissionStatus: (id: string, status: Submission['status']) => void;
}

// --- Initial Mock Data (Pour ne pas démarrer vide) ---

const initialNews: NewsItem[] = [
    {
        id: '1',
        title: 'Lancement du projet "Eau pour Tous" dans la région des Savanes',
        category: 'Projet Terrain',
        date: '15 Mars 2024',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Une nouvelle initiative majeure pour apporter l\'eau potable à plus de 5000 foyers ruraux.',
        content: ''
    },
    {
        id: '2',
        title: 'Conférence nationale sur l\'assainissement urbain à Lomé',
        category: 'Plaidoyer',
        date: '28 Février 2024',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Le CCEABT réunit les acteurs clés pour discuter des défis de l\'assainissement dans la capitale.',
        content: ''
    },
    {
        id: '3',
        title: 'Formation des acteurs locaux sur la gestion des points d\'eau',
        category: 'Renforcement de capacités',
        date: '10 Février 2024',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Trois jours de formation intensive pour les comités de gestion d\'eau villageois.',
        content: ''
    }
];

const initialResources: ResourceItem[] = [
    { id: '1', title: "Rapport annuel sur l'état de l'eau au Togo 2023", type: 'Rapport', theme: 'Eau potable', year: '2023', author: 'CCEABT', size: '4.2 MB', downloadUrl: '#' },
    { id: '2', title: "Guide des bonnes pratiques d'hygiène en milieu scolaire", type: 'Guide', theme: 'Hygiène', year: '2022', author: 'Partenaires', size: '2.5 MB', downloadUrl: '#' },
    { id: '3', title: "Étude sur l'impact de l'assainissement autonome", type: 'Étude', theme: 'Assainissement', year: '2023', author: 'Consultants', size: '3.8 MB', downloadUrl: '#' },
];

const initialPartners: PartnerItem[] = [

    {
        "id": "crt____154",
        "name": "CRT - Croix-Rouge Togolaise",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image2.jpeg",
        "password": "password123"
    },
    {
        "id": "eaa____790",
        "name": "EAA - Eau Assainissement pour l'Afrique",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "jat____532",
        "name": "JAT - Jeunesse et Avenir Togo",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image3.jpg",
        "password": "password123"
    },
    {
        "id": "jve____559",
        "name": "JVE - Jeunes Volontaires pour l'Environnement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image4.jpeg",
        "password": "password123"
    },
    {
        "id": "pnje____611",
        "name": "PNJE - Parlement National de la Jeunesse pour l'Eau",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image5.jpeg",
        "password": "password123"
    },
    {
        "id": "ong_alafia_354",
        "name": "ONG ALAFIA",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "https://alafia-togo.org/",
        "logo": "/partners/image6.jpeg",
        "password": "password123"
    },
    {
        "id": "colombe____234",
        "name": "COLOMBE",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "stadd____149",
        "name": "STADD - Science et Technologie Africaines pour un Développement Durable",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image7.jpg",
        "password": "password123"
    },
    {
        "id": "ocdi_lom__organisation_de_la_c_160",
        "name": "OCDI/CARITAS Lomé",
        "type": "National",
        "description": "Organisation de la Charité pour un Développement Intégral, Lomé",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "wv____462",
        "name": "WV - WASH Volunteers",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image9.jpg",
        "password": "password123"
    },
    {
        "id": "ong_fiadi_786",
        "name": "ONG FIADI - Femmes Initiatives et Actions pour un Développement Intégral",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image10.png",
        "password": "password123"
    },
    {
        "id": "ong_ahd_377",
        "name": "ONG AHD - Actions d'Aide Humanitaire pour le Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image11.jpeg",
        "password": "password123"
    },
    {
        "id": "ong_atape_121",
        "name": "ONG ATAPE - Association Togolaise pour l'Assainissement et la Protection de l'Environnement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "gircafem____493",
        "name": "GIRCAFEM - Groupe International pour le Renforcement des Capacités Féminines",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123",
        "acronym": "GIRCAFEM",
        "headquarters": "TSEVIE - HETSIAVI",
        "vision": "La vision de l'Association est d'oeuvrer pour un monde rural où les hommes et les femmes sont libérés (es) de la pauvreté...",
        "mission": "La mission de l'Association est de soutenir, de défendre et d'accompagner les femmes en milieu rural et urbain...",
        "intervention_zone": "Région Maritime; Préfectures du Zio, Yoto, Vo et Avé",
        "intervention_domains": [
            "Promotion de l'entrepreneuriat vert",
            "Hygiène et assainissement",
            "Promotion et défense des droits humains de la femme",
            "Santé sexuelle et reproductive"
        ],
        "projects": [
            "La mise en oeuvre du projet : vulgarisation des bonnes pratiques d'agroécologie...",
            "Projet : Promotion des Foyers Améliorés économes à charbon de bois...",
            "Projet : Promotion de l'accès aux foyers améliorés au Togo..."
        ]
    },
    {
        "id": "ong_jvs_561",
        "name": "ONG JVS - ONG Le Jourdain-Vie et Santé",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "ovad_ap____513",
        "name": "OVAD-AP - Organisation des Volontaires Acteurs de Développement - Action Plus",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "odiae___d_v_loppememt_100",
        "name": "ODIAE - Organisation pour le Développement et l'Incitation à l'Auto-Emploi",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image12.jpg",
        "password": "password123"
    },
    {
        "id": "odjougbo____601",
        "name": "ODJOUGBO",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image13.jpeg",
        "password": "password123"
    },
    {
        "id": "sos_vita_252",
        "name": "SOS VITA - Association de promotion de la femme et de la protection de la vie",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image14.png",
        "password": "password123",
        "acronym": "SVT",
        "headquarters": "Pays: Togo; Région: Plateaux; Préfecture: Ogou; Commune: Ogou1...",
        "vision": "Une organisation crédible avec un rayonnement régional et national, perçue comme un acteur de développement...",
        "mission": "Promouvoir les droits humains, l'amélioration du cadre et des conditions de vie...",
        "intervention_zone": "Les 12 Préfectures de la Région des Plateaux",
        "intervention_domains": [
            "Droits Humains (santé communautaire)",
            "Education",
            "Protection des enfants et jeunes",
            "Environnement/eau/assainissement"
        ],
        "projects": [
            "7ème cycle de financement (GC7) du Fonds Mondial...",
            "Momentum Country and Global leadership...",
            "Projet de Renforcement du Système de Santé (RSS2)..."
        ]
    },
    {
        "id": "jodd___oeuvrant_375",
        "name": "JODD - Jeunes Oeuvrant pour le Développement Durable",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image15.png",
        "password": "password123"
    },
    {
        "id": "ccdd___d_veloppement_607",
        "name": "CCDD - Collectif des citoyens pour le développement durable",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "ail____689",
        "name": "AIL - Appui aux Initiatives Locales",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "http://www.ong-ail.org",
        "logo": "/partners/image16.png",
        "password": "password123"
    },
    {
        "id": "ahead____747",
        "name": "AHEAD - Afrique Humanité Environnement Action Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "adesco____292",
        "name": "ADESCO - Appui au Développement Social et Communautaire",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image17.jpg",
        "password": "password123"
    },
    {
        "id": "abad____271",
        "name": "ABAD - Association pour le Bien-Etre et l'Assistance aux Démunis",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image18.jpeg",
        "password": "password123"
    },
    {
        "id": "adiff___developpement_integral_432",
        "name": "ADIFF - Organisation pour le Developpement Integral de la Femme et de la Fille",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image19.jpg",
        "password": "password123"
    },
    {
        "id": "apss____718",
        "name": "APSS - Association Promotion de la Salubrité Pour la Santé",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "card___developpement_11",
        "name": "CARD - Comité d'Action pour la Recherche et le Developpement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "crt_rc____415",
        "name": "CRT-RC - Croix-Rouge Togolaise / Région Centrale",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "dh____191",
        "name": "DH - Défi Horizon",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image20.png",
        "password": "password123"
    },
    {
        "id": "e_d___d_veloppement_670",
        "name": "E-D - Environnement et Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "pasdi_afrique_d_action_sociale_283",
        "name": "PASDI-Afrique - Programme d'Action Sociale pour le Développement Intégral en Afrique",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image21.png",
        "password": "password123"
    },
    {
        "id": "2d____964",
        "name": "2D - Défis et Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "https://www.defis-developpement.org/",
        "logo": "/partners/image22.jpeg",
        "password": "password123"
    },
    {
        "id": "raid____629",
        "name": "RAID - Recherche et Appuis aux Initiatives de Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "rp_rc___phast_411",
        "name": "RP/RC - Réseau Phast Région Centrale",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "ajt____834",
        "name": "AJT - Action Jeune Togo",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image23.png",
        "password": "password123"
    },
    {
        "id": "pades___economique_973",
        "name": "PADES - Programme d'Appui au Développement Economique et Social",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image24.jpeg",
        "password": "password123"
    },
    {
        "id": "aprodife____276",
        "name": "APRODIFE - Association pour la Promotion de la Femme et de l'Enfant",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image25.jpg",
        "password": "password123"
    },
    {
        "id": "cap_ejr___echo_178",
        "name": "CAP-EJR - Complexe Agro-pastoral Echo des Jeunes Ruraux",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "ceapic___etudes_491",
        "name": "CEAPIC - Centre d'Etudes et d'Action pour la Promotion des Initiatives",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "cdd___d_veloppemenet_612",
        "name": "CDD - Communication pour un Développement Durable",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image26.jpeg",
        "password": "password123"
    },
    {
        "id": "3asc_____605",
        "name": "3ASC - Association d'Appui aux Activités de Santé Communautaire",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "http://www.ong3asc.org",
        "logo": "/partners/image27.jpg",
        "password": "password123"
    },
    {
        "id": "orepsa___regionale_48",
        "name": "OREPSA - Organisation Regionale pour la Promotion Sociale et Agricole",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image28.jpg",
        "password": "password123"
    },
    {
        "id": "jarc____77",
        "name": "JARC - Jeunesse Agricole Rurale Catholique",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "",
        "password": "password123"
    },
    {
        "id": "capas____525",
        "name": "CAPAS - Cellule d'Appui des Producteurs Agricoles des Savanes",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image29.jpeg",
        "password": "password123"
    },
    {
        "id": "shd____446",
        "name": "SHD - Service Humanitaire de Développement",
        "type": "National",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image30.jpg",
        "password": "password123"
    },
    {
        "id": "la_cde_399",
        "name": "La CDE - La Chaîne de l'Espoir",
        "type": "International",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "",
        "logo": "/partners/image31.jpeg",
        "password": "password123"
    },
    {
        "id": "plan_international_togo_988",
        "name": "Plan International Togo",
        "type": "International",
        "description": "Membre du réseau CCEABT",
        "email": "contact@cceabt.tg",
        "phone": "",
        "website": "https://plan-international.org/togo/",
        "logo": "/partners/image32.png",
        "password": "password123"
    },
    {
        id: "ptf_aesen",
        name: "AESEN (Agence de l'eau Seine-Normandie)",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "aesen@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "tf1",
        name: "AFD (Agence Française de Développement)",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "afd@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "tf2",
        name: "Union Européenne",
        type: "Financier",
        description: "Partenaire Technique et Financier",
        email: "ue@cceabt.org",
        password: "password123",
        logo: "/partners/eu.png"
    },
    {
        id: "ptf_pseau",
        name: "pS-Eau",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "pseau@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_coalition_eau",
        name: "Coalition Eau",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "coalitioneau@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_swa",
        name: "SWA - Sanitation and Water for All",
        type: "International",
        description: "Partenaire Technique et Financier",
        email: "swa@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_aafea",
        name: "AAFEA",
        type: "International",
        description: "Partenaire Technique et Financier",
        email: "aafea@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_endwaterpoverty",
        name: "ENDWATERPOVERTY",
        type: "International",
        description: "Partenaire Technique et Financier",
        email: "endwaterpoverty@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_ambassade_france",
        name: "Ambassade de France au Togo",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "ambassadefrance@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_genda",
        name: "GENDA Water Alliance",
        type: "International",
        description: "Partenaire Technique et Financier",
        email: "genda@cceabt.org",
        password: "password123",
        logo: ""
    },

    {
        id: "seves___economiquement_187",
        name: "SEVES - Systèmes Economiquement Viables pour l'Eau aux Suds",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "contact@cceabt.tg",
        phone: "",
        website: "http://asso-seves.org/",
        logo: "/partners/image33.png",
        password: "password123"
    },
    {
        id: "ptf_cawst",
        name: "CAWST",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "cawst@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_sedif",
        name: "SEDIF (Service Public de l'eau)",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "sedif@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "ptf_commune_lacs1",
        name: "Commune des Lacs 1",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "commune.lacs1@cceabt.org",
        password: "password123",
        logo: ""
    },
    {
        id: "padie____743",
        name: "PADIE - Pionniers en Action pour le Développempent Intégré à l’Environnement",
        type: "Technique",
        description: "Partenaire Technique et Financier",
        email: "contact@cceabt.tg",
        phone: "",
        website: "",
        logo: "/partners/image1.png",
        "password": "password123",
        "acronym": "PADIE",
        "headquarters": "Le siège statutaire de l'ONG est basée à Kpalimé et dispose d'un Bureau national domicilié à Lomé, quartier Vakpossito.",
        "vision": "Promouvoir le partenariat public-privé société civile comme stratégie de concrétisation des enjeux locaux d'une bonne gouvernance partagée et de développement durable des territoires décentralisés.",
        "mission": "Contribuer à un développement durable des territoires à travers la recherche action et un appui conseil participatif, adapté et inclusif en gouvernance locale et en alternatives innovantes d'accès aux services financiers et sociaux soucieuses de la gestion durable des ressources naturelles.",
        "intervention_zone": "Les actions de PADIE couvrent l'ensemble du territoire national (Togo) et sont en extension vers les autres territoires d'Afrique...",
        "intervention_domains": [
            "Plaidoyer et partenariat durable au service du développement durable des territoires",
            "Gouvernance locale partagée, aménagement et développement durable des territoires",
            "Accès durable aux services sociaux de base dans les territoires",
            "Economie locale et solidaires soucieuses de la gestion durable des ressources naturelles",
            "Appui conseil et intermédiation participatifs"
        ],
        "projects": [
            "Projet d'Amélioration du Service d'Eau potable des communes de Kloto 1 et Kloto 2, Togo. PASEK 2",
            "Projet de Promotion de l'accès durable aux services d'eau, d'hygiène et d'assainissement dans la commune de Hako 1 (Miwoedebu/Faisons autrement)",
            "Projet de Protection contre les inondations à Kloto 1, Golfe 1 et Golfe 7 Initiatives Durables pour l'accès à l'Eau et l'Assainissement (INIDEA)",
            "Projet FSPI composante 2 « accompagnement des communes togolaises dans le développement de leurs services publics locaux essentiels de gestion des déchets »"
        ]
    }
];


// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    // Load from localStorage or use initial data
    const [driveUrl, setDriveUrl] = useState(() => {
        return localStorage.getItem('cceabt_drive_url') || 'https://drive.google.com';
    });

    const [news, setNews] = useState<NewsItem[]>(() => {
        try {
            const saved = localStorage.getItem('cceabt_news');
            return saved ? JSON.parse(saved) : initialNews;
        } catch (error) {
            console.error('Error parsing news from localStorage', error);
            return initialNews;
        }
    });

    const [resources, setResources] = useState<ResourceItem[]>(() => {
        try {
            const saved = localStorage.getItem('cceabt_resources');
            return saved ? JSON.parse(saved) : initialResources;
        } catch (error) {
            console.error('Error parsing resources from localStorage', error);
            return initialResources;
        }
    });

    const [partners, setPartners] = useState<PartnerItem[]>(() => {
        try {
            const savedPartners = localStorage.getItem('cceabt_partners_v16');
            return savedPartners ? JSON.parse(savedPartners) : initialPartners;
        } catch (error) {
            console.error('Error parsing partners from localStorage', error);
            return initialPartners;
        }
    });

    const [submissions, setSubmissions] = useState<Submission[]>(() => {
        try {
            const saved = localStorage.getItem('cceabt_submissions');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error parsing submissions from localStorage', error);
            return [];
        }
    });


    // Helper to persist to localStorage
    useEffect(() => { localStorage.setItem('cceabt_drive_url', driveUrl); }, [driveUrl]);
    useEffect(() => { localStorage.setItem('cceabt_news', JSON.stringify(news)); }, [news]);
    useEffect(() => { localStorage.setItem('cceabt_resources', JSON.stringify(resources)); }, [resources]);
    useEffect(() => {
        localStorage.setItem('cceabt_partners_v16', JSON.stringify(partners));
    }, [partners]);
    useEffect(() => { localStorage.setItem('cceabt_submissions', JSON.stringify(submissions)); }, [submissions]);

    // Sync across tabs
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cceabt_drive_url' && e.newValue) setDriveUrl(e.newValue);
            try {
                if (e.key === 'cceabt_partners_v10' && e.newValue) setPartners(JSON.parse(e.newValue));
                if (e.key === 'cceabt_news' && e.newValue) setNews(JSON.parse(e.newValue));
                if (e.key === 'cceabt_resources' && e.newValue) setResources(JSON.parse(e.newValue));
                if (e.key === 'cceabt_submissions' && e.newValue) setSubmissions(JSON.parse(e.newValue));
            } catch (error) {
                console.error('Error syncing storage change', error);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    // --- Actions ---

    const addNews = (item: Omit<NewsItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setNews(prev => [newItem, ...prev]);
    };

    const deleteNews = (id: string) => {
        setNews(prev => prev.filter(item => item.id !== id));
    };


    const addResource = (item: Omit<ResourceItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setResources(prev => [newItem, ...prev]);
    };

    const deleteResource = (id: string) => {
        setResources(prev => prev.filter(item => item.id !== id));
    };

    const addPartner = (item: Omit<PartnerItem, 'id'>) => {
        const newItem = { ...item, id: Date.now().toString() };
        setPartners(prev => [newItem, ...prev]);
    };

    const deletePartner = (id: string) => {
        setPartners(prev => prev.filter(item => item.id !== id));
    };

    const updatePartner = (id: string, updates: Partial<PartnerItem>) => {
        setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const addSubmission = (item: Omit<Submission, 'id' | 'date'> & { status?: Submission['status'] }) => {
        const newSubmission: Submission = {
            ...item,
            id: Date.now().toString(),
            status: item.status || 'en_attente',
            date: new Date().toLocaleDateString('fr-FR')
        };
        setSubmissions(prev => [newSubmission, ...prev]);
    };

    const deleteSubmission = (id: string) => {
        setSubmissions(prev => prev.filter(s => s.id !== id));
    };

    const updateSubmissionStatus = (id: string, status: Submission['status']) => {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };


    const updateNews = (id: string, updates: Partial<NewsItem>) => {
        setNews(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };


    return (
        <DataContext.Provider value={{
            driveUrl, setDriveUrl,
            news, addNews, deleteNews, updateNews,
            resources, addResource, deleteResource,
            partners, addPartner, deletePartner, updatePartner, setPartners, initialPartners,
            submissions, addSubmission, deleteSubmission, updateSubmissionStatus
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
