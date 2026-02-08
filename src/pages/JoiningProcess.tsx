import { FileText, UserCheck, Shield, Users, Globe } from 'lucide-react';
import MembershipForm from '../components/MembershipForm';

export default function JoiningProcess() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            {/* Hero Section */}
            <section className="bg-blue-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Shield className="text-blue-300" size={20} />
                        <span className="font-semibold text-sm">Devenir Membre</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Rejoindre le Réseau CCEABT</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Unissons nos forces pour garantir l'accès à l'eau potable et à l'assainissement pour tous au Togo.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 -mt-10">
                {/* Conditions d'éligibilité */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <UserCheck className="text-blue-600" />
                        Qui peut adhérer ?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <Users className="text-blue-600 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-blue-900">OSC Nationale</h3>
                            <p className="text-gray-600 text-sm">ONG ou Association locale légalement reconnue au Togo, active dans le secteur WASH.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <Globe className="text-green-600 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-green-900">OSC Internationale</h3>
                            <p className="text-gray-600 text-sm">Organisation internationale intervenant au Togo dans le domaine de l'eau et de l'assainissement.</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <Shield className="text-purple-600 mb-4" size={32} />
                            <h3 className="font-bold text-lg mb-2 text-purple-900">Partenaire Institutionnel</h3>
                            <p className="text-gray-600 text-sm">Acteur public ou privé souhaitant collaborer stratégiquement avec le réseau.</p>
                        </div>
                    </div>
                </div>

                {/* Processus d'adhésion (Steps) */}
                <div className="max-w-5xl mx-auto mb-20">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Le processus d'adhésion</h2>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Ligne de connexion (Desktop) */}
                        <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-200 -z-0"></div>

                        {/* Étape 1 */}
                        <div className="relative z-10 text-center bg-gray-50 md:bg-transparent">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-gray-50 shadow-lg">1</div>
                            <h3 className="font-bold text-lg mb-2">Formulaire</h3>
                            <p className="text-sm text-gray-600">Remplissez le formulaire de demande ci-dessous.</p>
                        </div>

                        {/* Étape 2 */}
                        <div className="relative z-10 text-center bg-gray-50 md:bg-transparent">
                            <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-gray-50 shadow-md">2</div>
                            <h3 className="font-bold text-lg mb-2">Dossier</h3>
                            <p className="text-sm text-gray-600">Envoi des pièces justificatives (Statuts, Récépissé, Rapport d'activités).</p>
                        </div>

                        {/* Étape 3 */}
                        <div className="relative z-10 text-center bg-gray-50 md:bg-transparent">
                            <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-gray-50 shadow-md">3</div>
                            <h3 className="font-bold text-lg mb-2">Étude</h3>
                            <p className="text-sm text-gray-600">Examen de votre demande par le Secrétariat Exécutif.</p>
                        </div>

                        {/* Étape 4 */}
                        <div className="relative z-10 text-center bg-gray-50 md:bg-transparent">
                            <div className="w-12 h-12 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-gray-50 shadow-md">4</div>
                            <h3 className="font-bold text-lg mb-2">Validation</h3>
                            <p className="text-sm text-gray-600">Validation par le CA et paiement des frais d'adhésion.</p>
                        </div>
                    </div>
                </div>

                {/* Zone Formulaire */}
                <div id="join-form" className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white text-center">
                            <FileText className="mx-auto mb-4 opacity-80" size={40} />
                            <h2 className="text-2xl font-bold">Déposer ma demande</h2>
                            <p className="opacity-90">Première étape : Présentez-nous votre organisation</p>
                        </div>
                        <div className="p-8 md:p-12">
                            <MembershipForm isFullPage={true} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
