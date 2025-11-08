import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon
          className="h-5 w-5 transition-transform duration-300"
          aria-hidden="true"
        />
      ) : (
        <MoonIcon
          className="h-5 w-5 transition-transform duration-300"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
