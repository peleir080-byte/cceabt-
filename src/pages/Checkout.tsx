import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, ShieldCheck, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const amount = searchParams.get('amount') || '0';

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simuler un délai de traitement bancaire
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full text-center"
                >
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
                        <CheckCircle2 size={64} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Merci !</h1>
                    <p className="text-xl text-gray-600 mb-12">
                        Votre don de <span className="font-bold text-blue-600">{amount} FCFA</span> a été reçu avec succès. Un reçu vous a été envoyé par email.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200"
                    >
                        Retour à l'accueil
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors font-bold"
                    >
                        <ArrowLeft size={20} /> Retour
                    </button>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Formulaire de paiement */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 p-8 md:p-12 border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-lg">
                                        <CreditCard size={32} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black text-gray-900">Paiement Sécurisé</h1>
                                        <p className="text-gray-500 font-medium">SSL Encrypted Transaction</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email pour le reçu</label>
                                            <input
                                                required
                                                type="email"
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                                                placeholder="exemple@mail.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Nom sur la carte</label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                                                placeholder="JOHN DOE"
                                                style={{ textTransform: 'uppercase' }}
                                                value={formData.cardName}
                                                onChange={e => setFormData({ ...formData, cardName: e.target.value.toUpperCase() })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Numéro de Carte</label>
                                            <div className="relative">
                                                <input
                                                    required
                                                    type="text"
                                                    maxLength={19}
                                                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono text-lg"
                                                    placeholder="0000 0000 0000 0000"
                                                    value={formData.cardNumber}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                        setFormData({ ...formData, cardNumber: val });
                                                    }}
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="Mastercard" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Expiration</label>
                                            <input
                                                required
                                                type="text"
                                                maxLength={5}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                                                placeholder="MM / YY"
                                                value={formData.expiry}
                                                onChange={e => {
                                                    let val = e.target.value.replace(/\D/g, '');
                                                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                                                    setFormData({ ...formData, expiry: val });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">CVC / CVV</label>
                                            <input
                                                required
                                                type="text"
                                                maxLength={4}
                                                className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                                                placeholder="123"
                                                value={formData.cvv}
                                                onChange={e => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        disabled={isProcessing}
                                        className="w-full relative overflow-hidden bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:transform-none mt-4"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isProcessing ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-3"
                                                >
                                                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Traitement en cours...
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    Payer {amount} FCFA
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm">
                                        <ShieldCheck size={18} />
                                        Paiement 100% sécurisé
                                    </div>
                                </form>
                            </motion.div>
                        </div>

                        {/* Récapitulatif */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-blue-900 rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-32"
                            >
                                <Heart className="text-red-400 mb-6" size={48} />
                                <h3 className="text-2xl font-bold mb-2">Récapitulatif</h3>
                                <p className="text-blue-100 mb-8 font-medium">Votre soutien aide le CCEABT à faciliter l'accès à l'eau potable au Togo.</p>

                                <div className="space-y-4 mb-10 pb-8 border-b border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-200">Donation</span>
                                        <span className="text-xl font-bold">{amount} FCFA</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-200">Frais de transaction</span>
                                        <span className="text-xl font-bold">0 FCFA</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-10">
                                    <span className="text-lg font-bold">Total à payer</span>
                                    <span className="text-4xl font-black text-green-400">{amount} FCFA</span>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-6 border border-white/5">
                                    <p className="text-sm font-medium leading-relaxed italic opacity-80">
                                        "Chaque goutte compte. Merci de contribuer à transformer durablement le secteur WASH au Togo."
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
