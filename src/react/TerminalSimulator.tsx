import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { SIM_STEPS } from '../data/simSteps';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import type { LogStep, PlayState, PermissionState } from '../types';

/**
 * 交互式终端仿真器 (React 孤岛)
 *
 * 将原 deepflow.html 中的 setInterval 定时器硬编码重构为
 * 完全状态驱动、抗竞态的 React 终端组件。
 *
 * 核心状态机：
 *   PlayState:  playing | paused | finished
 *   PermissionState: idle | awaiting-approval | approved | denied
 */

const STEP_INTERVAL_MS = 1800;

/** 为各日志类型生成终端 HTML 类名 */
function getLogClassNames(step: LogStep): { container: string; preBlock?: string } {
  switch (step.type) {
    case 'input':
      return { container: 'text-brand-accent font-semibold' };
    case 'system':
      return { container: 'text-slate-500 dark:text-slate-400 text-[11px] border-l-2 border-slate-300 dark:border-slate-700 pl-2 py-0.5' };
    case 'step':
      return { container: 'bg-brand-blue/5 dark:bg-brand-blue/10 border border-brand-blue/20 dark:border-brand-blue/30 p-2.5 rounded text-slate-700 dark:text-slate-300' };
    case 'tool-call':
      return { container: 'bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-brand-border p-2.5 rounded' };
    case 'permission':
      return { container: 'bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-300 dark:border-yellow-700/30 p-2.5 rounded text-yellow-700 dark:text-yellow-500' };
    case 'user-approved':
      return { container: 'text-emerald-600 dark:text-emerald-400 font-semibold' };
    case 'success-answer':
      return {
        container: 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 p-3 rounded text-slate-700 dark:text-slate-200',
      };
  }
}

/** 渲染单条日志条目 */
function LogEntry({
  step,
  permissionState,
  onApprove,
  onDeny,
}: {
  step: LogStep;
  permissionState: PermissionState;
  onApprove: () => void;
  onDeny: () => void;
}) {
  const classes = getLogClassNames(step);
  const isAwaitingApproval = step.type === 'permission' && permissionState === 'awaiting-approval';

  return (
    <div className={`font-mono text-xs leading-relaxed ${classes.container}`}>
      {step.type === 'input' && (
        <div className="flex items-start gap-1.5">
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span className="cursor-blink">{step.text}</span>
        </div>
      )}

      {step.type === 'system' && <span>{step.text}</span>}

      {step.type === 'step' && (
        <>
          <div className="text-brand-blue dark:text-brand-accent font-semibold mb-1">{step.title}</div>
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-600 dark:text-slate-400">
            {step.text}
          </pre>
        </>
      )}

      {step.type === 'tool-call' && (
        <>
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 mb-1">
            <span>
              调用工具: <span className="text-brand-accent font-bold">{step.name}</span>
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-900/40 px-1 rounded font-mono">
              {step.status}
            </span>
          </div>
          <div className="text-slate-400 dark:text-slate-500 text-[10px] mb-1.5">参数: {step.args}</div>
          <div className="text-slate-600 dark:text-slate-400 text-[11px] bg-slate-50 dark:bg-brand-black/40 p-1.5 rounded font-mono border border-slate-200 dark:border-brand-border/40 whitespace-pre-wrap">
            {step.result}
          </div>
        </>
      )}

      {step.type === 'permission' && (
        <>
          <pre className="whitespace-pre-wrap font-mono text-[11px]">{step.text}</pre>
          {isAwaitingApproval && (
            <div className="flex items-center gap-3 mt-3" role="group" aria-label="权限审批操作">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded border border-emerald-400/30 transition-colors"
                aria-label="允许执行本次操作"
              >
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                允许执行
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeny();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded border border-red-400/30 transition-colors"
                aria-label="拒绝执行本次操作"
              >
                <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
                拒绝
              </button>
            </div>
          )}
        </>
      )}

      {step.type === 'user-approved' && (
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{step.text}</span>
        </div>
      )}

      {step.type === 'success-answer' && (
        <>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-1.5 flex items-center gap-1">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            任务宣告圆满完成
          </div>
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-600 dark:text-slate-300">
            {step.text}
          </pre>
        </>
      )}
    </div>
  );
}

function TerminalSimulatorInner() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<LogStep[]>([]);
  const [, setCurrentStepIndex] = useState<number>(0);
  const [playState, setPlayState] = useState<PlayState>('playing');
  const [permissionState, setPermissionState] = useState<PermissionState>('idle');

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── 自动滚动（仅终端内部容器，不影响页面）──
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // ── 推进到下一步 ──
  const advanceStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const nextIndex = prev;

      if (nextIndex >= SIM_STEPS.length) {
        setPlayState('finished');
        return prev;
      }

      const step = SIM_STEPS[nextIndex];

      // 看门狗阻断：遇到 permission 类型自动暂停
      if (step.type === 'permission') {
        setPermissionState('awaiting-approval');
        setPlayState('paused');
      }

      setLogs((prevLogs) => [...prevLogs, step]);
      return nextIndex + 1;
    });
  }, []);

  // ── 自动播放循环 ──
  useEffect(() => {
    if (playState !== 'playing') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      advanceStep();
    }, STEP_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playState, advanceStep]);

  // ── 首次自动启动 ──
  useEffect(() => {
    // 立即渲染第一步
    if (logs.length === 0 && SIM_STEPS.length > 0) {
      const firstStep = SIM_STEPS[0];
      setLogs([firstStep]);
      setCurrentStepIndex(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 播放控制 ──
  const handlePlayPause = useCallback(() => {
    if (playState === 'finished') {
      // 重新开始
      setLogs([]);
      setCurrentStepIndex(0);
      setPermissionState('idle');
      setPlayState('playing');
      return;
    }
    setPlayState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  }, [playState]);

  const handleSkip = useCallback(() => {
    if (playState === 'finished' || permissionState === 'awaiting-approval') return;
    advanceStep();
  }, [playState, permissionState, advanceStep]);

  const handleReset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLogs([]);
    setCurrentStepIndex(0);
    setPlayState('playing');
    setPermissionState('idle');
  }, []);

  // ── 看门狗交互 ──
  const handleApprove = useCallback(() => {
    setPermissionState('approved');
    // 追加 user-approved 日志并继续
    const approvedStep = SIM_STEPS.find((s) => s.type === 'user-approved');
    if (approvedStep) {
      setLogs((prev) => [...prev, approvedStep]);
    }
    // 跳过 permission 后的 user-approved 步骤，指向下一个索引
    setCurrentStepIndex((prev) => {
      // 找到 user-approved 在 SIM_STEPS 中的位置，然后 +1
      const approvedIdx = SIM_STEPS.findIndex((s) => s.type === 'user-approved');
      return approvedIdx >= 0 ? approvedIdx + 1 : prev;
    });
    setPlayState('playing');
  }, []);

  const handleDeny = useCallback(() => {
    setPermissionState('denied');
    // 追加拒绝日志
    const denyLog: LogStep = {
      type: 'system',
      text: '[SecurityWatchdog] ⛔ 用户拒绝了本次高危操作。Agent 将跳过此步骤并重新规划替代方案。',
    };
    setLogs((prev) => [...prev, denyLog]);
    // 跳过后面的依赖步骤，直接到最后一个 success-answer
    const finalIdx = SIM_STEPS.findIndex((s) => s.type === 'success-answer');
    if (finalIdx >= 0) {
      setCurrentStepIndex(finalIdx);
    } else {
      setCurrentStepIndex(SIM_STEPS.length);
    }
    setPlayState('playing');
  }, []);

  const isPlaying = playState === 'playing';
  const isFinished = playState === 'finished';
  const canSkip = isPlaying && permissionState !== 'awaiting-approval';

  return (
    <div className="relative">
      {/* 终端外壳光晕 */}
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-brand-accent/20 to-brand-blue/20 blur-lg opacity-75" aria-hidden="true" />

      <div className="relative terminal-dark-box border border-slate-700 dark:border-brand-border rounded-xl shadow-2xl overflow-hidden">
        {/* ── 标题栏 ── */}
        <div className="bg-brand-black px-4 py-3 border-b border-slate-800 dark:border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden="true"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" aria-hidden="true"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80" aria-hidden="true"></span>
            <span className="text-slate-400 dark:text-slate-500 text-[11px] ml-2 font-mono">
              agent_scheduler_loop_v1.sh
            </span>
          </div>
          <div className="text-[10px] text-brand-accent font-semibold font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" aria-hidden="true"></span>
            ACTIVE_SCHEDULER: 3/3
          </div>
        </div>

        {/* ── 控制栏 ── */}
        <div className="bg-[#0f1422] px-4 py-2 border-b border-slate-800/50 dark:border-brand-border/50 flex items-center gap-4 text-[11px] text-slate-400 font-mono">
          <span>
            {t.terminal_target}
          </span>

          <div className="ml-auto flex items-center gap-1.5" role="toolbar" aria-label="终端播放控制">
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? t.terminal_pause : isFinished ? t.terminal_replay : t.terminal_play}
              title={isPlaying ? t.terminal_pause : isFinished ? t.terminal_replay : t.terminal_play}
              className="bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-2 py-1 rounded transition-colors inline-flex items-center gap-1"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Play className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span className="text-[10px]">
                {isPlaying ? t.terminal_pause : isFinished ? t.terminal_replay : t.terminal_play}
              </span>
            </button>

            <button
              onClick={handleSkip}
              disabled={!canSkip}
              aria-label={t.terminal_skip}
              title={t.terminal_skip}
              className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50 px-2 py-1 rounded transition-colors inline-flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[10px]">{t.terminal_skip}</span>
            </button>

            <button
              onClick={handleReset}
              aria-label={t.terminal_reset}
              title={t.terminal_reset}
              className="bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600/50 px-2 py-1 rounded transition-colors inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[10px]">{t.terminal_reset}</span>
            </button>
          </div>
        </div>

        {/* ── 日志内容区 ── */}
        <div
          ref={terminalContainerRef}
          className="p-4 h-[340px] overflow-y-auto space-y-3"
          role="log"
          aria-live="polite"
          aria-label="终端模拟输出"
        >
          {logs.map((step, i) => (
            <LogEntry
              key={i}
              step={step}
              permissionState={
                i === logs.length - 1 ? permissionState : ('approved' as PermissionState)
              }
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          ))}

          {/* 滚动锚点 */}
          <div aria-hidden="true" />

          {/* 完成状态 */}
          {isFinished && (
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center pt-2 border-t border-slate-800/50">
              ⏹ {t.terminal_finished}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TerminalSimulator() {
  return <LanguageProvider><TerminalSimulatorInner /></LanguageProvider>;
}
