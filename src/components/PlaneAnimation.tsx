import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

interface PlaneAnimationProps {
  onComplete: () => void;
}

export function PlaneAnimation({ onComplete }: PlaneAnimationProps) {
  const [position, setPosition] = useState(-20);
  
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1000; // 1 second animation
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth movement
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const easedProgress = easeInOutCubic(progress);
      setPosition(easedProgress * 120 - 20); // Move from -20 to 100
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 200);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div 
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{ 
          left: `${position}%`,
          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))'
        }}
      >
        <div className="relative">
          <Plane 
            size={32} 
            className="text-blue-400 transform -rotate-12"
          />
          <div className="absolute top-1/2 right-full w-20 h-0.5 bg-gradient-to-r from-transparent to-blue-400/50" />
        </div>
      </div>
    </div>
  );
}