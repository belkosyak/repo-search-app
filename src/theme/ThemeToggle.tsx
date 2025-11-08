import { Button } from '@i4o/catalystui';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from './useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      onClick={toggleTheme}
      ariaLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="transition-colors p-2"
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
    </Button>
  );
}
