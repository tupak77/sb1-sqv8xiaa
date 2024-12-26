import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface HabitCompletionAnimationProps {
  type: 'confetti' | 'checkmark';
  onComplete?: () => void;
}

export function HabitCompletionAnimation({ type, onComplete }: HabitCompletionAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === 'confetti') {
      const end = Date.now() + 700;

      const colors = ['#4F46E5', '#7C3AED', '#2563EB'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  if (!isVisible) return null;

  if (type === 'checkmark') {
    return (
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25" />
          <div className="relative bg-green-500 text-white rounded-full p-4 animate-bounce shadow-lg">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return null;
}