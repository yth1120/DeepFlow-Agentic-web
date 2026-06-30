export type Language = 'zh' | 'en';

export interface Translations {
  // Header
  nav_features: string;
  nav_demo: string;
  nav_architecture: string;
  nav_developer: string;
  nav_download: string;
  nav_github_label: string;

  // Hero
  hero_badge: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_description: string;
  hero_stat_tools: string;
  hero_stat_tools_sub: string;
  hero_stat_loop: string;
  hero_stat_loop_sub: string;
  hero_stat_local: string;
  hero_stat_local_sub: string;

  // Download
  download_current_version: string;
  download_detected: string;
  download_loading: string;
  download_error: string;
  download_mobile_warning: string;

  // Terminal
  terminal_title: string;
  terminal_target: string;
  terminal_play: string;
  terminal_pause: string;
  terminal_skip: string;
  terminal_reset: string;
  terminal_replay: string;
  terminal_finished: string;
  terminal_allow: string;
  terminal_deny: string;

  // Features
  features_title: string;
  features_subtitle: string;
  feature1_title: string;
  feature1_desc: string;
  feature2_title: string;
  feature2_desc: string;
  feature3_title: string;
  feature3_desc: string;
  feature4_title: string;
  feature4_desc: string;
  feature5_title: string;
  feature5_desc: string;
  feature6_title: string;
  feature6_desc: string;

  // Architecture
  arch_title: string;
  arch_subtitle: string;
  arch_renderer_title: string;
  arch_renderer_1: string;
  arch_renderer_2: string;
  arch_renderer_3: string;
  arch_renderer_4: string;
  arch_ipc_label: string;
  arch_ipc_bridge: string;
  arch_ipc_protocol: string;
  arch_main_title: string;
  arch_main_1: string;
  arch_main_2: string;
  arch_main_3: string;
  arch_main_4: string;

  // Tools
  tools_title: string;
  tools_subtitle: string;
  tools_danger_label: string;
  tools_safe_label: string;
  tools_filter_all: string;
  tools_filter_danger: string;
  tools_filter_safe: string;
  tools_filter_filesystem: string;
  tools_filter_search: string;
  tools_filter_execution: string;
  tools_filter_planning: string;
  tools_filter_review: string;
  tools_filter_communication: string;
  tools_badge_danger: string;
  tools_badge_safe: string;
  tools_view_params: string;
  tools_hide_params: string;
  tools_loading: string;
  tools_error: string;
  tools_empty: string;

  // Developer Docs
  dev_title: string;
  dev_description: string;
  dev_check1: string;
  dev_check2: string;
  dev_step1_comment: string;
  dev_step2_comment: string;
  dev_step3_comment: string;
  dev_step3_line2: string;
  dev_titlebar: string;
  dev_titlebar_type: string;
  dev_copy_button: string;

  // Footer
  footer_brand: string;
  footer_spec_title: string;
  footer_spec_1: string;
  footer_spec_2: string;
  footer_spec_3: string;
  footer_spec_4: string;
  footer_contrib_title: string;
  footer_contrib_1: string;
  footer_contrib_2: string;
  footer_contrib_3: string;
  footer_contrib_4: string;
  footer_support_title: string;
  footer_support_1: string;
  footer_support_2: string;
  footer_support_3: string;
  footer_copyright: string;
  footer_privacy: string;
  footer_license: string;

  // Theme
  theme_dark: string;
  theme_light: string;

  // Download dialog
  download_unavailable: string;

  // Download button tooltips
  download_windows_tip: string;
  download_mac_tip: string;
  download_linux_tip: string;
}

const zh: Translations = {
  nav_features: '技术特性',
  nav_demo: '智能体演练',
  nav_architecture: '系统架构',
  nav_developer: '二次开发',
  nav_download: '免费下载',
  nav_github_label: 'DeepFlow GitHub 仓库',

  hero_badge: '本地沙箱隔离 · 基于 DeepSeek 大模型驱动',
  hero_title_line1: '拒绝黑盒，',
  hero_title_line2: '掌控真正的 AI 编程智能体',
  hero_description:
    'DeepFlow 是为极客量身定制的桌面端 AI 协同平台。通过原生 Electron 驱动本地工具（Bash/LSP/Git），构建双路径 ReAct 自闭环智能体，彻底告别只说不写的"被动型"AI。',
  hero_stat_tools: '22 个',
  hero_stat_tools_sub: '内置高危/只读工具链',
  hero_stat_loop: 'Dual-Loop',
  hero_stat_loop_sub: '聊天流与独立 Agent 循环',
  hero_stat_local: '100%',
  hero_stat_local_sub: '本地工作区/记忆沙箱化',

  download_current_version: '当前稳定版本',
  download_detected: '检测到:',
  download_loading: '加载中...',
  download_error: '版本信息加载失败，下载链接可能不可用。',
  download_mobile_warning: 'DeepFlow 为桌面端（Mac / Windows / Linux）原生开发工具，请在桌面端浏览器打开以下载。',

  terminal_title: 'agent_scheduler_loop_v1.sh',
  terminal_target: '目标: "为模块编写单元测试并进行 LSP 校验"',
  terminal_play: '播放',
  terminal_pause: '暂停',
  terminal_skip: '跳过',
  terminal_reset: '重置',
  terminal_replay: '重放',
  terminal_finished: 'Agent 调度完成。点击「重放」按钮重新演示。',
  terminal_allow: '允许执行',
  terminal_deny: '拒绝',

  features_title: '外置于系统的透明能力',
  features_subtitle:
    '彻底打开大模型和操作系统之间的"黑盒"。DeepFlow 不仅发送 prompt，更是一整套可审计的代码执行机系统。',
  feature1_title: '三模态权限看门狗',
  feature1_desc:
    '内置 Ask (确认执行)、Plan (审批执行)、与 AFE (全自动执行)。只读操作默默放行，高危命令（如 Bash/Write）必经严苛阻断拦截审查。',
  feature2_title: '双路径自主决策模型',
  feature2_desc:
    '主聊天的 ReAct 循环 (快响应) 与独立子 Agent 的 TaskPlan (深考量) 决策双模并立。内置偏差检测算法（Blocked、停滞、重规划三级防御机制）。',
  feature3_title: 'Git Worktree 沙箱隔离',
  feature3_desc:
    '拒绝弄脏本地开发主目录！自动为并发 Agent 建立独立 worktree，所有修改完全在后台脏沙箱内试运行，审查无误后通过合并机制落入主机。',
  feature4_title: 'SQLite + 加密持久化记忆',
  feature4_desc:
    '内置 SQLite 数据库作为长期项目记忆仓，安全敏感设置（API-Keys）完全基于 Electron 的 safeStorage 本地硬件加密锁进行序列化。',
  feature5_title: 'MCP (模型上下文协议) 支持',
  feature5_desc:
    '完美实现 JSON-RPC over stdio 标准。自由拉取第三方 MCP 节点服务器，动态整合代码索引、文档提取和特定数据库交互能力。',
  feature6_title: '安全插件动态加载器',
  feature6_desc:
    '前端渲染侧支持扩展点机制，但在载入前会严格扫描源码中 eval、child_process、fs 及非常规 fetch 行为，从源头切断流氓插件窃密隐患。',

  arch_title: '透明、干净的双进程交互架构',
  arch_subtitle: '拒绝一切黑盒逻辑。这是 DeepFlow 的内部运行模式，让每一条数据流转都在你的控制之中。',
  arch_renderer_title: 'Renderer Process (渲染进程 / React 18)',
  arch_renderer_1: 'Ant Design 5 UI (深色/浅色)',
  arch_renderer_2: '12 个独立 Zustand Stores',
  arch_renderer_3: 'Markdown 渲染 (rehype + katex + mermaid)',
  arch_renderer_4: '动态插件管理器 (沙箱前置审计)',
  arch_ipc_label: 'IPC 双向传输',
  arch_ipc_bridge: 'Context Bridge',
  arch_ipc_protocol: 'domain:action 协议',
  arch_main_title: 'Main Process (主进程 / Node.js Env)',
  arch_main_1: '22个本地工具底层执行器',
  arch_main_2: '决策双核 (query-engine & agent-loop)',
  arch_main_3: 'Electron safeStorage 硬件加密',
  arch_main_4: 'Worktree 沙箱隔离区与冲突锁定',

  tools_title: '彻底解耦的内置工具矩阵',
  tools_subtitle:
    '智能体在每一步 ReAct 循环中，将根据您的系统权限约束，挑选最合理的工具集进行组装。',
  tools_danger_label: '危险工具 (危险指令弹框)',
  tools_safe_label: '安全工具 (静默秒级返回)',
  tools_filter_all: '全部',
  tools_filter_danger: '危险',
  tools_filter_safe: '安全',
  tools_filter_filesystem: '文件系统',
  tools_filter_search: '搜索',
  tools_filter_execution: '执行',
  tools_filter_planning: '规划',
  tools_filter_review: '审查',
  tools_filter_communication: '通信',
  tools_badge_danger: '危险',
  tools_badge_safe: '安全',
  tools_view_params: '查看参数',
  tools_hide_params: '收起 Schema',
  tools_loading: '加载工具数据...',
  tools_error: '工具数据加载失败：',
  tools_empty: '当前筛选条件下没有匹配的工具。',

  dev_title: '基于 DeepFlow 进行二次开发',
  dev_description:
    'DeepFlow 的主进程和渲染进程全部基于 TypeScript 开发。它提供了完美的 TS 类型镜像支持（electron/types.ts ↔ src/types/），无论您是想扩展底层工具、外接企业 MCP 服务器还是修改 Zustand 的 12 个持久化 Store，我们都已准备好了完善的基础设施。',
  dev_check1: 'Vitest 前后端覆盖率门槛，代码更稳健',
  dev_check2: '严格的 CSP 内容安全限制与沙箱锁保证主进程安全',
  dev_step1_comment: '// 1. 克隆底层核心仓库',
  dev_step2_comment: '// 2. 创建本地开发环境变量配置',
  dev_step3_comment: '// 3. 安装依赖并启动 Electron 联动调试开发',
  dev_step3_line2: 'npm run electron:dev',
  dev_titlebar: '快速克隆并启动开发',
  dev_titlebar_type: 'TypeScript / Vite',
  dev_copy_button: '复制命令',

  footer_brand: '基于 Electron 构建的极致安全、工程高透明的 AI 驱动协作智能体调度底座。',
  footer_spec_title: '核心规范',
  footer_spec_1: 'ReAct 循环底座',
  footer_spec_2: '22 个底层工具集',
  footer_spec_3: 'MCP JSON-RPC 标准',
  footer_spec_4: 'Git Worktree 隔离',
  footer_contrib_title: '开源贡献',
  footer_contrib_1: '开发者指南',
  footer_contrib_2: '插件开发协议',
  footer_contrib_3: '双进程共享类型',
  footer_contrib_4: 'Vitest 覆盖率规约',
  footer_support_title: '服务支持',
  footer_support_1: '报告安全缺陷 (CSP 违规)',
  footer_support_2: 'GitHub Issues 讨论版',
  footer_support_3: 'Discord 用户社区',
  footer_copyright: '© 2026 DeepFlow Core Contributors. 基于 MIT License 开源.',
  footer_privacy: '隐私条例',
  footer_license: '软件许可证',

  theme_dark: '切换到深色模式',
  theme_light: '切换到浅色模式',

  download_unavailable: '下载链接暂不可用：',
  download_windows_tip: '下载 Windows 版本',
  download_mac_tip: '下载 macOS 版本',
  download_linux_tip: '下载 Linux 版本',
};

const en: Translations = {
  nav_features: 'Features',
  nav_demo: 'Agent Demo',
  nav_architecture: 'Architecture',
  nav_developer: 'Dev Docs',
  nav_download: 'Download',
  nav_github_label: 'DeepFlow GitHub Repository',

  hero_badge: 'Local Sandbox · Powered by DeepSeek LLM',
  hero_title_line1: 'No Black Box,',
  hero_title_line2: 'Take Control of Your AI Coding Agent',
  hero_description:
    'DeepFlow is a desktop AI co-pilot platform built for hackers. Powered by native Electron, it drives local tools (Bash/LSP/Git) through a dual-path ReAct self-looping agent — no more "passive" AI.',
  hero_stat_tools: '22 Tools',
  hero_stat_tools_sub: 'Built-in safe & dangerous toolchain',
  hero_stat_loop: 'Dual-Loop',
  hero_stat_loop_sub: 'Chat stream & standalone Agent loops',
  hero_stat_local: '100%',
  hero_stat_local_sub: 'Local workspace / sandboxed memory',

  download_current_version: 'Current Stable Version',
  download_detected: 'Detected:',
  download_loading: 'Loading...',
  download_error: 'Failed to load version info. Download links may be unavailable.',
  download_mobile_warning:
    'DeepFlow is a desktop-native tool for Mac / Windows / Linux. Please open this page on a desktop browser to download.',

  terminal_title: 'agent_scheduler_loop_v1.sh',
  terminal_target: 'Target: "Write unit tests for the module and run LSP validation"',
  terminal_play: 'Play',
  terminal_pause: 'Pause',
  terminal_skip: 'Skip',
  terminal_reset: 'Reset',
  terminal_replay: 'Replay',
  terminal_finished: 'Agent scheduling complete. Click "Replay" to restart.',
  terminal_allow: 'Allow',
  terminal_deny: 'Deny',

  features_title: 'Transparent Capabilities, Outside the System',
  features_subtitle:
    'Open the "black box" between LLMs and the operating system. DeepFlow is not just a prompt sender — it is a fully auditable code execution engine.',
  feature1_title: 'Tri-Modal Permission Watchdog',
  feature1_desc:
    'Built-in Ask (confirm), Plan (approve), and AFE (auto-execute). Read-only operations pass silently; dangerous commands (Bash/Write) must pass strict interception review.',
  feature2_title: 'Dual-Path Autonomous Decision Engine',
  feature2_desc:
    'The main chat ReAct loop (fast response) and independent sub-agent TaskPlan (deep reasoning) run side by side. Built-in drift detection (Blocked → Stalled → Replan).',
  feature3_title: 'Git Worktree Sandbox Isolation',
  feature3_desc:
    'Never pollute your working directory! Independent worktrees are auto-created for concurrent agents. All modifications run in a dirty sandbox and merge only after review.',
  feature4_title: 'SQLite + Encrypted Persistent Memory',
  feature4_desc:
    'Built-in SQLite serves as long-term project memory. Security-sensitive settings (API keys) are serialized via Electron safeStorage with local hardware-backed encryption.',
  feature5_title: 'MCP (Model Context Protocol) Support',
  feature5_desc:
    'Full JSON-RPC over stdio compliance. Pull third-party MCP server nodes to dynamically integrate code indexing, document extraction, and database interaction capabilities.',
  feature6_title: 'Secure Plugin Dynamic Loader',
  feature6_desc:
    'Extension points are supported on the renderer side, but source code is strictly scanned for eval, child_process, fs, and irregular fetch calls before loading — eliminating rogue plugin data theft at the root.',

  arch_title: 'Transparent, Clean Dual-Process Architecture',
  arch_subtitle: 'No black-box logic. This is how DeepFlow operates internally — every data flow under your control.',
  arch_renderer_title: 'Renderer Process (React 18)',
  arch_renderer_1: 'Ant Design 5 UI (Dark / Light)',
  arch_renderer_2: '12 Independent Zustand Stores',
  arch_renderer_3: 'Markdown Rendering (rehype + katex + mermaid)',
  arch_renderer_4: 'Dynamic Plugin Manager (Sandbox Pre-Audit)',
  arch_ipc_label: 'IPC Bidirectional',
  arch_ipc_bridge: 'Context Bridge',
  arch_ipc_protocol: 'domain:action Protocol',
  arch_main_title: 'Main Process (Node.js Env)',
  arch_main_1: '22 Native Tool Executors',
  arch_main_2: 'Dual Decision Core (query-engine & agent-loop)',
  arch_main_3: 'Electron safeStorage HW Encryption',
  arch_main_4: 'Worktree Sandbox Isolation & Conflict Locking',

  tools_title: 'Fully Decoupled Built-in Tool Matrix',
  tools_subtitle:
    'At each ReAct loop step, the agent selects the most appropriate toolset based on your system permission constraints.',
  tools_danger_label: 'Dangerous (requires approval)',
  tools_safe_label: 'Safe (silent pass-through)',
  tools_filter_all: 'All',
  tools_filter_danger: 'Danger',
  tools_filter_safe: 'Safe',
  tools_filter_filesystem: 'FileSystem',
  tools_filter_search: 'Search',
  tools_filter_execution: 'Execute',
  tools_filter_planning: 'Planning',
  tools_filter_review: 'Review',
  tools_filter_communication: 'Comms',
  tools_badge_danger: 'Danger',
  tools_badge_safe: 'Safe',
  tools_view_params: 'View Schema',
  tools_hide_params: 'Hide Schema',
  tools_loading: 'Loading tools...',
  tools_error: 'Failed to load tools: ',
  tools_empty: 'No tools match the current filter.',

  dev_title: 'Extend DeepFlow',
  dev_description:
    'DeepFlow is built entirely in TypeScript, with mirrored type definitions (electron/types.ts ↔ src/types/). Whether you want to extend low-level tools, connect enterprise MCP servers, or modify the 12 Zustand persistent stores, we have the infrastructure ready for you.',
  dev_check1: 'Vitest coverage thresholds for both frontend and backend',
  dev_check2: 'Strict CSP enforcement and sandbox locks ensure main process security',
  dev_step1_comment: '// 1. Clone the core repository',
  dev_step2_comment: '// 2. Create local environment config',
  dev_step3_comment: '// 3. Install dependencies & launch Electron dev mode',
  dev_step3_line2: 'npm run electron:dev',
  dev_titlebar: 'Quick Clone & Start Development',
  dev_titlebar_type: 'TypeScript / Vite',
  dev_copy_button: 'Copy command',

  footer_brand:
    'An ultra-secure, engineering-transparent AI-driven collaborative agent scheduler built on Electron.',
  footer_spec_title: 'Core Spec',
  footer_spec_1: 'ReAct Loop Engine',
  footer_spec_2: '22 Built-in Tools',
  footer_spec_3: 'MCP JSON-RPC Standard',
  footer_spec_4: 'Git Worktree Isolation',
  footer_contrib_title: 'Open Source',
  footer_contrib_1: 'Developer Guide',
  footer_contrib_2: 'Plugin Protocol',
  footer_contrib_3: 'Shared Types',
  footer_contrib_4: 'Vitest Coverage',
  footer_support_title: 'Support',
  footer_support_1: 'Report Security Issues',
  footer_support_2: 'GitHub Discussions',
  footer_support_3: 'Discord Community',
  footer_copyright: '© 2026 DeepFlow Core Contributors. Open source under MIT License.',
  footer_privacy: 'Privacy',
  footer_license: 'License',

  theme_dark: 'Switch to Dark Mode',
  theme_light: 'Switch to Light Mode',

  download_unavailable: 'Download not available: ',
  download_windows_tip: 'Download for Windows',
  download_mac_tip: 'Download for macOS',
  download_linux_tip: 'Download for Linux',
};

export const TRANSLATIONS: Record<Language, Translations> = { zh, en };
