
import React from 'react';
import BenefitsGrid from './benefits/BenefitsGrid';
import SocialProofSection from './benefits/SocialProofSection';
import { ArrowRight } from 'lucide-react';

const BenefitsAndSocialProof = () => {
  const scrollToHero = () => {
    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Por Qué <span className="text-gradient">2,847+ Makers</span> Ya Confían en Nosotros?
          </h2>
        </div>

        {/* Grid de Beneficios */}
        <BenefitsGrid />

        {/* Sección de Prueba Social */}
        <SocialProofSection />

        {/* CTA Secundario */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToHero}
            className="btn-outline-neon inline-flex items-center space-x-2 text-lg px-8 py-4 hover:scale-105 transition-all duration-300"
          >
            <span>Únete a los 2,847+ Makers</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsAndSocialProof;
