import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MonthData } from '../types';
import { MonthCard } from './MonthCard';

interface MonthsCarouselProps {
  months: MonthData[];
  onUpdateMonth: (name: string, data: Partial<MonthData>) => void;
}

export function MonthsCarousel({ months, onUpdateMonth }: MonthsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setMaxScroll(scrollRef.current.scrollWidth - scrollRef.current.clientWidth);
    }
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    const currentScroll = scrollRef.current.scrollLeft;
    const targetScroll = direction === 'left'
      ? Math.max(0, currentScroll - cardWidth)
      : Math.min(maxScroll, currentScroll + cardWidth);

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-gray-800/80 text-white rounded-full p-2 shadow-lg hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 z-10 ${
          scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={scrollPosition <= 0}
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 scroll-smooth"
        onScroll={handleScroll}
      >
        {months.map((month) => (
          <MonthCard
            key={month.name}
            month={month}
            onUpdateMonth={onUpdateMonth}
          />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-gray-800/80 text-white rounded-full p-2 shadow-lg hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 z-10 ${
          scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={scrollPosition >= maxScroll}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}