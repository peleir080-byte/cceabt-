import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronRight, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type pour une image de galerie
type GalleryItem = {
    id: number;
    src: string;
    title: string;
    category: 'event' | 'field' | 'conference' | 'portrait';
    date: string;
    size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
    color: string; // Pour le fond de la tuile si pas d'image ou overlay
};

const galleryData: GalleryItem[] = [
    { id: 1, src: '/images/1.jpg', title: 'Mission Savanes', category: 'field', date: 'Mars 2024', size: 'large', color: 'bg-blue-600' },
    { id: 2, src: '/images/2.jpg', title: 'Conférence EHA', category: 'conference', date: 'Fév 2024', size: 'medium', color: 'bg-green-600' },
    { id: 3, src: '/images/3.jpg', title: 'Formation', category: 'event', date: 'Jan 2024', size: 'small', color: 'bg-purple-600' },
    { id: 4, src: '/images/4.jpg', title: 'Accès Eau', category: 'field', date: 'Déc 2023', size: 'wide', color: 'bg-orange-500' },
    { id: 5, src: '/images/DSC08851.jpeg', title: 'Assemblée Générale', category: 'event', date: 'Nov 2023', size: 'tall', color: 'bg-red-500' },
    { id: 6, src: '/images/back cceabt.jpeg', title: 'Equipe CCEABT', category: 'portrait', date: 'Oct 2023', size: 'medium', color: 'bg-teal-600' },
    { id: 7, src: '/images/cceabt_cover.jpg', title: 'Partenariat', category: 'conference', date: 'Sept 2023', size: 'small', color: 'bg-indigo-600' },
    { id: 8, src: '/images/eau.jpeg', title: 'Source Potable', category: 'field', date: 'Août 2023', size: 'large', color: 'bg-cyan-600' },
    { id: 9, src: '/images/1.jpg', title: 'Sensibilisation', category: 'field', date: 'Juil 2023', size: 'tall', color: 'bg-pink-600' },
    { id: 10, src: '/images/2.jpg', title: 'Rencontre', category: 'event', date: 'Juin 2023', size: 'medium', color: 'bg-lime-600' },
];

const categories = [
    { id: 'all', label: 'Tout voir' },
    { id: 'field', label: 'Terrain' },
    { id: 'event', label: 'Événements' },
    { id: 'conference', label: 'Conférences' },
];

export default function Gallery() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

    const filteredData = filter === 'all'
        ? galleryData
        : galleryData.filter(item => item.category === filter);

    // Fonction pour déterminer la classe CSS de la tuile selon sa taille "Metro"
    const getTileClass = (size: string) => {
        switch (size) {
            case 'large': return 'col-span-2 row-span-2';
            case 'wide': return 'col-span-2 row-span-1';
            case 'tall': return 'col-span-1 row-span-2';
            case 'medium': return 'col-span-1 row-span-1';
            case 'small': return 'col-span-1 row-span-1'; // Petit carré de base
            default: return 'col-span-1 row-span-1';
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20 pb-10 overflow-x-hidden">

            {/* Header Metro Style */}
            <div className="container mx-auto px-6 md:px-12 mb-12 mt-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white mb-2 flex items-center gap-2 transition-colors">
                            <ChevronRight className="rotate-180" size={20} /> Retour
                        </button>
                        <h1 className="text-5xl md:text-6xl font-light tracking-tight">
                            Médiathèque <span className="font-bold text-blue-500">CCEABT</span>
                        </h1>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-6 py-2 uppercase text-sm font-bold tracking-wider transition-all border-2 ${filter === cat.id
                                    ? 'border-white bg-white text-slate-900'
                                    : 'border-slate-700 hover:border-slate-500 text-slate-300'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Metro Grid Layout */}
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] gap-2 md:gap-4"
                >
                    {filteredData.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3 }}
                            key={item.id}
                            className={`group relative cursor-pointer overflow-hidden shadow-lg ${getTileClass(item.size)} ${item.color}`}
                            onClick={() => setSelectedImage(item)}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Overlay au survol façon Metro (glissement depuis le bas) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                                    <p className="text-slate-300 text-xs mt-1">{item.date}</p>
                                </div>
                            </div>

                            {/* Icone Zoom au centre */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Tuile "Dossier Complet" Statique */}
                    <div className="col-span-1 row-span-1 bg-blue-600 p-4 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-500 transition-colors">
                        <Share2 size={32} className="mb-2" />
                        <span className="font-bold text-sm">Voir le Drive</span>
                    </div>

                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-6xl max-h-[90vh] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl border-4 border-slate-800"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-6 text-white translate-y-full md:translate-y-0">
                                <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-300 mt-1">
                                    <span className="uppercase tracking-wider font-semibold text-blue-400">{selectedImage.category}</span>
                                    <span>•</span>
                                    <span>{selectedImage.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
