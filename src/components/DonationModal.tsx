import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Smartphone, CreditCard } from 'lucide-react';

interface DonationModalProps {
    onClose: () => void;
}

type PaymentMethod = 'mixx' | 'flooz';

export default function DonationModal({ onClose }: DonationModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Faire un don</h2>
                        <p className="text-blue-100 max-w-sm mx-auto text-sm">
                            Choisissez votre mode de paiement sécurisé
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {/* Step 1: Select Payment Method */}
                        <div className="mb-8">
                            <label className="block text-gray-700 font-bold mb-4 text-lg">Choisissez un moyen de paiement :</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedMethod('mixx')}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${selectedMethod === 'mixx'
                                        ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-md'
                                        : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="h-10 w-10 mb-2 flex items-center justify-center bg-red-100 rounded-full text-red-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Mixx by Yas</span>
                                </button>

                                <button
                                    onClick={() => setSelectedMethod('flooz')}
                                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all ${selectedMethod === 'flooz'
                                        ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-md'
                                        : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="h-10 w-10 mb-2 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                                        <Smartphone size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">Flooz</span>
                                </button>
                            </div>
                        </div>

                        {/* Step 2: Dynamic Form Fields */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 min-h-[160px] flex flex-col justify-center">
                            {!selectedMethod ? (
                                <div className="text-center text-gray-500 py-4">
                                    <CreditCard className="mx-auto mb-3 opacity-30" size={48} />
                                    <p>Veuillez sélectionner une option ci-dessus pour continuer.</p>
                                </div>
                            ) : (
                                // FORMULAIRE MOBILE MONEY (Affichage des numéros)
                                <div className="space-y-6 animate-fade-in py-4">
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-4 ${selectedMethod === 'mixx' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            <Smartphone size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {selectedMethod === 'mixx' ? 'Mixx by yas' : 'Flooz'}
                                        </h3>
                                        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 shadow-inner">
                                            <p className="text-3xl font-black text-blue-900 tracking-wider">
                                                {selectedMethod === 'mixx' ? '(228) 70 88 88 74' : '(228) 22 55 81 64'}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-6 leading-relaxed">
                                            Veuillez effectuer votre transfert vers ce numéro. <br />
                                            Merci pour votre générosité !
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-full py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
