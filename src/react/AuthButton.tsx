import { useState, useEffect, useCallback } from 'react';

export default function AuthButton() {
  const [hasToken, setHasToken] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem('df_token'));
    setReady(true);
  }, []);

  const handleLogin = useCallback(() => {
    window.location.href = '/login';
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('df_token');
    window.location.href = '/';
  }, []);

  if (!ready) return null;

  return hasToken ? (
    <button
      onClick={handleLogout}
      className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
    >
      登出
    </button>
  ) : (
    <button
      onClick={handleLogin}
      className="bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent border border-brand-accent/30 text-xs font-semibold px-4 py-2 rounded transition-all"
    >
      登录
    </button>
  );
}
