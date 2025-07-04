
import React from 'react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "🔥",
      title: "Acceso Exclusivo a Drops Limitados",
      description: "Productos únicos antes que nadie"
    },
    {
      icon: "📈",
      title: "Estrategias de Negocio Probadas",
      description: "Casos reales de éxito y fallos"
    },
    {
      icon: "💬",
      title: "Consultoría Directa",
      description: "Acceso a expertos del sector"
    }
  ];

  return (
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
        <div 
          key={index}
          className="flex items-start space-x-4 animate-slide-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <span className="text-2xl">{benefit.icon}</span>
          <div>
            <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitsSection;
