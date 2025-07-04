
import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    experience: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "¡Bienvenido a Soy Maker 3D!",
        description: "Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada.",
      });
      
      setFormData({ email: '', name: '', experience: '' });
    } catch (error) {
      toast({
        title: "Error al suscribirse",
        description: "Hubo un problema. Por favor, inténtalo nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-neon max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-muted-foreground"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-muted-foreground"
            />
          </div>
        </div>
        
        <select
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white"
        >
          <option value="">Nivel de experiencia</option>
          <option value="principiante">Principiante</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
          <option value="profesional">Profesional</option>
        </select>

        <button
          type="submit"
          disabled={isLoading || !formData.email}
          className="w-full btn-neon flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>Suscríbete Gratis</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
