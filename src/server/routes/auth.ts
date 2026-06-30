import { Hono } from 'hono';
import { getSupabase } from '../utils/supabase';
import type { ApiResponse } from '../../types';

export const authRouter = new Hono<{ Bindings: Env }>();

/**
 * POST /register
 *
 * 使用 Supabase GoTrue 原生密码认证进行用户注册。
 * 请求体：{ email: string, password: string }
 */
authRouter.post('/register', async (c) => {
  let body: { email?: string; password?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json(
      { success: false, error: { code: 'INVALID_JSON', message: '请求体必须为合法 JSON' } },
      400
    );
  }

  const { email, password } = body;

  // ── 校验 ──
  if (!email || !password) {
    return c.json(
      { success: false, error: { code: 'VALIDATION', message: 'email 和 password 均为必填项' } },
      400
    );
  }

  if (typeof password !== 'string' || password.length < 6) {
    return c.json(
      { success: false, error: { code: 'WEAK_PASSWORD', message: '密码长度至少为 6 位' } },
      400
    );
  }

  // ── 调用 Supabase Auth ──
  const supabase = getSupabase(c);
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    const status = error.status === 429 ? 429 : 400;
    return c.json(
      { success: false, error: { code: error.code ?? 'AUTH_ERROR', message: error.message } },
      status
    );
  }

  if (!data.user) {
    return c.json(
      { success: false, error: { code: 'AUTH_ERROR', message: '注册失败，未返回用户信息' } },
      500
    );
  }

  // ── 成功 ──
  const body_: ApiResponse<{ id: string; email: string }> = {
    success: true,
    data: {
      id: data.user.id,
      email: data.user.email!,
    },
  };

  return c.json(body_, 201);
});

/**
 * POST /login
 *
 * 使用 Supabase GoTrue 原生密码认证进行用户登录。
 * 成功时返回 JWT access_token、过期时间、及用户基本信息。
 * 请求体：{ email: string, password: string }
 */
authRouter.post('/login', async (c) => {
  let body: { email?: string; password?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json(
      { success: false, error: { code: 'INVALID_JSON', message: '请求体必须为合法 JSON' } },
      400
    );
  }

  const { email, password } = body;

  // ── 校验 ──
  if (!email || !password) {
    return c.json(
      { success: false, error: { code: 'VALIDATION', message: 'email 和 password 均为必填项' } },
      400
    );
  }

  // ── 调用 Supabase Auth ──
  const supabase = getSupabase(c);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return c.json(
      {
        success: false,
        error: {
          code: error?.code ?? 'AUTH_ERROR',
          message: error?.message ?? '邮箱或密码错误',
        },
      },
      401
    );
  }

  // ── 成功 ──
  const body_: ApiResponse<{
    access_token: string;
    expires_at: number;
    user: { id: string; email: string; lastSignIn: string | null };
  }> = {
    success: true,
    data: {
      access_token: data.session.access_token,
      expires_at: data.session.expires_at!,
      user: {
        id: data.user.id,
        email: data.user.email!,
        lastSignIn: data.user.last_sign_in_at ?? null,
      },
    },
  };

  return c.json(body_);
});
