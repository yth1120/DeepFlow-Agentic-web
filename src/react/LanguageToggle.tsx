import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';

function LanguageToggleInner() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
      title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
      className="px-2 py-1 rounded text-xs font-mono font-semibold transition-all bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-brand-border"
    >
      {lang === 'zh' ? 'EN' : '中'}
    </button>
  );
}

export default function LanguageToggle() {
  return (
    <LanguageProvider>
      <LanguageToggleInner />
    </LanguageProvider>
  );
}
