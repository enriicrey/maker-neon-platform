
import { useMemo } from 'react';

export interface PasswordStrength {
  score: number;
  label: 'Débil' | 'Media' | 'Fuerte';
  color: string;
  suggestions: string[];
}

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Débil',
        color: 'text-red-500',
        suggestions: ['Ingresa una contraseña']
      };
    }

    let score = 0;
    const suggestions: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      suggestions.push('Mínimo 8 caracteres');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Incluye mayúsculas');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Incluye minúsculas');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Incluye números');
    }

    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      suggestions.push('Incluye símbolos (!@#$...)');
    }

    let label: 'Débil' | 'Media' | 'Fuerte';
    let color: string;

    if (score < 3) {
      label = 'Débil';
      color = 'text-red-500';
    } else if (score < 5) {
      label = 'Media';
      color = 'text-yellow-500';
    } else {
      label = 'Fuerte';
      color = 'text-green-500';
    }

    return { score, label, color, suggestions };
  }, [password]);
};
