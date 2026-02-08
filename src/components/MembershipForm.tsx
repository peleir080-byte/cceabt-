import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type MembershipType = 'osc_national' | 'osc_international' | 'partner' | '';

export default function MembershipForm({ onClose, isFullPage = false }: { onClose?: () => void, isFullPage?: boolean }) {
  const { t } = useTranslation();
  const [membershipType, setMembershipType] = useState<MembershipType>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!membershipType) return;

    setIsSubmitting(true);

    // Simulate form submission
    try {
      let typeLabel = '';
      switch (membershipType) {
        case 'osc_national': typeLabel = 'OSC Nationale'; break;
        case 'osc_international': typeLabel = 'OSC Internationale'; break;
        case 'partner': typeLabel = 'Partenaire Institutionnel'; break;
      }

      const summary = `
--- DEMANDE D'ADHÉSION CCEABT ---
Type : ${typeLabel}
Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone}
Organisation : ${formData.organization}
Poste : ${formData.position}

Motivation :
${formData.message}
--------------------------------
      `;

      const mailtoLink = `mailto:contact@cceabt.org?subject=${encodeURIComponent(`[Adhésion Web] ${formData.organization} - ${formData.name}`)}&body=${encodeURIComponent(summary)}`;

      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.href = mailtoLink;
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t('forms.success_title')}</h3>
        <p className="text-sm text-gray-500 mb-6">
          {t('forms.success_desc')}
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('forms.close')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="text-center">
        {!isFullPage && (
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('forms.membership_title')}
          </h3>
        )}
        <p className="text-sm text-gray-500 mb-8">
          {t('forms.membership_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          type="button"
          onClick={() => setMembershipType('osc_national')}
          className={`p-4 border rounded-xl text-left transition-all hover:shadow-md ${membershipType === 'osc_national'
            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
            : 'border-gray-200 hover:border-blue-300'
            }`}
        >
          <div className="flex items-center mb-2">
            <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 mr-3 ${membershipType === 'osc_national'
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
              }`} />
            <span className="font-bold text-gray-800 text-sm">{t('forms.osc_national')}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed ml-8">
            {t('forms.osc_national_desc')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setMembershipType('osc_international')}
          className={`p-4 border rounded-xl text-left transition-all hover:shadow-md ${membershipType === 'osc_international'
            ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
            : 'border-gray-200 hover:border-green-300'
            }`}
        >
          <div className="flex items-center mb-2">
            <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 mr-3 ${membershipType === 'osc_international'
              ? 'border-green-500 bg-green-500'
              : 'border-gray-300'
              }`} />
            <span className="font-bold text-gray-800 text-sm">{t('forms.osc_international')}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed ml-8">
            {t('forms.osc_international_desc')}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setMembershipType('partner')}
          className={`p-4 border rounded-xl text-left transition-all hover:shadow-md ${membershipType === 'partner'
            ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
            : 'border-gray-200 hover:border-purple-300'
            }`}
        >
          <div className="flex items-center mb-2">
            <div className={`flex-shrink-0 h-5 w-5 rounded-full border-2 mr-3 ${membershipType === 'partner'
              ? 'border-purple-500 bg-purple-500'
              : 'border-gray-300'
              }`} />
            <span className="font-bold text-gray-800 text-sm">{t('forms.partner_institutional')}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed ml-8">
            {t('forms.partner_institutional_desc')}
          </p>
        </button>
      </div>

      {membershipType && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('forms.full_name')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('forms.email')} <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {t('forms.phone')} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              {membershipType === 'partner' ? t('forms.org_name') : t('forms.current_org')}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              {t('forms.position')} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="position"
              name="position"
              required
              value={formData.position}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              {t('forms.why_join')} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              required
              value={formData.message}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('forms.submitting')}
                </>
              ) : (
                t('forms.submit_membership')
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
