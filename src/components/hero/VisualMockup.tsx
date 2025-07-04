
import React from 'react';

const VisualMockup = () => {
  return (
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
  );
};

export default VisualMockup;
