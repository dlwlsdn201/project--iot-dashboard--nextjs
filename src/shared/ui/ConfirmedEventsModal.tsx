'use client';

import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { X, Search, CheckCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { confirmedEventsAtom } from '@/entities/energy/model/eventStore';
import type { EventSeverity, EventLogItem } from '@/entities/energy/model/mockData';

const SEVERITY_STYLES: Record<EventSeverity, { icon: React.ReactNode; color: string; bg: string }> = {
  danger:  { icon: <Zap size={12} />,          color: 'text-rose-400',  bg: 'bg-rose-950/40'  },
  warning: { icon: <AlertTriangle size={12} />, color: 'text-amber-400', bg: 'bg-amber-950/40' },
  info:    { icon: <Info size={12} />,          color: 'text-blue-400',  bg: 'bg-blue-950/30'  },
};

function ConfirmedRow({ item }: { item: EventLogItem }) {
  const style = SEVERITY_STYLES[item.severity];
  return (
    <li className={`flex items-start gap-2 px-3 py-2.5 rounded-md ${style.bg} opacity-70`}>
      <span className={`mt-0.5 shrink-0 ${style.color}`}>{style.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs leading-snug text-slate-300">{item.message}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-mono text-[10px] text-slate-500">{item.time}</p>
        <p className="font-mono text-[10px] text-emerald-600">✓ {item.confirmedAt}</p>
      </div>
    </li>
  );
}

interface ConfirmedEventsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConfirmedEventsModal({ open, onClose }: ConfirmedEventsModalProps) {
  const confirmed = useAtomValue(confirmedEventsAtom);
  const [query, setQuery] = useState('');

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = query.trim()
    ? confirmed.filter((e) => e.message.toLowerCase().includes(query.toLowerCase()))
    : confirmed;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Panel — 클릭 버블링 차단 */}
      <div
        className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckCircle size={15} className="text-emerald-500" />
            <span className="text-sm font-semibold text-slate-200">Confirmed Events</span>
            <span className="ml-1 px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-slate-400">
              {confirmed.length}
            </span>
          </div>
          <button
            aria-label="모달 닫기"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2 bg-slate-800 rounded-md px-3 py-2">
            <Search size={13} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="로그 내용 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-200 placeholder-slate-500 outline-none font-mono"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300">
                <X size={11} />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-1.5 p-4">
          {filtered.length === 0 ? (
            <li className="flex flex-col items-center justify-center py-10 gap-2 text-slate-600">
              <CheckCircle size={28} />
              <p className="text-xs">{query ? '검색 결과 없음' : '처리 완료된 이벤트가 없습니다'}</p>
            </li>
          ) : (
            filtered.map((item) => <ConfirmedRow key={`${item.id}-${item.confirmedAt}`} item={item} />)
          )}
        </ul>
      </div>
    </div>
  );
}
