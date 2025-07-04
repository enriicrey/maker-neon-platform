
import React from 'react';
import { Clock, TrendingUp, MessageCircle } from 'lucide-react';

const BenefitsGrid = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Drops Exclusivos Limitados',
      description: 'Acceso prioritario a productos únicos y ediciones limitadas antes que nadie. Solo para suscriptores.'
    },
    {
      icon: TrendingUp,
      title: 'Behind the Scenes Real',
      description: 'Casos reales de éxito y fallos para acelerar tu aprendizaje. Sin teoría, solo experiencias validadas.'
    },
    {
      icon: MessageCircle,
      title: 'Acceso a Expertos',
      description: 'Resuelve tus dudas específicas con acceso directo a profesionales del sector 3D.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-green-400 p-8 lg:p-10 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex justify-center mb-6">
            <benefit.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-primary transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BenefitsGrid;
