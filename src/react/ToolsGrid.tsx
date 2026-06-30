import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { LanguageProvider, useLanguage } from '../i18n/LanguageContext';
import type { Tool, ToolType, ApiResponse, ToolsListData } from '../types';

type FilterKey = 'all' | ToolType | string;

interface FilterTab {
  key: FilterKey;
  label: string;
}

const FILTER_KEYS = ['all', 'danger', 'safe', 'filesystem', 'search', 'execution', 'planning', 'review', 'communication'] as const;

function ToolsGridInner() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
  const [tools, setTools] = useState<Tool[]>([]);
  const [stats, setStats] = useState<{ danger: number; safe: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filterLabels: Record<string, string> = {
    all: t.tools_filter_all, danger: t.tools_filter_danger, safe: t.tools_filter_safe,
    filesystem: t.tools_filter_filesystem, search: t.tools_filter_search,
    execution: t.tools_filter_execution, planning: t.tools_filter_planning,
    review: t.tools_filter_review, communication: t.tools_filter_communication,
  };

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params = new URLSearchParams();
    if (activeFilter === 'danger') params.set('type', 'danger');
    else if (activeFilter === 'safe') params.set('type', 'safe');
    else if (activeFilter !== 'all') params.set('category', activeFilter);
    const qs = params.toString();
    fetch(`/api/tools${qs ? `?${qs}` : ''}`)
      .then(async (res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() as Promise<ApiResponse<ToolsListData>>; })
      .then((json) => { if (cancelled) return; if (json.success && json.data) { setTools(json.data.tools); setStats(json.data.stats); } else setError(json.error?.message ?? ''); })
      .catch((err: Error) => { if (cancelled) return; console.error(err); setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activeFilter]);

  const toggleExpand = useCallback((toolName: string) => {
    setExpandedTools((prev) => { const next = new Set(prev); if (next.has(toolName)) next.delete(toolName); else next.add(toolName); return next; });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="工具分类筛选">
        {FILTER_KEYS.map((key) => {
          const count = key === 'all' ? (stats?.danger ?? 0) + (stats?.safe ?? 0) : key === 'danger' ? stats?.danger : key === 'safe' ? stats?.safe : undefined;
          return (
            <button key={key} role="tab" aria-selected={activeFilter === key} onClick={() => setActiveFilter(key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${activeFilter === key ? 'bg-brand-blue text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
              {filterLabels[key] ?? key}{count !== undefined && <span className="opacity-60 tabular-nums">{count}</span>}
            </button>
          );
        })}
      </div>
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-400 dark:text-slate-500" role="status">
          <Loader2 className="w-5 h-5 animate-spin mr-2" aria-hidden="true" /><span className="text-sm font-mono">{t.tools_loading}</span>
        </div>
      )}
      {error && !loading && <div className="text-center py-8 text-red-500 text-sm font-mono" role="alert">{t.tools_error}{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" role="list" aria-label={`${tools.length} 个工具`}>
          {tools.map((tool) => {
            const isDanger = tool.type === 'danger';
            const isExpanded = expandedTools.has(tool.name);
            return (
              <div key={tool.name} role="listitem" tabIndex={0} aria-expanded={isExpanded}
                onClick={() => toggleExpand(tool.name)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(tool.name); } }}
                className={`group relative bg-white dark:bg-[#0b0e14] border p-4 rounded-lg flex flex-col cursor-pointer transition-all duration-200 select-none ${isDanger ? 'border-red-200 dark:border-red-900/30 hover:border-red-400/50 dark:hover:border-red-500/50 hover:shadow-[0_0_12px_rgba(239,68,68,0.08)]' : 'border-emerald-200 dark:border-emerald-900/30 hover:border-emerald-400/50 dark:hover:border-emerald-500/50 hover:shadow-[0_0_12px_rgba(16,185,129,0.08)]'} ${isExpanded ? (isDanger ? 'border-red-400/60 dark:border-red-500/60' : 'border-emerald-400/60 dark:border-emerald-500/60') : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{tool.name}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${isDanger ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900/40' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/40'}`}>
                    {isDanger ? <span className="inline-flex items-center gap-0.5"><AlertTriangle className="w-2.5 h-2.5" aria-hidden="true" />{t.tools_badge_danger}</span> : <span className="inline-flex items-center gap-0.5"><ShieldCheck className="w-2.5 h-2.5" aria-hidden="true" />{t.tools_badge_safe}</span>}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-brand-text mt-2 text-[11px] leading-tight flex-1">{tool.description}</p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">{isExpanded ? t.tools_hide_params : t.tools_view_params}</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3 text-slate-400" aria-hidden="true" /> : <ChevronDown className="w-3 h-3 text-slate-400" aria-hidden="true" />}
                </div>
                {isExpanded && (
                  <div className="mt-3 p-2.5 bg-brand-black/95 rounded border border-slate-700 font-mono text-[10px] text-brand-accent overflow-x-auto" onClick={(e) => e.stopPropagation()}>
                    <pre className="whitespace-pre-wrap leading-relaxed">{JSON.stringify(tool.paramSchema, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {!loading && !error && tools.length === 0 && <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-8">{t.tools_empty}</p>}
    </div>
  );
}

export default function ToolsGrid() {
  return <LanguageProvider><ToolsGridInner /></LanguageProvider>;
}
