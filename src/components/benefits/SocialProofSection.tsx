
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

const SocialProofSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const count = useCountUp({ end: 2847, duration: 2500, start: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('social-proof-counter');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Carlos Mendoza',
      title: 'Fundador de Print3D Studio',
      quote: 'Gracias a las estrategias de Soy Maker 3D, lancé mi primer drop exitoso en solo 3 meses.',
      avatar: '👨‍💼'
    },
    {
      name: 'Ana García',
      title: 'Designer & Maker',
      quote: 'El acceso exclusivo a productos me ha ahorrado cientos de horas de investigación.',
      avatar: '👩‍🎨'
    },
    {
      name: 'Miguel Torres',
      title: 'CEO de Filament Pro',
      quote: 'Las insights del newsletter han transformado completamente mi approach al mercado 3D.',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="mt-20 bg-gray-900/30 backdrop-blur rounded-3xl p-12 lg:p-16">
      {/* Contador Animado */}
      <div id="social-proof-counter" className="text-center mb-16">
        <div className="text-6xl font-bold text-primary mb-4">
          {isVisible ? count.toLocaleString() : '0'}+
        </div>
        <p className="text-xl text-gray-300">
          Makers que ya están dentro
        </p>
      </div>

      {/* Testimonios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-black/30 border border-primary/20 hover:border-primary/40 p-6 rounded-xl transition-all duration-300 hover:scale-105"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-2xl mr-4">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.title}</p>
              </div>
            </div>
            <p className="text-gray-300 italic leading-relaxed">
              "{testimonial.quote}"
            </p>
          </div>
        ))}
      </div>

      {/* Rating y Trust Signals */}
      <div className="text-center space-y-6">
        <div className="flex justify-center items-center space-x-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
          ))}
          <span className="ml-3 text-gray-300">Valoración promedio: 4.9/5</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full border border-green-500/20">
            ✓ 100% Gratis
          </span>
          <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full border border-blue-500/20">
            ✓ Sin Spam
          </span>
          <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full border border-purple-500/20">
            ✓ Cancela Cuando Quieras
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;
