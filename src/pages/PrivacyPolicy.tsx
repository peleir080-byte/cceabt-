import { motion } from 'framer-motion';
import { Eye, ShieldCheck, Database, Bell } from 'lucide-react';

import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t('privacy_policy.title')}</h1>
                        <div className="h-1.5 w-24 bg-green-600 mx-auto rounded-full"></div>
                        <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
                            {t('privacy_policy.intro')}
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12 space-y-12 text-gray-700">

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Database className="text-green-600" size={28} />
                                    {t('privacy_policy.section_1_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('privacy_policy.section_1_text')}
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>{t('privacy_policy.section_1_li_1')}</li>
                                    <li>{t('privacy_policy.section_1_li_2')}</li>
                                    <li>{t('privacy_policy.section_1_li_3')}</li>
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Eye className="text-green-600" size={28} />
                                    {t('privacy_policy.section_2_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('privacy_policy.section_2_text')}
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>{t('privacy_policy.section_2_li_1')}</li>
                                    <li>{t('privacy_policy.section_2_li_2')}</li>
                                    <li>{t('privacy_policy.section_2_li_3')}</li>
                                </ul>
                                <p className="font-bold text-green-700 bg-green-50 p-4 rounded-xl">
                                    {t('privacy_policy.section_2_note')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <ShieldCheck className="text-green-600" size={28} />
                                    {t('privacy_policy.section_3_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('privacy_policy.section_3_text')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-green-900">
                                    <Bell className="text-green-600" size={28} />
                                    {t('privacy_policy.section_4_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('privacy_policy.section_4_text')} <span className="font-bold text-blue-600">info@cceabt.org</span>.
                                </p>
                            </section>

                        </div>
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        {t('privacy_policy.last_update')}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
