import type { LogStep } from '../types';

/**
 * 终端模拟演示的完整步骤序列
 *
 * 模拟一个典型的 ReAct Agent 循环：
 *   用户输入 → 调度分配 → 计划生成 → Glob 搜索 → Read 读取 →
 *   权限阻断 (Write) → 用户批准 → 文件写入 → LSP 静态检查 → 门禁审查 → 任务完成
 */
export const SIM_STEPS: LogStep[] = [
  {
    type: 'input',
    text: 'deepflow:start-agent --task "为 App.tsx 模块编写单元测试，利用 LSP 检验确保语法无误，确认后合并成果"',
  },
  {
    type: 'system',
    text: '[AgentScheduler] 分配 AgentId: a7b1-9d2c-f6ea | 优先级: HIGH | 最大并发度限制: 3',
  },
  {
    type: 'step',
    title: 'Phase 1: 计划树生成',
    text: '子 Agent 脑暴结构化计划 TaskPlan...\n✔ 已生成 TaskPlan JSON 树\n├─ 任务 1: 运行 Glob / Grep 定位 App.tsx 核心测试点\n├─ 任务 2: 新建 App.test.tsx 测试文件\n├─ 任务 3: 运行 LSP (tsc --noEmit) 静态语法分析\n└─ 任务 4: 利用 ReviewArtifact 编译质检门禁并合并',
  },
  {
    type: 'tool-call',
    name: 'Glob',
    args: '{ "pattern": "**/App.tsx", "maxDepth": 6 }',
    status: 'SUCCESS',
    result: '找到 1 个匹配文件: src/App.tsx',
  },
  {
    type: 'tool-call',
    name: 'Read',
    args: '{ "path": "src/App.tsx", "limit": 100 }',
    status: 'SUCCESS',
    result: '已读出 App.tsx (长度约 2400 字节，成功获取核心状态结构)',
  },
  {
    type: 'permission',
    text: '⚠️ 【安全看门狗】检测到高危写入尝试!\n工具: Write\n参数: "src/__tests__/App.test.tsx"\n策略模式: Ask (当前等待人工批准中...)',
  },
  {
    type: 'user-approved',
    text: '✔ 用户从前端弹窗点击【允许执行本次操作】',
  },
  {
    type: 'tool-call',
    name: 'Write',
    args: '{ "path": "src/__tests__/App.test.tsx", "content": "import { test, expect } from \'vitest\'..." }',
    status: 'SUCCESS',
    result: '测试用例构建完毕，已创建快照备份至 .draeven-snapshots/',
  },
  {
    type: 'tool-call',
    name: 'LSP',
    args: '{ "command": "diagnostics" }',
    status: 'SUCCESS',
    result: '静态类型检查成功! tsc 报错行数: 0 (没有发现隐式 any 或悬挂类型)',
  },
  {
    type: 'tool-call',
    name: 'ReviewArtifact',
    args: '{ "scope": "test" }',
    status: 'SUCCESS',
    result: '单元测试执行结果:\n✓ App.test.tsx (2.1s)\n✓ 1 passed | 100% components covered',
  },
  {
    type: 'success-answer',
    text: '<FINAL_ANSWER>\nApp.tsx 的测试体系编写且静态 LSP 质检通过。测试覆盖率达到 100%。成果已合并进入主开发区工作目录。\n</FINAL_ANSWER>',
  },
];
