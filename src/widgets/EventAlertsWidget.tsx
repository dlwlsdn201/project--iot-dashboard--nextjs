"use client";

import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { AlertTriangle, Info, Zap, Archive } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { ConfirmedEventsModal } from "@/shared/ui/ConfirmedEventsModal";
import {
  activeEventsAtom,
  confirmedEventsAtom,
  confirmEventAtom,
} from "@/entities/energy/model/eventStore";
import type {
  EventSeverity,
  EventLogItem,
} from "@/entities/energy/model/mockData";

const SEVERITY_STYLES: Record<
  EventSeverity,
  { icon: React.ReactNode; color: string; bg: string; hover: string }
> = {
  danger: {
    icon: <Zap size={13} />,
    color: "text-rose-400",
    bg: "bg-rose-950/40",
    hover: "hover:bg-rose-900/50",
  },
  warning: {
    icon: <AlertTriangle size={13} />,
    color: "text-amber-400",
    bg: "bg-amber-950/40",
    hover: "hover:bg-amber-900/50",
  },
  info: {
    icon: <Info size={13} />,
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    hover: "hover:bg-blue-900/40",
  },
};

function EventRow({
  item,
  onConfirm,
}: {
  item: EventLogItem;
  onConfirm: (id: string) => void;
}) {
  const style = SEVERITY_STYLES[item.severity];
  return (
    <li
      role='button'
      title='클릭하여 처리 완료로 이동'
      onClick={() => onConfirm(item.id)}
      className={`
        flex items-start gap-2 px-3 py-2 rounded cursor-pointer transition-colors
        ${style.bg} ${style.hover}
      `}>
      <span className={`mt-0.5 shrink-0 ${style.color}`}>{style.icon}</span>
      <p
        className={`flex-1 min-w-0 text-xs leading-snug ${style.color} truncate`}>
        {item.message}
      </p>
      <span className='shrink-0 font-mono text-[10px] text-slate-500'>
        {item.time}
      </span>
    </li>
  );
}

export function EventAlertsWidget() {
  const [modalOpen, setModalOpen] = useState(false);
  const activeEvents = useAtomValue(activeEventsAtom);
  const confirmedCount = useAtomValue(confirmedEventsAtom).length;
  const confirmEvent = useSetAtom(confirmEventAtom);

  const archiveButton = (
    <button
      aria-label='처리 완료 이벤트 보기'
      onClick={() => setModalOpen(true)}
      className='relative flex items-center cursor-pointer gap-1 px-2 py-1 rounded text-slate-500 hover:text-emerald-400 hover:bg-slate-800 transition-colors'
      title='Confirmed 아카이브 보기'>
      <Archive size={13} />
      {confirmedCount > 0 && (
        <span className='font-mono text-[10px] text-emerald-500'>
          {confirmedCount}
        </span>
      )}
    </button>
  );

  return (
    <>
      <Card title='Event Alerts' headerRight={archiveButton}>
        <ul className='flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto'>
          {activeEvents.length === 0 ? (
            <li className='flex flex-col items-center justify-center h-full gap-2 text-slate-600 text-xs'>
              모든 이벤트가 처리되었습니다
            </li>
          ) : (
            activeEvents.map((item) => (
              <EventRow key={item.id} item={item} onConfirm={confirmEvent} />
            ))
          )}
        </ul>
      </Card>

      <ConfirmedEventsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
