import { motion } from 'framer-motion';

export default function TogoMap({ onHover }: { onHover: (platform: any) => void }) {

    // Invisible click/hover zones roughly mapping to the regions on the PNG
    const platforms = [
        {
            id: 'savanes',
            label: 'SAVANES',
            org: 'ONG CDD',
            description: "Coordination régionale des activités dans les Savanes.",
            // SAVANES: Top right label. Expand width to right.
            top: '0%', left: '35%', width: '60%', height: '18%',
            color: 'bg-amber-500'
        },
        {
            id: 'kara',
            label: 'KARA',
            org: 'ONG AJT',
            description: "Point focal pour la région de la Kara.",
            // KARA: Right label. Expand width to right.
            top: '18%', left: '40%', width: '55%', height: '18%',
            color: 'bg-red-500'
        },
        {
            id: 'centrale',
            label: 'CENTRALE',
            org: 'ONG ADESCO',
            description: "Gestion des projets pour la région Centrale.",
            // CENTRALE: Right label. Expand width to right.
            top: '36%', left: '35%', width: '60%', height: '20%',
            color: 'bg-green-500'
        },
        {
            id: 'plateaux',
            label: 'PLATEAUX',
            org: 'ONG ODIAE',
            description: "Supervision des initiatives dans les Plateaux.",
            // PLATEAUX: Left label. Expand width to left.
            top: '56%', left: '5%', width: '55%', height: '20%',
            color: 'bg-blue-500'
        },
        {
            id: 'maritime',
            label: 'MARITIME',
            org: 'ONG FIADI',
            description: "Action et suivi dans la région Maritime.",
            // MARITIME: Right label. 
            top: '76%', left: '45%', width: '50%', height: '15%',
            color: 'bg-indigo-500'
        },
        {
            id: 'grand-lome',
            label: 'Grand LOME',
            org: 'ONG La CDE',
            description: "Coordination spécifique pour la capitale et ses environs.",
            // GRAND LOME: Bottom Left label.
            top: '86%', left: '10%', width: '50%', height: '14%',
            color: 'bg-purple-600'
        }
    ];

    return (
        <div className="relative w-full flex items-center justify-center p-4">

            {/* Map Image container */}
            <div className="relative w-full max-w-2xl mx-auto group cursor-crosshair">
                <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src="/images/Togo.png"
                    alt="Carte du Togo avec Plateformes Régionales"
                    className="w-full object-contain drop-shadow-2xl relative z-0"
                />

                {/* Interactive Hit Zones */}
                {platforms.map((p) => (
                    <div
                        key={p.id}
                        className="absolute z-10 transition-all duration-300 hover:bg-white/20 hover:scale-105 rounded-full cursor-pointer mix-blend-overlay"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: p.width,
                            height: p.height,
                            // transform: 'translate(-50%, -50%)' // Already roughly centered by manual % stats? No, percentages above are top-left based usually, let's assume top/left is start.
                            // Actually, let's keep it simple: top/left are top-left corners of the box.
                        }}
                        onMouseEnter={() => onHover(p)}
                        onMouseLeave={() => onHover(null)}
                    >
                        {/* Glow Effect on Hover */}
                        <div className={`w-full h-full opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl ${p.color}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
