import { Target, Eye, Heart, Users, TrendingUp, Handshake, CheckCircle, Briefcase, Share2, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    timelineRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections(prev => new Set(prev).add(index));
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Palo Alto Wheel Logic (Auto-playing Slider)
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % totalSteps);
    }, 10000); // Changed from 6000ms to 10000ms to slow down animation
    return () => clearInterval(interval);
  }, []);

  // Définir la rotation cible basée sur l'étape active
  const wheelRotation = activeStep * 120; // 0, 120, 240 degrés

  const wheelItems = [
    {
      title: t('about.journey_title'),
      subtitle: t('about.journey_subtitle'),
      icon: TrendingUp,
      color: "from-green-500 to-green-700",
      bg: "bg-green-50",
      textColor: "text-green-700",
      content: (
        <div className="space-y-6">
          <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
            <h4 className="text-red-800 font-bold mb-2 text-sm">{t('about.journey_history_title')}</h4>
            <p className="text-[11px] text-red-600 leading-relaxed font-medium">
              {t('about.journey_history_desc')}
            </p>
          </div>

          <p className="text-xs text-gray-500 font-semibold text-center italic">
            {t('about.journey_transition')}
          </p>

          <div className="bg-gradient-to-br from-green-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-black">60+</div>
              <Users size={24} className="opacity-50" />
            </div>
            <p className="font-bold mb-2">{t('about.journey_voice_title')}</p>
            <p className="text-xs text-green-50 opacity-80 leading-relaxed">
              {t('about.journey_voice_desc')}
            </p>
          </div>
        </div>
      )
    },
    {
      title: t('about.values_title'),
      subtitle: t('about.values_subtitle'),
      icon: Heart,
      color: "from-purple-500 to-purple-700",
      bg: "bg-purple-50",
      textColor: "text-purple-700",
      content: (
        <div className="grid grid-cols-1 gap-3">
          {[
            { t: t('about.values_engagement_t'), d: t('about.values_engagement_d') },
            { t: t('about.values_integrity_t'), d: t('about.values_integrity_d') },
            { t: t('about.values_transparency_t'), d: t('about.values_transparency_d') },
            { t: t('about.values_solidarity_t'), d: t('about.values_solidarity_d') },
            { t: t('about.values_diversity_t'), d: t('about.values_diversity_d') },
          ].map((v, i) => (
            <div key={i} className="flex items-start gap-4 bg-white p-3 rounded-2xl shadow-sm border border-purple-50">
              <CheckCircle className="text-purple-600 mt-1 flex-shrink-0" size={18} />
              <div>
                <p className="font-bold text-gray-900 text-sm">{v.t}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: t('about.principles_title'),
      subtitle: t('about.principles_subtitle'),
      icon: Handshake,
      color: "from-blue-500 to-blue-700",
      bg: "bg-blue-50",
      textColor: "text-blue-700",
      content: (
        <div className="space-y-4">
          {[
            { t: t('about.principles_partnership_t'), d: t('about.principles_partnership_d') },
            { t: t('about.principles_mutualization_t'), d: t('about.principles_mutualization_d') },
            { t: t('about.principles_learning_t'), d: t('about.principles_learning_d') },
          ].map((p, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl border border-blue-50 shadow-sm">
              <h4 className="font-bold text-blue-800 mb-1">{p.t}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div>
      {/* Hero Section - Full screen with stats overlay */}
      <section className="relative min-h-[90vh] flex items-center text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/4.jpg"
            alt="À propos du CCEABT"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-green-900/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold">
              {t('about.since_2013')}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight animate-fade-in">
              {t('about.hero_title')}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('about.hero_desc')}
            </p>
          </div>

          {/* Stats Grid Overlay */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">60</div>
              <div className="text-blue-100 font-medium">{t('about.stat_members')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-green-200 to-white bg-clip-text text-transparent">70.8%</div>
              <div className="text-green-100 font-medium">{t('about.stat_coverage')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">12+</div>
              <div className="text-purple-100 font-medium">{t('about.stat_years')}</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
              <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">8.3M</div>
              <div className="text-yellow-100 font-medium">{t('about.stat_population')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Summary */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-blue-50 p-10 rounded-[3rem] border border-blue-100 relative overflow-hidden group">
              <Eye className="absolute -right-8 -bottom-8 text-blue-200 opacity-20 w-48 h-48 group-hover:rotate-12 transition-transform duration-700" />
              <h3 className="text-3xl font-black text-blue-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                  <Eye size={24} />
                </div>
                {t('about.vision_title')}
              </h3>
              <p className="text-xl text-blue-800 leading-relaxed">
                {t('about.vision_desc')}
              </p>
            </div>
            <div className="bg-green-50 p-10 rounded-[3rem] border border-green-100 relative overflow-hidden group">
              <Target className="absolute -right-8 -bottom-8 text-green-200 opacity-20 w-48 h-48 group-hover:-rotate-12 transition-transform duration-700" />
              <h3 className="text-3xl font-black text-green-900 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white">
                  <Target size={24} />
                </div>
                {t('about.mission_title')}
              </h3>
              <ul className="text-lg text-green-800 leading-relaxed text-left space-y-2 list-disc pl-5">
                <li>{t('about.mission_desc_1')}</li>
                <li>{t('about.mission_desc_2')}</li>
                <li>{t('about.mission_desc_3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Palo Alto Style Interaction Section (Auto-Slider) */}
      <section className="relative py-24 bg-slate-50 overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* Left: The Spinning Wheel (Auto-rotating) */}
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex-shrink-0">
              <motion.div
                animate={{ rotate: -wheelRotation }}
                transition={{ type: "spring", stiffness: 40, damping: 15 }}
                className="relative w-full h-full rounded-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <path
                    d="M 50,50 L 50,0 A 50,50 0 0,1 93.3,75 Z"
                    className={`transition-all duration-500 cursor-pointer ${activeStep === 0 ? 'fill-purple-600' : 'fill-slate-200 opacity-40'}`}
                    onClick={() => setActiveStep(0)}
                  />
                  <path
                    d="M 50,50 L 93.3,75 A 50,50 0 0,1 6.7,75 Z"
                    className={`transition-all duration-500 cursor-pointer ${activeStep === 1 ? 'fill-blue-600' : 'fill-slate-200 opacity-40'}`}
                    onClick={() => setActiveStep(1)}
                  />
                  <path
                    d="M 50,50 L 6.7,75 A 50,50 0 0,1 50,0 Z"
                    className={`transition-all duration-500 cursor-pointer ${activeStep === 2 ? 'fill-green-600' : 'fill-slate-200 opacity-40'}`}
                    onClick={() => setActiveStep(2)}
                  />
                </svg>

                <div className="absolute inset-0">
                  {wheelItems.map((item, idx) => {
                    // Center angles: 60, 180, 300
                    const positions = [
                      { top: '32.5%', left: '80.3%' }, // 60 deg
                      { top: '85%', left: '50%' },    // 180 deg
                      { top: '32.5%', left: '19.7%' }  // 300 deg
                    ];
                    return (
                      <div
                        key={idx}
                        className="absolute transition-all duration-500 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          top: positions[idx].top,
                          left: positions[idx].left
                        }}
                      >
                        <motion.div
                          animate={{ rotate: wheelRotation }}
                          transition={{ type: "spring", stiffness: 40, damping: 15 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div
                            onClick={() => setActiveStep(idx)}
                            className={`p-4 rounded-full shadow-lg border-2 border-white transition-all duration-500 cursor-pointer ${activeStep === idx ? 'bg-white scale-125 shadow-xl' : 'bg-slate-100 opacity-60'}`}
                          >
                            <item.icon className={activeStep === idx ? item.textColor : 'text-slate-400'} size={activeStep === idx ? 32 : 24} />
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center shadow-2xl z-20 border-4 border-slate-50">
                <div className="text-center p-4">
                  <img src="/images/logo CCEABT.png" alt="Logo" className="h-10 md:h-16 mx-auto mb-2" />
                  <div className="h-1 w-8 bg-blue-600 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Content */}
            <div className="flex-1 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                >
                  <span className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 bg-white shadow-sm ${wheelItems[activeStep].textColor}`}>
                    {wheelItems[activeStep].subtitle}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                    {wheelItems[activeStep].title}
                  </h3>

                  <div className="relative">
                    {wheelItems[activeStep].content}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 flex items-center gap-4">
                {wheelItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${activeStep === i ? 'w-16 bg-blue-600' : 'w-3 bg-slate-200 hover:bg-slate-300'}`}
                  />
                ))}
                <span className="ml-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {activeStep + 1} / {totalSteps}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Notre histoire - Modern Timeline */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">{t('about.timeline_badge')}</span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">{t('about.timeline_title')}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.timeline_subtitle')}</p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-green-600 to-purple-600 opacity-20"></div>
              <div
                className="absolute left-6 top-0 w-1 bg-gradient-to-b from-blue-600 via-green-600 to-purple-600 transition-all duration-[2500ms]"
                style={{
                  height: visibleSections.size > 0 ? '100%' : '0%',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              ></div>

              <div className="space-y-12">
                <div
                  ref={el => timelineRefs.current[0] = el}
                  className={`relative pl-20 transition-all duration-[1200ms] ${visibleSections.has(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className={`absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 transition-opacity duration-1000 ${visibleSections.has(0) ? 'opacity-50 animate-pulse' : ''}`}></div>
                    <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">2013</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border-l-4 border-blue-600">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{t('about.timeline_2013_t')}</h3>
                    <p className="mb-6 text-gray-700 leading-relaxed">{t('about.timeline_2013_d')}</p>
                    <div className="bg-white p-6 rounded-xl border-l-4 border-red-500">
                      <p className="font-bold text-red-700 mb-2">{t('about.journey_history_title')}</p>
                      <p className="text-sm">{t('about.journey_history_desc')}</p>
                    </div>
                  </div>
                </div>

                <div
                  ref={el => timelineRefs.current[1] = el}
                  className={`relative pl-20 transition-all duration-[1100ms] delay-200 ${visibleSections.has(1) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'}`}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className="relative bg-gradient-to-br from-green-500 to-green-700 text-white font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">2018</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-xl border-l-4 border-green-600">
                    <h3 className="text-2xl font-bold text-green-900">{t('about.timeline_2018_t')}</h3>
                    <p className="text-gray-700 leading-relaxed">{t('about.timeline_2018_d')}</p>
                  </div>
                </div>

                <div
                  ref={el => timelineRefs.current[3] = el}
                  className={`relative pl-20 transition-all duration-[1400ms] delay-400 ${visibleSections.has(3) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-28'}`}
                >
                  <div className="absolute left-0 top-0 group">
                    <div className="relative bg-gradient-to-br from-blue-600 to-green-600 text-white font-bold text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-2xl">✓</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-8 rounded-2xl shadow-2xl border-2 border-blue-400">
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">{t('about.timeline_today_t')}</h3>
                    <p className="text-blue-700 font-bold mb-6">{t('about.timeline_today_d')}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <li className="bg-blue-50 p-3 rounded-lg"><CheckCircle className="inline mr-2 text-blue-600" size={16} /> {t('about.timeline_org_ga')}</li>
                      <li className="bg-green-50 p-3 rounded-lg"><CheckCircle className="inline mr-2 text-green-600" size={16} /> {t('about.timeline_org_ca')}</li>
                      <li className="bg-purple-50 p-3 rounded-lg"><CheckCircle className="inline mr-2 text-purple-600" size={16} /> {t('about.timeline_org_se')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOUVERNANCE */}
      {/* GOUVERNANCE CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6 border border-blue-500/30">
                Structure & Organisation
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Comment sommes-nous <span className="text-blue-400">organisés</span> ?
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Le CCEABT repose sur une gouvernance démocratique et transparente, structurée autour de plusieurs organes clés garantissant notre efficacité et notre ancrage local sur toute l'étendue du territoire.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/organization')}
                  className="group bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-3"
                >
                  Découvrir notre organigramme
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
                  <Users className="text-blue-400 mb-3" size={32} />
                  <h4 className="font-bold text-lg">Assemblée Générale</h4>
                  <p className="text-xs text-slate-400">Organe suprême</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
                  <Target className="text-green-400 mb-3" size={32} />
                  <h4 className="font-bold text-lg">Conseil d'Admin</h4>
                  <p className="text-xs text-slate-400">Pilotage stratégique</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
                  <Briefcase className="text-purple-400 mb-3" size={32} />
                  <h4 className="font-bold text-lg">Secrétariat Exécutif</h4>
                  <p className="text-xs text-slate-400">Coordination</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
                  <Share2 className="text-orange-400 mb-3" size={32} />
                  <h4 className="font-bold text-lg">Plateformes</h4>
                  <p className="text-xs text-slate-400">Ancrage local</p>
                </div>
              </div>

              {/* Decorative Circle behind cards */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-blue-600 to-green-600 rounded-full blur-2xl opacity-20 -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NOS ACTIONS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('about.actions_title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.actions_subtitle')}</p>
          </div>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{t('about.actions_1_t')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="text-blue-600 flex-shrink-0" size={18} /> {t('about.actions_1_l1')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-blue-600 flex-shrink-0" size={18} /> {t('about.actions_1_l2')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-blue-600 flex-shrink-0" size={18} /> {t('about.actions_1_l3')}</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-green-600">
              <h3 className="text-2xl font-bold text-green-900 mb-4">{t('about.actions_2_t')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600 flex-shrink-0" size={18} /> {t('about.actions_2_l1')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600 flex-shrink-0" size={18} /> {t('about.actions_2_l2')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600 flex-shrink-0" size={18} /> {t('about.actions_2_l3')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600 flex-shrink-0" size={18} /> {t('about.actions_2_l4')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-green-600 flex-shrink-0" size={18} /> {t('about.actions_2_l5')}</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-purple-600">
              <h3 className="text-2xl font-bold text-purple-900 mb-4">{t('about.actions_3_t')}</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2"><CheckCircle className="text-purple-600 flex-shrink-0" size={18} /> {t('about.actions_3_l1')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-purple-600 flex-shrink-0" size={18} /> {t('about.actions_3_l2')}</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-purple-600 flex-shrink-0" size={18} /> {t('about.actions_3_l3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Réalisations Concrètes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t('about.achievements_title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('about.achievements_subtitle')}</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[
                { year: "2025", text: t('about.ach_2025_1'), color: "border-blue-500 text-blue-500" },
                { year: "2025", text: t('about.ach_2025_2'), color: "border-blue-500 text-blue-500" },
                { year: "2024", text: t('about.ach_2024'), color: "border-green-500 text-green-500" },
                { year: "2023", text: t('about.ach_2023_1'), color: "border-purple-500 text-purple-500" },
                { year: "2023", text: t('about.ach_2023_2'), color: "border-purple-500 text-purple-500" },
                { year: "2021", text: t('about.ach_2021'), color: "border-yellow-500 text-yellow-500" },
                { year: "2020", text: t('about.ach_2020'), color: "border-red-500 text-red-500" },
              ].map((item, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className={`w-3 h-3 rounded-full ${item.color.split(' ')[0].replace('border-', 'bg-')}`}></div>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border border-slate-100">
                    <div className={`font-bold text-sm mb-1 ${item.color.split(' ')[1]}`}>{item.year}</div>
                    <div className="text-gray-700 leading-relaxed font-medium">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Résultats et impacts */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">{t('about.results_title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="mx-auto mb-6 text-blue-200" size={40} />
              <p className="text-lg font-bold leading-tight">{t('about.res_1')}</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Users className="mx-auto mb-6 text-green-200" size={40} />
              <p className="text-lg font-bold leading-tight">{t('about.res_2')}</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Handshake className="mx-auto mb-6 text-purple-200" size={40} />
              <p className="text-lg font-bold leading-tight">{t('about.res_3')}</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300">
              <Target className="mx-auto mb-6 text-yellow-200" size={40} />
              <p className="text-lg font-bold leading-tight">{t('about.res_4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold mb-8">{t('about.cta_join')}</h2>
          <button
            onClick={() => navigate('/network')}
            className="bg-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all"
          >
            {t('about.cta_button')}
          </button>
        </div>
      </section>
    </div>
  );
}
