
import React from 'react';
import BenefitsSection from './hero/BenefitsSection';
import SubscriptionForm from './hero/SubscriptionForm';
import SocialProof from './hero/SocialProof';
import VisualMockup from './hero/VisualMockup';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg"></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-neon-cyan/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Content - Left Side */}
          <div className="lg:col-span-3 space-y-8 animate-fade-in">
            
            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Del Diseño al Drop:</span>
                <span className="block text-gradient">La Newsletter Que Está</span>
                <span className="block text-gradient">Revolucionando la</span>
                <span className="block">Impresión 3D</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Descubre cómo convertir tu pasión por la impresión 3D en un negocio de drops exitoso. 
                Casos reales, estrategias probadas, lanzamientos exclusivos.
              </p>
            </div>

            {/* Benefits */}
            <BenefitsSection />

            {/* Subscription Form */}
            <SubscriptionForm />

            {/* Social Proof */}
            <SocialProof />
          </div>

          {/* Visual - Right Side */}
          <VisualMockup />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
