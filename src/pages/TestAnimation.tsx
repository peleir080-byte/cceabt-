import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Droplet, Sparkles, Building2, GraduationCap, ShieldCheck, Landmark, Heart, Handshake, TrendingUp } from 'lucide-react';

export default function TestAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within this container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Smoothing the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress (0 to 1) to rotation (0 to 360)
    const rotate = useTransform(smoothProgress, [0.2, 0.8], [0, 360]);

    // Icons that should stay upright need their own rotation transform
    const counterRotate = useTransform(rotate, (r: number) => -r);

    // Active step for text display
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange(v => {
            if (v < 0.3) setActiveStep(0);
            else if (v < 0.6) setActiveStep(1);
            else setActiveStep(2);
        });
    }, [scrollYProgress]);

    const wheelItems = [
        {
            title: "Eau Potable",
            subtitle: "Accès Universel",
            icon: Droplet,
            color: "bg-blue-600",
            description: "Assurer la disponibilité et la gestion durable des ressources en eau pour toutes les populations."
        },
        {
            title: "Hygiène",
            subtitle: "Bons Réflexes",
            icon: Sparkles,
            color: "bg-green-600",
            description: "Promouvoir les pratiques essentielles pour la santé et le bien-être des communautés."
        },
        {
            title: "Assainissement",
            subtitle: "Environnement Sain",
            icon: Building2,
            color: "bg-blue-800",
            description: "Mettre en place des infrastructures durables pour le traitement des eaux et des déchets."
        }
    ];

    return (
        <div ref={containerRef} className="bg-slate-900 min-h-[300vh] text-white overflow-hidden pb-20">
            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center items-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-blue-500/30"
                >
                    Expérimentation Visuelle
                </motion.div>
                <h1 className="text-6xl font-black mb-6">Effet de Rotation Palo Alto</h1>
                <p className="text-xl text-slate-400 max-w-2xl">
                    Scrollez vers le bas pour voir la roue s'animer. Cette page de test permet de valider la fluidité de l'animation avant intégration.
                </p>
                <div className="mt-12 animate-bounce flex flex-col items-center gap-2">
                    <span className="text-sm text-slate-500 uppercase tracking-widest">Scroll</span>
                    <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full"></div>
                </div>
            </section>

            {/* The Animated Section */}
            <section className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">

                    {/* Wheel Container */}
                    <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex-shrink-0">
                        {/* The Rotating Wheel */}
                        <motion.div
                            style={{ rotate }}
                            className="relative w-full h-full rounded-full flex items-center justify-center"
                        >
                            {/* background SVG circle split in 3 */}
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <path
                                    d="M 50,50 L 50,0 A 50,50 0 0,1 93.3,75 Z"
                                    className={`transition-all duration-500 ${activeStep === 0 ? 'fill-blue-600' : 'fill-slate-800'}`}
                                />
                                <path
                                    d="M 50,50 L 93.3,75 A 50,50 0 0,1 6.7,75 Z"
                                    className={`transition-all duration-500 ${activeStep === 1 ? 'fill-green-600' : 'fill-slate-800'}`}
                                />
                                <path
                                    d="M 50,50 L 6.7,75 A 50,50 0 0,1 50,0 Z"
                                    className={`transition-all duration-500 ${activeStep === 2 ? 'fill-blue-800' : 'fill-slate-800'}`}
                                />
                            </svg>

                            {/* Icons and text labels */}
                            <div className="absolute inset-0">
                                {/* Item 1 */}
                                <div className="absolute top-[18%] right-[25%] flex flex-col items-center">
                                    <motion.div style={{ rotate: counterRotate }} className="flex flex-col items-center gap-2">
                                        <div className={`p-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-500 ${activeStep === 0 ? 'bg-white text-blue-600 scale-125' : 'bg-white/10 text-white'}`}>
                                            <Droplet size={32} />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Item 2 */}
                                <div className="absolute bottom-[10%] left-[43%] flex flex-col items-center">
                                    <motion.div style={{ rotate: counterRotate }} className="flex flex-col items-center gap-2">
                                        <div className={`p-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-500 ${activeStep === 1 ? 'bg-white text-green-600 scale-125' : 'bg-white/10 text-white'}`}>
                                            <Sparkles size={32} />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Item 3 */}
                                <div className="absolute top-[18%] left-[25%] flex flex-col items-center">
                                    <motion.div style={{ rotate: counterRotate }} className="flex flex-col items-center gap-2">
                                        <div className={`p-4 rounded-full backdrop-blur-md border border-white/20 transition-all duration-500 ${activeStep === 2 ? 'bg-white text-blue-900 scale-125' : 'bg-white/10 text-white'}`}>
                                            <Building2 size={32} />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Central Hub */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl z-20 border-8 border-slate-900">
                            <div className="text-center p-6 flex flex-col items-center">
                                <span className="text-blue-600 font-black text-2xl md:text-3xl tracking-tighter">CCEABT</span>
                                <div className="w-8 h-1 bg-green-500 mt-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Text Content Area */}
                    <div className="flex-1 text-left min-h-[300px] flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="text-blue-500 font-bold uppercase tracking-[4px] text-sm mb-4 block">
                                    {wheelItems[activeStep].subtitle}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                                    {wheelItems[activeStep].title}
                                </h2>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                                    {wheelItems[activeStep].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </section>

            {/* Extra space for scrolling */}
            <section className="h-screen flex items-center justify-center relative">
                <div className="text-center">
                    <h3 className="text-4xl font-bold mb-4">Fin de l'expérience</h3>
                    <p className="text-slate-400">Cette page sera supprimée après validation.</p>
                </div>
            </section>
        </div>
    );
}
