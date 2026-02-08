import { useState, useMemo } from 'react';
import { Search, Filter, Download, FileText, Calendar, Tag, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useData } from '../context/DataContext';

export default function Resources() {
    const { t } = useTranslation();
    const { resources, driveUrl } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTheme, setSelectedTheme] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<string>('all');

    const themes = Array.from(new Set(resources.map(r => r.theme))).sort();
    const years = Array.from(new Set(resources.map(r => r.year))).sort((a, b) => Number(b) - Number(a));

    const filteredResources = useMemo(() => {
        return resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.author?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTheme = selectedTheme === 'all' || resource.theme === selectedTheme;
            const matchesYear = selectedYear === 'all' || resource.year.toString() === selectedYear;

            return matchesSearch && matchesTheme && matchesYear;
        });
    }, [searchTerm, selectedTheme, selectedYear]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black mb-6">{t('resources_page.hero_title')}</h1>
                            <p className="text-blue-100 text-xl leading-relaxed mb-8">
                                {t('resources_page.hero_desc')}
                                <span className="block mt-2 font-semibold text-yellow-400">{t('resources_page.drive_info')}</span>
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <a
                                    href={driveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-5 h-5" />
                                    </div>
                                    {t('resources_page.full_folder')}
                                </a>
                            </div>
                        </div>
                        <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-yellow-400/20 rounded-2xl">
                                    <FileText className="text-yellow-400" size={40} />
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black">{resources.length}</div>
                                    <div className="text-blue-200 text-sm font-bold uppercase tracking-wider">{t('resources_page.docs_count')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filtres */}
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-xl shadow-md sticky top-28">
                            <div className="flex items-center gap-2 mb-6 text-gray-800 border-b pb-4">
                                <Filter size={20} className="text-blue-600" />
                                <h2 className="font-bold text-lg">{t('resources_page.filter')}</h2>
                            </div>

                            {/* Recherche */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('resources_page.search')}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={t('resources_page.search_placeholder')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                </div>
                            </div>

                            {/* Filtre Thème */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('resources_page.theme')}</label>
                                <select
                                    value={selectedTheme}
                                    onChange={(e) => setSelectedTheme(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="all">{t('resources_page.all_themes')}</option>
                                    {themes.map(theme => (
                                        <option key={theme} value={theme}>{theme}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtre Année */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t('resources_page.year')}</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="all">{t('resources_page.all_years')}</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedTheme('all'); setSelectedYear('all'); }}
                                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors w-full text-center"
                                >
                                    {t('resources_page.reset')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Liste des résultats */}
                    <div className="lg:w-3/4">
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                {t('resources_page.documents_label')} ({filteredResources.length})
                            </h2>
                            {/* Optional: Sort control could go here */}
                        </div>

                        {filteredResources.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">{t('resources_page.no_results')}</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedTheme('all'); setSelectedYear('all'); }}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    {t('resources_page.clear_filters')}
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredResources.map((resource) => (
                                    <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Drive" className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                                                    <Tag size={12} /> {resource.theme}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                    <Calendar size={12} /> {resource.year}
                                                </span>
                                                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                    <User size={12} /> {resource.author}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                                {resource.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mb-3">
                                                {resource.size} • {t('resources_page.updated_at')} 01/01/2024
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 flex items-center">
                                            <a
                                                href={resource.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                                            >
                                                <Download size={16} />
                                                {t('resources_page.consult_drive')}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
