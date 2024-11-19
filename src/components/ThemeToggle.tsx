import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ui/ThemeProvider';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-light-text-primary dark:text-dark-text-primary hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;