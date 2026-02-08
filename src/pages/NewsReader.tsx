import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';
import { Calendar, Tag, ChevronLeft, ChevronRight, Share2, Globe, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NewsReader() {
    const { t } = useTranslation();
    const { news } = useData();
    const navigate = useNavigate();
    const { id } = useParams();
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter and sort news by date (most recent first)
    const sortedNews = [...news].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Find initial index based on URL ID
    const initialIndex = sortedNews.findIndex(n => n.id === id);
    const startIndex = initialIndex !== -1 ? initialIndex : 0;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 overflow-hidden flex flex-col">
            {/* Premium Header */}
            <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={() => navigate('/news')}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
                >
                    <ChevronLeft size={20} />
                    <span className="font-medium">{t('news_page.back_to_list') || 'Retour aux actualités'}</span>
                </button>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-white font-bold text-sm tracking-widest uppercase">CCEABT Digital Journal</span>
                        <span className="text-blue-400 text-xs font-medium uppercase tracking-tighter">Edition {new Date().getFullYear()}</span>
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Globe className="text-white" size={20} />
                    </div>
                </div>
            </div>

            {/* Horizontal Scrolling Sheets Container */}
            <div
                ref={containerRef}
                className="flex-grow flex items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 px-[10vw] py-12"
                style={{ scrollBehavior: 'smooth' }}
            >
                {sortedNews.map((item, index) => (
                    <motion.article
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] h-[75vh] snap-center relative group"
                    >
                        {/* Sheet Background / Shadow Overlay */}
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 flex flex-col relative z-10 transition-transform duration-500 group-hover:-translate-y-2">

                            {/* Image Section */}
                            <div className="h-1/2 relative overflow-hidden">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                        <Globe size={80} strokeWidth={1} />
                                    </div>
                                )}

                                {/* Image Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                                        {item.category}
                                    </span>
                                </div>

                                <div className="absolute bottom-4 left-6 flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg text-slate-600">
                                        <Calendar size={14} className="text-blue-600" />
                                        <span className="text-xs font-bold">{item.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur shadow-sm rounded-lg text-slate-600">
                                        <Clock size={14} className="text-blue-600" />
                                        <span className="text-xs font-bold">5 min read</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 lg:p-12 flex flex-col flex-1 overflow-y-auto custom-scrollbar">
                                <h2 className="text-2xl lg:text-4xl font-black text-slate-900 mb-6 leading-tight font-serif italic">
                                    {item.title}
                                </h2>

                                <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                                    {/* Since data might just be excerpt, we use that or simulate more content */}
                                    <p className="font-medium text-slate-800 border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/50">
                                        {item.excerpt}
                                    </p>
                                    <p>
                                        {/* Placeholder for full content if not available in data */}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                    <p>
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>
                                </div>

                                {/* Footer of the Sheet */}
                                <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            C
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 uppercase">Rédaction CCEABT</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Division Communication</p>
                                        </div>
                                    </div>

                                    <button className="p-3 rounded-full hover:bg-slate-50 text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-slate-100">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Pagination hint */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-xs font-bold uppercase tracking-[0.3em]">
                            Sheet {index + 1} / {sortedNews.length}
                        </div>
                    </motion.article>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-8 px-8 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                <button
                    onClick={() => {
                        if (containerRef.current) containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                    }}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <ChevronLeft size={32} />
                </button>
                <div className="flex items-center gap-1">
                    {sortedNews.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${Math.floor((containerRef.current?.scrollLeft || 0) / window.innerWidth) === i
                                    ? 'w-8 bg-blue-500'
                                    : 'w-1.5 bg-white/20'
                                }`}
                        />
                    ))}
                </div>
                <button
                    onClick={() => {
                        if (containerRef.current) containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                    }}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}} />
        </div>
    );
}
