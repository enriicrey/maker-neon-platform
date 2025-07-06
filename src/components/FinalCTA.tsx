
import React, { useState } from 'react';
import { CheckCircle, Gift, Zap, Lock } from 'lucide-react';

const FinalCTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-r from-primary/10 via-primary/5 to-neon-cyan/10 relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-dark-bg/80"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Título Principal */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Únete a los <span className="text-gradient">2,847+ Makers</span> Que Ya Están Dentro
          </h2>
          
          {/* Subtítulo */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Comienza tu journey hacia drops exitosos hoy mismo
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-lg bg-dark-surface/50 border border-dark-border focus:border-primary focus:outline-none text-white text-lg backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="btn-neon px-8 py-4 text-lg font-semibold whitespace-nowrap"
                disabled={isSubmitted}
              >
                {isSubmitted ? '¡Suscrito!' : 'Suscríbete Gratis'}
              </button>
            </div>
          </form>

          {/* Garantías y Beneficios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Cancela cuando quieras</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Gift className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Ebook gratis incluido</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Zap className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">Setup en 30 segundos</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Lock className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm">100% Privado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
