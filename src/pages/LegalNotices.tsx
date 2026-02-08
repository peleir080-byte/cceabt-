import { motion } from 'framer-motion';
import { Shield, Scale, FileText, Lock } from 'lucide-react';

import { useTranslation } from 'react-i18next';

export default function LegalNotices() {
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
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{t('legal_notices.title')}</h1>
                        <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12 space-y-12 text-gray-700">

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Scale className="text-blue-600" size={28} />
                                    {t('legal_notices.section_1_title')}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">{t('legal_notices.org_label')}</p>
                                        <p>{t('legal_notices.org_value')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">{t('legal_notices.hq_label')}</p>
                                        <p>{t('legal_notices.hq_value_1')}</p>
                                        <p>{t('legal_notices.hq_value_2')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">{t('legal_notices.contacts_label')}</p>
                                        <p>{t('legal_notices.contacts_tel')}</p>
                                        <p>{t('legal_notices.contacts_email')}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">{t('legal_notices.status_label')}</p>
                                        <p>{t('legal_notices.status_value')}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Shield className="text-blue-600" size={28} />
                                    {t('legal_notices.section_2_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('legal_notices.section_2_text')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <FileText className="text-blue-600" size={28} />
                                    {t('legal_notices.section_3_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('legal_notices.section_3_text')}
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-900">
                                    <Lock className="text-blue-600" size={28} />
                                    {t('legal_notices.section_4_title')}
                                </h2>
                                <p className="leading-relaxed">
                                    {t('legal_notices.section_4_text')}
                                </p>
                            </section>

                        </div>
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-sm">
                        {t('legal_notices.last_update')}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
