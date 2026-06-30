import type { APIRoute } from 'astro';
import { createApp } from '../../server/app';

/**
 * Astro API catch-all 路由
 *
 * 将所有 /api/* 请求委托给 Hono 实例处理。
 * Cloudflare Pages 环境变量通过 locals.runtime.env 传入，
 * 作为 Hono app.fetch() 的第二参数，注入为 c.env。
 *
 * 此页面标记为 prerender = false（SSR 模式），
 * 首页（index.astro）仍保持 SSG 预渲染。
 */
const app = createApp();

export const ALL: APIRoute = async ({ request, locals }) => {
  // Cloudflare Pages 通过 @astrojs/cloudflare 适配器将运行时上下文
  // 挂载到 locals.runtime，其中 .env 包含 wrangler.toml [vars] 及
  // Cloudflare Dashboard 中配置的环境变量
  const env = (locals.runtime as { env: Env } | undefined)?.env ?? ({} as Env);
  return app.fetch(request, env);
};

/** 此路由必须动态执行，不可在构建时预渲染 */
export const prerender = false;
