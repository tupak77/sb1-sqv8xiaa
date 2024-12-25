import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NumberInputProps {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  className?: string;
}

export function NumberInput({ value, onChange, min, className = '' }: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = (parseInt(value.toString()) || 0) + 1;
    const event = {
      target: { value: newValue.toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleDecrement = () => {
    const currentValue = parseInt(value.toString()) || 0;
    if (min === undefined || currentValue > min) {
      const event = {
        target: { value: (currentValue - 1).toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        className={`w-full px-3 py-2 pr-7 bg-gray-700/50 border border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                   [&::-webkit-inner-spin-button]:appearance-none ${className}`}
      />
      <div className="absolute right-1 inset-y-0.5 w-5 flex flex-col">
        <button
          type="button"
          onClick={handleIncrement}
          className="flex-1 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors duration-200 -my-px"
        >
          <ChevronUp size={12} />
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          className="flex-1 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors duration-200 -my-px"
        >
          <ChevronDown size={12} />
        </button>
      </div>
    </div>
  );
}