import React from 'react';
import { getPasswordStrength } from '@/lib/validation';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  if (!password) return null;
  
  const { score, label, color } = getPasswordStrength(password);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600">Password strength:</span>
        <span className="font-medium" style={{ color }}>
          {label}
        </span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index <= score ? color : '#e2e8f0',
            }}
          />
        ))}
      </div>
    </div>
  );
};
