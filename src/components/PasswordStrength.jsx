import { useState } from 'react';

/**
 * PasswordStrength component
 * Displays a visual indicator of password strength based on common criteria
 */
export default function PasswordStrength({ password }) {
  const getStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    const levels = [
      { score: 0, label: '', color: '', bg: '' },
      { score: 1, label: 'Très faible', color: 'text-red-600', bg: 'bg-red-200' },
      { score: 2, label: 'Faible', color: 'text-yellow-600', bg: 'bg-yellow-200' },
      { score: 3, label: 'Moyen', color: 'text-yellow-600', bg: 'bg-yellow-300' },
      { score: 4, label: 'Fort', color: 'text-blue-600', bg: 'bg-blue-200' },
      { score: 5, label: 'Très fort', color: 'text-green-600', bg: 'bg-green-200' }
    ];
    
    return levels[score];
  };

  const strength = getStrength(password);
  
  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 w-full rounded ${
              i <= strength.score ? strength.bg : 'bg-slate-200 dark:bg-slate-700'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${strength.color}`}>{strength.label}</p>
    </div>
  );
}
