import { Hono } from 'hono';
import type { ApiResponse, ReleaseInfo } from '../../types';
// 静态 JSON 导入（Astro 构建时解析，运行时作为对象直接可用）
import releasesData from '../../data/releases.json';

export const releasesRoute = new Hono();

/**
 * GET /api/releases/latest
 *
 * 返回最新发布版本的信息，包括各平台的下载链接、文件体积、changelog。
 * Cache-Control: CDN 24h / 浏览器 1h（版本发布属低频变更）
 */
releasesRoute.get('/latest', (c) => {
  const data = releasesData as ReleaseInfo;

  // 设置缓存头
  c.header('Cache-Control', 'public, max-age=3600, s-maxage=86400');

  const body: ApiResponse<ReleaseInfo> = {
    success: true,
    data,
  };

  return c.json(body);
});
