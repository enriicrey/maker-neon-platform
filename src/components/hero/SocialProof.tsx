
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const SocialProof = () => {
  const [subscriberCount, setSubscriberCount] = useState(2847);

  // Animate subscriber count on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
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
  );
};

export default SocialProof;
