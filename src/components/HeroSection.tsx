
import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    experience: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(2847);
  const { toast } = useToast();

  // Animate subscriber count on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

            {/* Subscription Form */}
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

            {/* Social Proof */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {subscriberCount.toLocaleString()}+ makers ya dentro
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cancela cuando quieras, sin compromisos
              </p>
            </div>
          </div>

          {/* Visual - Right Side */}
          <div className="lg:col-span-2 relative">
            <div className="relative">
              {/* Main Visual Container */}
              <div className="relative bg-gradient-to-br from-dark-surface to-dark-bg rounded-2xl border border-primary/20 p-8 glow-effect">
                
                {/* Mockup Content */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Drop Exclusivo</h3>
                    <p className="text-muted-foreground">Premium 3D Models</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                      <div className="w-full h-20 bg-primary/10 rounded-lg mb-3"></div>
                      <p className="text-sm text-white font-medium">Streetwear Model</p>
                      <p className="text-xs text-muted-foreground">Limited Edition</p>
                    </div>
                    <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                      <div className="w-full h-20 bg-neon-cyan/10 rounded-lg mb-3"></div>
                      <p className="text-sm text-white font-medium">Tech Accessory</p>
                      <p className="text-xs text-muted-foreground">Drop #127</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-t border-dark-border">
                    <span className="text-primary font-semibold">Próximo Drop</span>
                    <span className="text-white">72h restantes</span>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10"></div>
              </div>
            </div>
          </div>
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
