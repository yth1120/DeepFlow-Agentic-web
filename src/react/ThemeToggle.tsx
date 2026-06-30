import { useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';

function ThemeToggleInner() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const { t } = useLanguage();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('theme');
      if (!stored) {
        document.documentElement.classList.toggle('dark', e.matches);
        setIsDark(e.matches);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }, [isDark]);

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? t.theme_light : t.theme_dark}
      title={isDark ? t.theme_light : t.theme_dark}
      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-brand-border transition-all"
    >
      {isDark ? (
        <Sun className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4" aria-hidden="true" />
      )}
    </button>
  );
}

export default function ThemeToggle() {
  return (
    <LanguageProvider>
      <ThemeToggleInner />
    </LanguageProvider>
  );
}
