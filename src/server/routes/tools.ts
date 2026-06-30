import { Hono } from 'hono';
import { ALL_TOOLS, DANGER_TOOLS, SAFE_TOOLS, TOOLS_BY_CATEGORY } from '../../data/tools';
import type { ApiResponse, ToolsListData, Tool, ToolType } from '../../types';

export const toolsRoute = new Hono();

/**
 * GET /api/tools
 *
 * 返回工具列表，支持查询参数筛选：
 *   ?type=danger|safe       — 按安全等级筛选
 *   ?category=filesystem    — 按功能分类筛选
 *
 * Cache-Control: CDN 7d / 浏览器 1d（工具定义极少变更）
 */
toolsRoute.get('/', (c) => {
  const type = c.req.query('type') as ToolType | undefined;
  const category = c.req.query('category');

  let tools: Tool[] = ALL_TOOLS;

  // 按安全等级筛选
  if (type === 'danger') {
    tools = DANGER_TOOLS;
  } else if (type === 'safe') {
    tools = SAFE_TOOLS;
  }

  // 按分类筛选
  if (category && TOOLS_BY_CATEGORY[category]) {
    tools = tools.filter((t) => t.category === category);
  }

  // 设置缓存头
  c.header('Cache-Control', 'public, max-age=86400, s-maxage=604800');

  const body: ApiResponse<ToolsListData> = {
    success: true,
    data: {
      tools,
      total: tools.length,
      stats: {
        danger: tools.filter((t) => t.type === 'danger').length,
        safe: tools.filter((t) => t.type === 'safe').length,
      },
    },
  };

  return c.json(body);
});

/**
 * GET /api/tools/:name
 *
 * 返回单个工具的完整定义（含参数 Schema）。
 */
toolsRoute.get('/:name', (c) => {
  const name = c.req.param('name');

  // 大小写不敏感查找
  const tool = ALL_TOOLS.find(
    (t) => t.name.toLowerCase() === name.toLowerCase()
  );

  if (!tool) {
    return c.json(
      {
        success: false,
        error: {
          code: 'TOOL_NOT_FOUND',
          message: `工具 "${name}" 不存在。当前可用 ${ALL_TOOLS.length} 个工具。`,
        },
      },
      404
    );
  }

  c.header('Cache-Control', 'public, max-age=86400, s-maxage=604800');

  const body: ApiResponse<Tool> = {
    success: true,
    data: tool,
  };

  return c.json(body);
});
