import { createClient } from '@supabase/supabase-js';
import type { Context } from 'hono';

/**
 * Hono 边缘端 Supabase 客户端工厂
 *
 * 从 Hono 上下文的 c.env 中读取 Cloudflare Pages 注入的环境变量，
 * 为每个请求初始化一个独立的 Supabase 客户端（无 session 持久化）。
 *
 * 使用方式：
 *   import { getSupabase } from '../utils/supabase';
 *   const supabase = getSupabase(c);
 */
export function getSupabase(c: Context) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = c.env as Env;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error(
      'Missing Supabase environment variables: SUPABASE_URL and SUPABASE_ANON_KEY. ' +
      'Ensure they are set in wrangler.toml [vars] or Cloudflare Dashboard.'
    );
  }

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      // 边缘 API 端不持久化 session；由客户端（浏览器）管理 token
      persistSession: false,
    },
  });
}
