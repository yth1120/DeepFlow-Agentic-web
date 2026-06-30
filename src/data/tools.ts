import type { Tool } from '../types';

/**
 * DeepFlow 完整的 22 个内置工具数据集
 *
 * 危险工具 (9): 需要权限看门狗拦截 — Bash, Write, Edit, WebFetch, WebSearch,
 *                CronCreate, TaskStop, NotebookEdit, ReviewArtifact
 * 安全工具 (13): 静默自动放行 — Read, Grep, Glob, TodoWrite, EnterPlanMode,
 *                ExitPlanMode, EnterWorktree, LSP, CronDelete, CronList,
 *                TaskOutput, Agent, AskUserQuestion
 */
export const ALL_TOOLS: Tool[] = [
  // ═══ 危险工具 (Danger) ═══
  {
    name: 'Bash',
    type: 'danger',
    description: '在项目目录下启动 Shell 执行命令，自适应 Git Bash / Unix Terminal。所有命令在沙箱化子进程中运行。',
    paramSchema: { command: 'string', timeout: 'number' },
    category: 'execution',
  },
  {
    name: 'Write',
    type: 'danger',
    description: '新建/覆写文件。写入前校验白名单路径，自动创建前置快照防止不可逆损坏。',
    paramSchema: { file_path: 'string', content: 'string' },
    category: 'filesystem',
  },
  {
    name: 'Edit',
    type: 'danger',
    description: '通过 AST 匹配与唯一正则精确查找并替换文件中的部分段落，避免全量覆写风险。',
    paramSchema: { file_path: 'string', old_string: 'string', new_string: 'string' },
    category: 'filesystem',
  },
  {
    name: 'WebFetch',
    type: 'danger',
    description: '拉取外网 URL 文档内容。内置防内网穿透劫持，自动拦截局域网 IP 地址。',
    paramSchema: { url: 'string', prompt: 'string' },
    category: 'communication',
  },
  {
    name: 'WebSearch',
    type: 'danger',
    description: '执行网络搜索并返回结果摘要。支持域名白名单/黑名单过滤。',
    paramSchema: { query: 'string' },
    category: 'communication',
  },
  {
    name: 'CronCreate',
    type: 'danger',
    description: '创建定时任务（会话级或持久化）。支持标准 5 字段 Cron 表达式。',
    paramSchema: { cron: 'string', prompt: 'string' },
    category: 'execution',
  },
  {
    name: 'TaskStop',
    type: 'danger',
    description: '强制终止运行中的后台任务（Shell / Agent / Remote Session）。',
    paramSchema: { task_id: 'string' },
    category: 'execution',
  },
  {
    name: 'NotebookEdit',
    type: 'danger',
    description: '支持交互式 Jupyter (.ipynb) 单元格的结构化热插拔改动（替换/插入/删除）。',
    paramSchema: { notebook_path: 'string', cell_id: 'string', new_source: 'string' },
    category: 'filesystem',
  },
  {
    name: 'ReviewArtifact',
    type: 'danger',
    description: '门禁检查工具。预编译/跑测通过前阻塞代码合并决策，确保 CI 红线不被突破。',
    paramSchema: { scope: 'string' },
    category: 'review',
  },

  // ═══ 安全工具 (Safe) ═══
  {
    name: 'Read',
    type: 'safe',
    description: '快速流式解析目标文件行偏移，支持按指定片段精确抽取内容。',
    paramSchema: { file_path: 'string' },
    category: 'filesystem',
  },
  {
    name: 'Grep',
    type: 'safe',
    description: '基于 ripgrep 构建的高速内容搜索，支持正则匹配、多行模式、文件类型过滤。',
    paramSchema: { pattern: 'string' },
    category: 'search',
  },
  {
    name: 'Glob',
    type: 'safe',
    description: '快速文件模式匹配。支持 glob 通配符模式（如 **/*.ts），返回匹配文件路径列表。',
    paramSchema: { pattern: 'string' },
    category: 'search',
  },
  {
    name: 'TodoWrite',
    type: 'safe',
    description: '创建/更新当前会话的任务列表。AI 可在 ReAct 循环中实时追踪子任务进度。',
    paramSchema: { todos: 'Todo[]' },
    category: 'planning',
  },
  {
    name: 'EnterPlanMode',
    type: 'safe',
    description: '进入架构设计规划模式。在编写任何非平凡代码之前先获得用户对实现方案的批准。',
    paramSchema: {},
    category: 'planning',
  },
  {
    name: 'ExitPlanMode',
    type: 'safe',
    description: '退出规划模式并请求用户批准当前设计方案。过渡到实施阶段。',
    paramSchema: {},
    category: 'planning',
  },
  {
    name: 'EnterWorktree',
    type: 'safe',
    description: '创建/进入隔离的 Git Worktree 沙箱。为并发 Agent 提供独立的文件系统副本。',
    paramSchema: { name: 'string' },
    category: 'planning',
  },
  {
    name: 'LSP',
    type: 'safe',
    description: '静态语言服务器诊断。运行 tsc --noEmit、引用跳转、查找定义等无副作用操作。',
    paramSchema: { command: 'string' },
    category: 'search',
  },
  {
    name: 'CronDelete',
    type: 'safe',
    description: '取消指定的定时任务并从内存调度器中移除。不产生文件系统变更。',
    paramSchema: { id: 'string' },
    category: 'execution',
  },
  {
    name: 'CronList',
    type: 'safe',
    description: '列出当前会话中所有已注册的定时任务及其触发周期和状态。',
    paramSchema: {},
    category: 'execution',
  },
  {
    name: 'TaskOutput',
    type: 'safe',
    description: '获取运行中或已完成任务的标准输出/错误输出，支持阻塞等待或非阻塞轮询。',
    paramSchema: { task_id: 'string' },
    category: 'execution',
  },
  {
    name: 'Agent',
    type: 'safe',
    description: '调度一个子智能体处理复杂多步骤任务。支持多种专用 Agent 类型（Explore/Plan/Review）。',
    paramSchema: { prompt: 'string', subagent_type: 'string' },
    category: 'planning',
  },
  {
    name: 'AskUserQuestion',
    type: 'safe',
    description: '在不阻塞执行流的情况下向用户发起多选/单选问题收集，用于澄清需求或确认决策。',
    paramSchema: { questions: 'Question[]' },
    category: 'communication',
  },
];

/** 按类型筛选 */
export const DANGER_TOOLS = ALL_TOOLS.filter((t) => t.type === 'danger');
export const SAFE_TOOLS = ALL_TOOLS.filter((t) => t.type === 'safe');

/** 按分类筛选 */
export const TOOLS_BY_CATEGORY: Record<string, Tool[]> = {
  filesystem: ALL_TOOLS.filter((t) => t.category === 'filesystem'),
  search: ALL_TOOLS.filter((t) => t.category === 'search'),
  execution: ALL_TOOLS.filter((t) => t.category === 'execution'),
  planning: ALL_TOOLS.filter((t) => t.category === 'planning'),
  review: ALL_TOOLS.filter((t) => t.category === 'review'),
  communication: ALL_TOOLS.filter((t) => t.category === 'communication'),
};
