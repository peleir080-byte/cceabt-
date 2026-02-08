import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Variant = 'classic' | 'impact' | 'minimal';

export default function Hero({ variant = 'classic' }: { variant?: Variant }) {
  const { t } = useTranslation();
  const bg = 'url("/images/back cceabt.png")';

  const overlay =
    variant === 'impact'
      ? 'bg-gradient-to-br from-cceabt-green/20 to-cceabt-blue/20'
      : 'bg-gradient-to-r from-cceabt-blue/15 to-cceabt-blue/6';

  const titleClass =
    variant === 'impact'
      ? 'text-5xl md:text-6xl lg:text-7xl'
      : variant === 'minimal'
        ? 'text-4xl md:text-5xl'
        : 'text-4xl md:text-5xl lg:text-6xl';

  const align = variant === 'minimal' ? 'text-center mx-auto' : '';
  const ctaStyle =
    variant === 'minimal'
      ? 'inline-block border-2 border-white text-white hover:bg-white hover:text-cceabt-blue font-semibold px-8 py-4 rounded-lg transition-all duration-200'
      : 'inline-block bg-cceabt-green hover:bg-cceabt-green/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105';

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 md:pb-24 overflow-hidden">
      <div
        className="absolute inset-0 z-0 filter brightness-112 contrast-110 saturate-110"
        style={{
          backgroundImage: bg,
          backgroundSize: '90%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
        }}
      >
        <div className={`absolute inset-0 ${overlay}`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl ${align}`}>
          <h1 className={`${titleClass} font-bold text-white mb-6 leading-tight drop-shadow-md`}>
            {t('home.hero_title')}
          </h1>
          <p className={`text-xl md:text-2xl text-white/95 mb-8 ${align} drop-shadow`}>
            {t('home.hero_subtitle')}
          </p>
          <a href="#actions" className={ctaStyle}>
            {t('home.discover_btn')}
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 md:bottom-12 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10 pointer-events-none"
      >
        <ChevronDown size={40} />
      </a>
    </section>
  );
}
