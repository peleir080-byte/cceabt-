import { Mail, MapPin, Phone, Facebook, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cceabt-blue mb-4">Contactez-nous</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Une question, une suggestion ou un partenariat ? N'hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-cceabt-blue mb-6">Nos coordonnées</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-cceabt-blue/10 p-3 rounded-full flex-shrink-0">
                  <MapPin size={24} className="text-cceabt-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-cceabt-blue mb-1">Adresse</h4>
                  <p className="text-gray-600">Lomé, Togo</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-cceabt-blue/10 p-3 rounded-full flex-shrink-0">
                  <Mail size={24} className="text-cceabt-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-cceabt-blue mb-1">Email</h4>
                  <a href="mailto:contact@cceabt.tg" className="text-gray-600 hover:text-cceabt-blue">
                    contact@cceabt.tg
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-cceabt-blue/10 p-3 rounded-full flex-shrink-0">
                  <Phone size={24} className="text-cceabt-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-cceabt-blue mb-1">Téléphone</h4>
                  <p className="text-gray-600">+228 XX XX XX XX</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-cceabt-blue mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cceabt-blue hover:bg-cceabt-blue/90 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cceabt-blue hover:bg-cceabt-blue/90 text-white p-3 rounded-full transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <div className="aspect-video w-full bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126103.1115055832!2d1.1672415!3d6.1370765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1ea15091031%3A0x99b7bd6f8f2e9e7!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte de Lomé"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-cceabt-blue mb-6">Envoyez-nous un message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cceabt-blue focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cceabt-blue focus:border-transparent outline-none transition-all duration-200"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cceabt-blue focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cceabt-blue focus:border-transparent outline-none transition-all duration-200 resize-none"
                    placeholder="Votre message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-cceabt-green hover:bg-cceabt-green/90 text-white font-semibold px-6 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Envoyer le message</span>
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
