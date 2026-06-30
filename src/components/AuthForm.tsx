import { useState, useCallback, type FormEvent } from 'react';
import { Loader2, Mail, Key, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

type Mode = 'login' | 'register';

interface ApiError {
  code: string;
  message: string;
}

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLogin = mode === 'login';

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setMessage(null);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setMessage(null);
      setError(null);

      if (!email.trim() || !password) {
        setError('请填写邮箱和密码');
        return;
      }

      if (!isLogin && password.length < 6) {
        setError('密码长度至少为 6 位');
        return;
      }

      setLoading(true);

      try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password }),
        });

        const json = await res.json();

        if (!json.success) {
          const err = json.error as ApiError;
          setError(err?.message ?? '请求失败，请稍后重试');
          setLoading(false);
          return;
        }

        if (isLogin) {
          const token = json.data?.access_token;
          if (token) {
            localStorage.setItem('df_token', token);
          }
          setMessage('登录成功，即将跳转...');
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setMessage('注册成功，请查收邮箱激活信');
          setEmail('');
          setPassword('');
          setLoading(false);
        }
      } catch {
        setError('网络错误，请检查连接后重试');
        setLoading(false);
      }
    },
    [email, password, isLogin]
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* 渐变光晕边框 */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-blue/30 via-brand-accent/15 to-brand-blue/30 dark:from-brand-blue/40 dark:via-brand-accent/20 dark:to-brand-blue/40 blur-sm" />

        <div className="relative bg-white/90 dark:bg-brand-dark/95 backdrop-blur-xl border border-slate-200 dark:border-brand-border/60 rounded-2xl p-8 shadow-2xl shadow-slate-200/50 dark:shadow-brand-black/50">
          {/* ── 标题 ── */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
              {isLogin ? '欢迎回来' : '创建账户'}
            </h1>
            <p className="text-slate-500 dark:text-brand-text text-sm mt-2 font-mono">
              {isLogin ? '登录以继续使用 DeepFlow' : '注册 DeepFlow 开发者账户'}
            </p>
          </div>

          {/* ── 成功 / 错误提示 ── */}
          {message && (
            <div className="flex items-start gap-2.5 mb-6 px-4 py-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2.5 mb-6 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* ── 表单 ── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 邮箱 */}
            <div>
              <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
                邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-brand-black/80 border border-slate-200 dark:border-brand-border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all font-mono"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="auth-password" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 font-mono uppercase tracking-wider">
                密码
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? '输入密码' : '至少 6 位字符'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-brand-black/80 border border-slate-200 dark:border-brand-border rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-brand-accent/60 focus:ring-1 focus:ring-brand-accent/30 transition-all font-mono"
                />
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue/90 hover:to-blue-500 shadow-lg shadow-brand-blue/25 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isLogin ? '登录中...' : '注册中...'}</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? '登录' : '注册'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* ── 切换模式 ── */}
          <div className="mt-6 text-center">
            <span className="text-slate-500 text-xs">
              {isLogin ? '还没有账户？' : '已有账户？'}
            </span>{' '}
            <button
              type="button"
              onClick={toggleMode}
              className="text-brand-accent hover:text-brand-accent/80 text-xs font-semibold transition-colors"
            >
              {isLogin ? '立即注册' : '去登录'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
