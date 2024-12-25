import { useState, useCallback } from 'react';

export function useClickAnimation() {
  const [animationClass, setAnimationClass] = useState('');

  const handleClick = useCallback(() => {
    setAnimationClass('animate-click');
    
    // Remove animation class after it completes
    setTimeout(() => {
      setAnimationClass('');
    }, 300);
  }, []);

  return { handleClick, animationClass };
}