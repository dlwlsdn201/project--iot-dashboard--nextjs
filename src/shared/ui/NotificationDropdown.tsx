'use client';

import { useState, useRef, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { Bell, AlertTriangle, Info, Zap, X, Archive } from 'lucide-react';
import { activeEventsAtom, confirmedEventsAtom, confirmEventAtom } from '@/entities/energy/model/eventStore';
import { ConfirmedEventsModal } from '@/shared/ui/ConfirmedEventsModal';
import type { EventSeverity, EventLogItem } from '@/entities/energy/model/mockData';

const SEVERITY_STYLES: Record<EventSeverity, { icon: React.ReactNode; color: string; bg: string; hover: string }> = {
  danger:  { icon: <Zap size={12} />,          color: 'text-rose-400',  bg: 'bg-rose-950/50',  hover: 'hover:bg-rose-900/60'  },
  warning: { icon: <AlertTriangle size={12} />, color: 'text-amber-400', bg: 'bg-amber-950/50', hover: 'hover:bg-amber-900/60' },
  info:    { icon: <Info size={12} />,          color: 'text-blue-400',  bg: 'bg-blue-950/40',  hover: 'hover:bg-blue-900/50'  },
};

function NotificationItem({ item, onConfirm }: { item: EventLogItem; onConfirm: (id: string) => void }) {
  const style = SEVERITY_STYLES[item.severity];
  return (
    <li
      role="button"
      title="클릭하여 처리 완료로 이동"
      onClick={() => onConfirm(item.id)}
      className={`
        flex items-start gap-2 px-3 py-2.5 rounded-md cursor-pointer transition-colors
        ${style.bg} ${style.hover}
      `}
    >
      <span className={`mt-0.5 shrink-0 ${style.color}`}>{style.icon}</span>
      <p className={`flex-1 min-w-0 text-xs leading-snug ${style.color}`}>{item.message}</p>
      <span className="shrink-0 font-mono text-[10px] text-slate-500 mt-0.5">{item.time}</span>
    </li>
  );
}

/** 모바일/태블릿(< 1200px)에서 헤더에 표시되는 알림 드롭다운 */
export function NotificationDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeEvents = useAtomValue(activeEventsAtom);
  const confirmedCount = useAtomValue(confirmedEventsAtom).length;
  const confirmEvent = useSetAtom(confirmEventAtom);

  const dangerCount = activeEvents.filter((e) => e.severity === 'danger').length;

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <>
      <div ref={containerRef} className="relative laptop:hidden">
        {/* Bell 트리거 */}
        <button
          aria-label="알림 열기"
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="relative p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <Bell size={18} />
          {dangerCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 flex items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white leading-none">
              {dangerCount}
            </span>
          )}
        </button>

        {/* Dropdown overlay */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] flex flex-col z-40 rounded-lg border border-slate-800 bg-slate-900/95 backdrop-blur-md shadow-2xl">
            {/* Dropdown 헤더 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Event Alerts
                </span>
              </div>
              <div className="flex items-center gap-1">
                {/* 아카이브 트리거 */}
                <button
                  aria-label="처리 완료 이벤트 보기"
                  onClick={() => { setDropdownOpen(false); setModalOpen(true); }}
                  className="relative flex items-center gap-1 px-2 py-1 rounded text-slate-500 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                  title="Confirmed 아카이브 보기"
                >
                  <Archive size={13} />
                  {confirmedCount > 0 && (
                    <span className="font-mono text-[10px] text-emerald-500">{confirmedCount}</span>
                  )}
                </button>
                <button
                  aria-label="닫기"
                  onClick={() => setDropdownOpen(false)}
                  className="text-slate-500 hover:text-slate-300 p-1"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* 알림 목록 */}
            <ul className="flex-1 overflow-y-auto flex flex-col gap-1.5 p-3">
              {activeEvents.length === 0 ? (
                <li className="py-8 text-center text-xs text-slate-600">
                  모든 이벤트가 처리되었습니다
                </li>
              ) : (
                activeEvents.map((item) => (
                  <NotificationItem key={item.id} item={item} onConfirm={confirmEvent} />
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Confirmed 아카이브 모달 */}
      <ConfirmedEventsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
