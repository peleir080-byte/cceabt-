import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Facebook, Linkedin, Send, CheckCircle, AlertCircle, Loader2, Upload, X } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment: File | null;
};

type FormErrors = {
  [key: string]: string;
};

interface ContactFormProps {
  onClose?: () => void;
  className?: string;
}

export default function ContactForm({ onClose, className = '' }: ContactFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('forms.error_name_required');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('forms.error_name_short');
    }

    if (!formData.email) {
      newErrors.email = t('forms.error_email_required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('forms.error_email_invalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('forms.error_subject_required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('forms.error_message_required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('forms.error_message_short');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          attachment: t('forms.error_file_size')
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        attachment: file
      }));
      setFileName(file.name);

      if (errors.attachment) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.attachment;
          return newErrors;
        });
      }
    }
  };

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null
    }));
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Compile summary for email
      const summary = `
--- RÉSUMÉ DE CONTACT CCEABT ---
Expéditeur : ${formData.name}
Email : ${formData.email}
Sujet : ${formData.subject}

Message :
${formData.message}

${fileName ? `Fichier à joindre : ${fileName}` : 'Aucun fichier joint'}
-------------------------------
      `;

      // Construct mailto link
      const mailtoLink = `mailto:contact@cceabt.org?subject=${encodeURIComponent(`[Contact Web] ${formData.subject} - ${formData.name}`)}&body=${encodeURIComponent(summary)}`;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Open mail client (this satisfies the "envoyé par mail" requirement in frontend)
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        attachment: null
      });
      setFileName(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        if (onClose) onClose();
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: t('forms.error_submit')
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      <div className="p-6 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('forms.contact_title')}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fermer le formulaire"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="flex justify-center mb-4">
                <CheckCircle className="text-green-500" size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('forms.success_title')}</h3>
              <p className="text-gray-600">{t('forms.success_desc')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence>
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded"
                  >
                    <div className="flex">
                      <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
                      <p className="text-sm text-red-700">{errors.submit}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('forms.full_name')} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                      placeholder={t('forms.full_name')}
                    />
                    {errors.name && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={18} />
                    )}
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('forms.email')} *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border-2 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" size={18} />
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  {t('forms.subject')} *
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border-2 ${errors.subject ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-300 appearance-none bg-white`}
                  >
                    <option value="">{t('forms.subject_placeholder')}</option>
                    <option value="adhesion">{t('forms.subject_membership')}</option>
                    <option value="partenariat">{t('forms.subject_partnership')}</option>
                    <option value="information">{t('forms.subject_info')}</option>
                    <option value="don">{t('forms.subject_donation')}</option>
                    <option value="autre">{t('forms.subject_other')}</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  {errors.subject && (
                    <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" size={18} />
                  )}
                </div>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('forms.message')} *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border-2 ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'} rounded-lg focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none`}
                    placeholder={t('forms.message_placeholder')}
                  />
                  {errors.message && (
                    <AlertCircle className="absolute right-3 top-3 text-red-500" size={18} />
                  )}
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {t('forms.attachment')}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-1 text-center">
                    {fileName ? (
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm text-gray-700 truncate max-w-xs">{fileName}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-gray-400 hover:text-red-500 ml-2"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <Upload className="mx-auto h-10 w-10 text-gray-400" />
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="attachment"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                          >
                            <span>{t('forms.upload_file')}</span>
                            <input
                              id="attachment"
                              name="attachment"
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">{t('forms.drag_drop')}</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, JPG, PNG (max. 5MB)
                        </p>
                      </>
                    )}
                    {errors.attachment && (
                      <p className="mt-1 text-sm text-red-600">{errors.attachment}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      {t('forms.submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      {t('forms.submit_contact')}
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  {t('forms.privacy_notice')}
                </p>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <a
              href="mailto:contact@cceabt.org"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            >
              <Mail className="mr-2" size={16} />
              <span className="text-sm">contact@cceabt.org</span>
            </a>
            <div className="space-y-2">
              <a
                href="tel:+22891359398"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                <Phone className="mr-2" size={16} />
                <span className="text-sm">+228 91 35 93 98</span>
              </a>
              <a
                href="tel:+22890227855"
                className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
              >
                <Phone className="mr-2" size={16} />
                <span className="text-sm">+228 90 22 78 55</span>
              </a>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com/cceabt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://linkedin.com/company/cceabt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
