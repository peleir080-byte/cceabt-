import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, Briefcase, Share2, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TogoMap from '../components/TogoMap';

const OrgCard = ({ icon: Icon, title, role, color, description, customContent }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden min-h-[400px]"
    >
        {/* Decorative Background Elements */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10 -mr-20 -mt-20 ${color.replace('text-', 'bg-')}`}></div>
        <div className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-5 -ml-10 -mb-10 ${color.replace('text-', 'bg-')}`}></div>

        <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                    <Icon size={40} />
                </div>

                <div className="flex-1">
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">{title}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${color.replace('text-', 'bg-').replace('600', '100')} ${color}`}>
                        {role}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-xl mb-8 max-w-3xl">
                        {description}
                    </p>

                    {customContent}
                </div>
            </div>
        </div>
    </motion.div>
);

export default function Organization() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('ag');
    const [hoveredPlatform, setHoveredPlatform] = useState<any>(null); // State for map hover

    const tabs = [
        {
            id: 'ag',
            label: "Assemblée Générale",
            icon: Users,
            color: 'text-blue-600',
            gradient: 'from-blue-500 to-blue-600',
            ring: 'ring-blue-200',
            role: "Organe Suprême",
            description: "Composée de tous les membres effectifs, elle définit la politique générale, adopte les statuts et élit les membres du Conseil d'Administration. C'est le cœur démocratique du réseau."
        },
        {
            id: 'ca',
            label: "Conseil d'Administration",
            icon: Target,
            color: 'text-green-600',
            gradient: 'from-green-500 to-green-600',
            ring: 'ring-green-200',
            role: "Pilotage Stratégique",
            description: "Constitué de 7 membres élus, il veille à l'application des décisions de l'AG, approuve les programmes et budgets, et supervise le Secrétariat Exécutif."
        },
        {
            id: 'se',
            label: "Secrétariat Exécutif",
            icon: Briefcase,
            color: 'text-purple-600',
            gradient: 'from-purple-500 to-purple-600',
            ring: 'ring-purple-200',
            role: "Coordination Opérationnelle",
            description: "L'organe permanent chargé de la mise en œuvre quotidienne des activités, de la gestion des projets et de l'animation du réseau."
        },
        {
            id: 'platforms',
            label: "Plateformes",
            icon: Share2,
            color: 'text-orange-600',
            gradient: 'from-orange-500 to-orange-600',
            ring: 'ring-orange-200',
            role: "Ancrage Territorial",
            description: "6 Plateformes Régionales et plus de 30 points focaux pour une action au plus près des populations.",
        },
    ];

    const activeTabData = tabs.find(t => t.id === activeTab);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 relative">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-20 transform -translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
                            Gouvernance Transparente
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            L'Architecture du <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">CCEABT</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Une organisation pyramidale inversée, où la base décisionnelle est large et l'exécution ciblée.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Central Icon Navigation */}
            <div className="container mx-auto px-4 mb-16 relative z-20">
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {tabs.map((tab, index) => (
                        <motion.button
                            key={tab.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group flex flex-col items-center gap-3 transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'hover:scale-105 opacity-90 hover:opacity-100'
                                }`}
                        >
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center transition-all duration-300 border-[3px] ${activeTab === tab.id
                                ? `bg-gradient-to-br ${tab.gradient} border-white text-white`
                                : `bg-white border-white ${tab.color} group-hover:bg-gray-50`
                                }`}>
                                <tab.icon size={36} className="relative z-10" strokeWidth={activeTab === tab.id ? 2 : 2} />
                            </div>
                            <span className={`font-bold text-sm md:text-base transition-colors ${activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                {tab.label}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'platforms' ? (
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
                                <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                                    <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
                                        <Share2 size={32} />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-3xl font-bold text-gray-900">Plateformes Régionales</h3>
                                        <p className="text-orange-600 font-bold uppercase text-xs tracking-wider mt-1">Ancrage Territorial</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-lg mb-10 leading-relaxed text-center md:text-left max-w-3xl mx-auto md:mx-0">
                                    Le CCEABT est organisé en plateformes régionales autonomes qui coordonnent les activités des OSC membres dans leur zone respective. Sélectionnez une région sur la carte pour voir les détails.
                                </p>

                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
                                        <TogoMap onHover={setHoveredPlatform} />
                                        <p className="text-center text-sm text-gray-400 mt-4 italic">Survolez une région pour voir les détails</p>
                                    </div>

                                    <div className="flex flex-col justify-center space-y-8">
                                        <AnimatePresence mode="wait">
                                            {hoveredPlatform ? (
                                                <motion.div
                                                    key="hover-info"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    <div className={`p-6 rounded-2xl ${hoveredPlatform.color} bg-opacity-10 border border-opacity-20 ${hoveredPlatform.color.replace('bg-', 'border-')}`}>
                                                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${hoveredPlatform.color.replace('bg-', 'text-')}`}>
                                                            Plateforme Régionale
                                                        </h4>
                                                        <h3 className="text-3xl font-black text-gray-900 mb-2">
                                                            {hoveredPlatform.label}
                                                        </h3>
                                                        <div className={`text-xl font-bold mb-4 ${hoveredPlatform.color.replace('bg-', 'text-')}`}>
                                                            {hoveredPlatform.org}
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {hoveredPlatform.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="default-info"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="space-y-6"
                                                >
                                                    <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                                                        <div className="flex items-start gap-4">
                                                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                                                <MapPin size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-xl text-blue-900 mb-2">Couverture Nationale</h4>
                                                                <p className="text-blue-800/80 leading-relaxed">
                                                                    Présence active dans les 5 régions économiques du Togo ainsi que le Grand Lomé.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                                                        <div className="flex items-start gap-4">
                                                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                                                <Users size={24} />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-xl text-green-900 mb-2">Coordination Locale</h4>
                                                                <p className="text-green-800/80 leading-relaxed">
                                                                    Chaque plateforme dispose d'un bureau exécutif régional élu par les membres locaux.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <OrgCard
                                {...activeTabData}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* CTA Final */}
            <section className="py-24 mt-20 bg-slate-900 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8">Envie de rejoindre cette dynamique ?</h2>
                    <button
                        onClick={() => navigate('/join')}
                        className="inline-flex items-center gap-2 bg-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
                    >
                        Devenir membre
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
}
