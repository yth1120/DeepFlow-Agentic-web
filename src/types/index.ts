/**
 * DeepFlow 共享类型定义
 *
 * 与 electron/types.ts 及 src/types/ 保持同构映射。
 * 所有 IPC 通道名称、Zustand 持久化前缀均有标注说明。
 */

// ─── 权限模态 ─────────────────────────────────────
/** 工具执行权限策略 — 与 Electron 主进程的 PermissionGate 完全对齐 */
export type PermissionMode = 'ask' | 'plan' | 'afe';

// ─── 工具分类 ─────────────────────────────────────
/** 工具安全等级 */
export type ToolType = 'danger' | 'safe';

/** 工具功能分类（按职责域划分） */
export type ToolCategory =
  | 'filesystem'
  | 'search'
  | 'execution'
  | 'planning'
  | 'review'
  | 'communication';

// ─── 终端仿真 ─────────────────────────────────────
/**
 * 终端日志条目类型
 *
 * 状态机流转：
 *   input → system → step → tool-call → ... → permission → user-approved → ... → success-answer
 *
 * 当 type === 'permission' 时，终端自动暂停，等待用户人工批准。
 */
export type LogStepType =
  | 'input'
  | 'system'
  | 'step'
  | 'tool-call'
  | 'permission'
  | 'user-approved'
  | 'success-answer';

export interface LogStep {
  type: LogStepType;
  /** 通用文本内容（input / system / permission / success-answer） */
  text?: string;
  /** step 类型标题 */
  title?: string;
  /** tool-call 类型工具名 */
  name?: string;
  /** tool-call 类型参数 JSON */
  args?: string;
  /** tool-call 执行状态 */
  status?: 'SUCCESS' | 'FAILED' | 'PENDING';
  /** tool-call 执行返回结果 */
  result?: string;
}

// ─── 播放状态 ─────────────────────────────────────
export type PlayState = 'playing' | 'paused' | 'finished';
export type PermissionState = 'idle' | 'awaiting-approval' | 'approved' | 'denied';

// ─── 工具数据结构 ─────────────────────────────────
export interface Tool {
  /** 工具唯一标识名 */
  name: string;
  /** 安全分级 */
  type: ToolType;
  /** 中文简述 */
  description: string;
  /** 参数 Schema（字段名 → 类型字符串） */
  paramSchema: Record<string, string>;
  /** 功能分类 */
  category: ToolCategory;
}

// ─── 平台检测 ─────────────────────────────────────
export type Platform = 'windows' | 'mac' | 'linux' | 'mobile';

// ─── API 响应封装 ─────────────────────────────────
/** 统一 API 响应封装 — 前端所有 fetch 调用的返回契约 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// ─── 发布版本 ─────────────────────────────────────
/** 各平台下载资产信息 */
export interface DownloadAsset {
  /** 展示标签，如 "macOS (Universal DMG)" */
  label: string;
  /** CDN 直链 */
  url: string;
  /** 文件体积，如 "142 MB" */
  size: string;
  /** CPU 架构，如 "arm64" | "x64" | "universal" */
  arch?: string;
}

/** 发布版本完整信息 */
export interface ReleaseInfo {
  version: string;
  releaseDate: string;
  changelog: string[];
  downloads: Record<Platform, DownloadAsset>;
}

// ─── API 响应数据类型 ──────────────────────────────
/** GET /api/tools 返回的工具列表 */
export interface ToolsListData {
  tools: Tool[];
  total: number;
  stats: {
    danger: number;
    safe: number;
  };
}
