 # DeepFlow Agentic — 官方网站
<img width="1912" height="948" alt="image" src="https://github.com/user-attachments/assets/185bacd2-2236-4cd1-aed3-583980908e4a" />

<p align="center">
  <strong>DeepFlow Agentic</strong> 的官方品牌营销站点。<br />
  一个为桌面端 AI 编程智能体 <strong>DeepFlow</strong> 量身打造的单页落地页。<br />
  中英双语 · 深色/浅色主题 · 基于 Astro 4 + Hono + Cloudflare Pages。
</p>

<p align="center">
  <a href="#快速上手">快速上手</a> ·
  <a href="#技术栈">技术栈</a> ·
  <a href="#项目结构">项目结构</a> ·
  <a href="#架构设计">架构设计</a> ·
  <a href="#i18n">国际化</a> ·
  <a href="#开发指南">开发指南</a> ·
  <a href="#部署">部署</a>
</p>

---

## 概述

DeepFlow Agentic 网站是 [DeepFlow](https://github.com/deepflow) 桌面端 Electron 应用的品牌官网，旨在向开发者社区展示 DeepFlow 的核心能力：

- **双路径 ReAct 自闭环智能体** — 主聊天流与独立 Agent 循环协同决策
- **三模态权限看门狗** — Ask / Plan / AFE 三级安全策略
- **22 个内置工具** — 9 个高危 + 13 个安全，按 6 大功能域分类
- **Git Worktree 沙箱隔离** — 并发 Agent 自动隔离，杜绝工作区污染
- **MCP 协议支持** — JSON-RPC over stdio 标准兼容
- **加密持久化记忆** — SQLite + Electron safeStorage 硬件加密

### 在线预览

| 语言 | 链接 |
|------|------|
| 🇨🇳 中文 | `https://deepflow-agentic.pages.dev` |
| 🇺🇸 English | `https://deepflow-agentic.pages.dev/en` |

---

## 快速上手

```bash
# 1. 克隆本仓库
git clone <repo-url>
cd deepflow-website

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 4. 构建生产版本
npm run build

# 5. 本地预览构建产物
npm run preview
```

### 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` / `npm start` | 启动 Astro 开发服务器 |
| `npm run build` | 生产构建（首页 SSG + API 路由 SSR） |
| `npm run preview` | 本地预览构建产物 |
| `npm run check` | TypeScript 类型检查 |
| `npm run astro` | Astro CLI 工具 |

---

## 技术栈

| 层级 | 技术 | 用途 |
|------|------|------|
| **框架** | [Astro 4](https://astro.build) | Hybrid 渲染引擎（SSG + SSR） |
| **交互** | [React 18](https://react.dev) | 交互岛屿（Islands Architecture） |
| **API** | [Hono](https://hono.dev) | 轻量服务端 API 框架（CF Workers 兼容） |
| **样式** | [Tailwind CSS 3](https://tailwindcss.com) | 原子化 CSS + 暗色模式 |
| **动画** | [Framer Motion 11](https://motion.dev) | React 岛屿交互动画 |
| **图标** | [Lucide React](https://lucide.dev) | 开源图标库 |
| **图标** | [Supabase JS SDK](https://supabase.com) | 可选的 Auth / DB 客户端 |
| **运行时** | [Cloudflare Pages](https://pages.cloudflare.com) | 部署 + SSR 运行时 |
| **构建** | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | CF 环境变量管理 |

### 设计系统

| Token | 值 | 用途 |
|-------|-----|------|
| `brand-black` | `#030712` | 深色模式页面背景 |
| `brand-dark` | `#0B0F19` | 深色卡片/代码块背景 |
| `brand-card` | `#111827` | 卡片背景 |
| `brand-border` | `#1F2937` | 边框色 |
| `brand-text` | `#9CA3AF` | 辅助文本 |
| `brand-accent` | `#00E5FF` | 极光青 — 品牌高亮 |
| `brand-blue` | `#2563EB` | 深蓝 — 辅助强调色 |
| `sans` | Inter | 正文字体 |
| `mono` | JetBrains Mono | 代码/终端字体 |

---

## 项目结构

```
deepflow-website/
├── astro.config.mjs          # Astro 配置（Hybrid + CF 适配器）
├── tailwind.config.mjs       # Tailwind 配置（品牌色彩 Token）
├── wrangler.toml             # Cloudflare Pages 部署配置
├── tsconfig.json             # TypeScript 配置
├── package.json
│
├── public/
│   └── image1.png            # 静态资源（OG 图片等）
│
└── src/
    ├── pages/
    │   ├── index.astro       # ★ 主页入口（SSG 预渲染）
    │   └── api/
    │       └── [...route].ts # API catch-all，委托给 Hono
    │
    ├── layouts/
    │   └── BaseLayout.astro  # HTML 骨架、主题预加载、i18n 引导
    │
    ├── components/           # Astro 无交互组件
    │   ├── Header.astro
    │   ├── HeroSection.astro
    │   ├── FeatureGrid.astro
    │   ├── ArchitectureSection.astro
    │   ├── ToolsMatrixSection.astro
    │   ├── DeveloperDocs.astro
    │   └── Footer.astro
    │
    ├── react/                # React 交互岛屿
    │   ├── ThemeToggle.tsx   # 深色/浅色切换
    │   ├── LanguageToggle.tsx# 中/英语言切换
    │   ├── TerminalSimulator.tsx # Agent 循环终端模拟器
    │   ├── ArchitectureFlow.tsx  # 架构流交互图
    │   ├── ToolsGrid.tsx     # 工具矩阵交互筛选器
    │   ├── SmartDownloader.tsx  # 智能下载按钮（自动平台检测）
    │   └── AuthButton.tsx    # Supabase 身份验证按钮
    │
    ├── i18n/
    │   ├── translations.ts   # ★ 中/英完整翻译表
    │   └── LanguageContext.tsx# React i18n Context Provider
    │
    ├── data/
    │   ├── tools.ts          # ★ 22 个内置工具数据集
    │   ├── releases.json     # 发布版本 & 下载资产
    │   └── simSteps.ts       # 终端模拟步骤序列
    │
    ├── types/
    │   └── index.ts          # ★ 全局 TypeScript 类型定义
    │
    ├── server/
    │   ├── app.ts            # ★ Hono 应用工厂（中间件 + 路由注册）
    │   ├── routes/
    │   │   ├── releases.ts   # GET /api/releases/latest
    │   │   ├── tools.ts      # GET /api/tools   &   /api/tools/:name
    │   │   └── auth.ts       # POST /api/auth/*（Supabase 身份验证）
    │   └── utils/
    │       └── supabase.ts   # Supabase 客户端工厂
    │
    ├── utils/
    │   └── platform.ts       # User Agent 平台嗅探
    │
    └── styles/
        └── global.css        # 全局样式、网格背景、终端光标、滚动条
```

---

## 架构设计

### 渲染模型：Astro Hybrid

```
┌──────────────────────────────────────────────────────┐
│                    Cloudflare Pages                   │
│                                                        │
│   GET / (SSG)              GET /api/* (SSR)           │
│   ┌─────────────────┐     ┌────────────────────┐      │
│   │  index.astro     │     │  [...route].ts     │      │
│   │  (预渲染静态HTML) │     │  (动态执行)         │      │
│   │                 │     │       ↓             │      │
│   │  React Islands  │     │  Hono Factory      │      │
│   │  (客户端水合)    │     │  ┌──────────────┐  │      │
│   └─────────────────┘     │  │ releases.ts  │  │      │
│                            │  │ tools.ts     │  │      │
│                            │  │ auth.ts      │  │      │
│                            │  └──────────────┘  │      │
│                            └────────────────────┘      │
└──────────────────────────────────────────────────────┘
```

- **首页 (`index.astro`)**: 构建时预渲染为静态 HTML，`prerender = true`
- **API 路由 (`[...route].ts`)**: 运行时动态执行，`prerender = false`
- **React 岛屿**: 无共享根节点，每个 `.astro` 组件独立导入 React 岛屿，通过 `client:visible` / `client:idle` 按需水合

### API 层

API 请求经 Astro catch-all 转发至 Hono 实例：

| 端点 | 方法 | 说明 | 缓存策略 |
|------|------|------|---------|
| `/api/health` | GET | 健康检查 + 运行时长 | 无 |
| `/api/health/supabase` | GET | Supabase 连通性探测 | 无 |
| `/api/releases/latest` | GET | 最新版本 & 各平台下载资产 | 浏览器 1h / CDN 24h |
| `/api/tools` | GET | 工具列表（支持 `?type=` & `?category=` 筛选） | 浏览器 1d / CDN 7d |
| `/api/tools/:name` | GET | 单个工具详细定义 | 浏览器 1d / CDN 7d |
| `/api/auth/*` | POST | Supabase 身份验证 | 无 |

所有 API 响应遵循统一契约：

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}
```

### 数据流

```
┌──────────────┐    ┌──────────────┐    ┌─────────────────┐
│  tools.ts    │───▶│  /api/tools  │───▶│  ToolsGrid.tsx  │
│  (22 tools)  │    │  (Hono SSR)  │    │  (React Island) │
├──────────────┤    ├──────────────┤    ├─────────────────┤
│ releases.json│───▶│ /api/releases│───▶│ SmartDownloader │
│ (version + DL)│   │  (Hono SSR)  │    │  (React Island) │
├──────────────┤    └──────────────┘    └─────────────────┘
│ simSteps.ts  │
│ (LogStep[])  │───────────────────────▶ TerminalSimulator
└──────────────┘                         (React Island)
```

- **工具数据**: 静态 TypeScript 数组 → `GET /api/tools` → React 筛选过滤 UI
- **版本数据**: 静态 JSON → `GET /api/releases/latest` → 自动平台检测下载按钮
- **终端演示**: 硬编码的 LogStep 序列 → 逐行动画播放模拟 Agent 循环

---

## 国际化 (i18n)

系统支持 **简体中文 (zh)** 和 **英文 (en)** 两种语言。

### 工作原理

1. **翻译表**: `src/i18n/translations.ts` 定义了完整的 `Translations` 接口 + 中英对照
2. **静态内容**: HTML 标签使用 `data-i18n="key"` 属性标记，引导脚本自动替换文本
3. **React 内容**: 每个岛屿包裹 `<LanguageProvider>`，通过 `useLanguage().t.key` 获取翻译
4. **跨岛屿同步**: `deepflow:lang-change` 自定义事件在所有 React 岛屿和 Astro DOM 间同步
5. **持久化**: 语言偏好存储在 `localStorage('lang')`，默认跟随浏览器 `navigator.language`

### 新增翻译

1. 在 `Translations` 接口中添加新 key
2. 在 `zh` 和 `en` 两个对象中补充对应的值
3. 在 Astro 模板中使用 `data-i18n="key"`
4. 在 React 组件中通过 `useLanguage().t.key` 引用

---

## 主题系统

支持 **深色模式 (dark)** 和 **浅色模式 (light)**。

- Tailwind 的 `darkMode: 'class'` 策略，通过 `<html class="dark">` 驱动
- 首屏阻塞脚本从 `localStorage('theme')` 读取偏好并在 DOM 解析前应用，防止 FOUC（闪白）
- 未设置时跟随系统 `prefers-color-scheme`
- `ThemeToggle` React 岛屿切换并持久化选择
- 终端模块和代码克隆框始终保持深色背景（`.terminal-dark-box` / `.code-dark-box`），确保代码高亮对比度

---

## 开发指南

### 添加新的页面区块

1. 在 `src/components/` 创建 Astro 组件
2. 如需交互，在 `src/react/` 创建 React 组件并用 `client:*` 指令导入
3. 在 `src/pages/index.astro` 中引入并放置
4. 在 `src/i18n/translations.ts` 中添加所有 UI 字符串到 `Translations` 接口及中英对象
5. 静态文本使用 `data-i18n="key"`，React 文本使用 `useLanguage().t.key`

### 环境变量

用于本地开发的敏感配置放在 `.dev.vars`：

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

生产环境通过 Wrangler 设置：

```bash
npx wrangler pages secret put SUPABASE_URL --project-name=deepflow-website
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name=deepflow-website
```

### TypeScript

项目使用严格模式 TypeScript，路径别名 `@/*` 映射到 `src/*`：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

### 构建检查

```bash
npm run check    # Astro 内置 TypeScript 诊断
npm run build    # 生产构建（如有类型错误会失败）
```

---

## 部署

项目原生部署到 **Cloudflare Pages**。

```bash
# 1. 构建生产版本
npm run build

# 2. 使用 Wrangler 部署
npx wrangler pages deploy ./dist --project-name=deepflow-website

# 3. 或通过 Cloudflare Dashboard 连接 Git 仓库自动部署
```

### Cloudflare 配置

`wrangler.toml`：

```toml
name = "deepflow-website"
pages_build_output_dir = "./dist"
compatibility_date = "2026-06-09"
```

- 构建命令: `npm run build`
- 构建输出: `./dist`
- 适配器: `@astrojs/cloudflare`（Hybrid 模式自动输出 `_worker.js`）

---

## React 岛屿一览

| 组件 | 文件 | 水合策略 | 功能 |
|------|------|----------|------|
| 主题切换 | `ThemeToggle.tsx` | `client:visible` | 深色/浅色模式切换 |
| 语言切换 | `LanguageToggle.tsx` | `client:visible` | 中/英双语切换 |
| 终端模拟器 | `TerminalSimulator.tsx` | `client:idle` | Agent 循环动画演示 |
| 架构流程图 | `ArchitectureFlow.tsx` | `client:visible` | 双进程交互架构可视化 |
| 工具矩阵 | `ToolsGrid.tsx` | `client:visible` | 工具筛选/查看/参数展示 |
| 智能下载 | `SmartDownloader.tsx` | `client:idle` | 自动检测平台，展示下载链接 |
| 身份认证 | `AuthButton.tsx` | `client:idle` | Supabase 登录/用户菜单 |

---

## 与 DeepFlow 桌面端的对应关系

本网站的前端类型定义与 DeepFlow Electron 应用的类型系统保持同构映射：

```
electron/types.ts  ←→  src/types/index.ts
```

| 概念 | 桌面端实现 | 网站数据源 |
|------|-----------|-----------|
| 22 个工具 | `electron/src/tools/` | `src/data/tools.ts` |
| 权限模式 | `PermissionGate` | `types.ts PermissionMode` |
| LogStep 序列 | `AgentLoop` 运行时日志 | `src/data/simSteps.ts` |
| 发布版本 | `electron/release/` | `src/data/releases.json` |
| 平台检测 | `electron/utils/platform.ts` | `src/utils/platform.ts` |

---

## 浏览器兼容性

项目构建产物面向现代浏览器（Chrome/Firefox/Safari/Edge 最近 2 个主版本），经由 Astro 的自动转译与 polyfill 策略提供兼容性保障。

---

## 许可证

[MIT License](./LICENSE)

© 2026 DeepFlow Core Contributors.
