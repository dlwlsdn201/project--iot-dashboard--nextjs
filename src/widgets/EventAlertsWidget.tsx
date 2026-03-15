'use client';

import { AlertTriangle, Info, Zap } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { eventLogData, type EventSeverity, type EventLogItem } from '@/entities/energy/model/mockData';

const SEVERITY_STYLES: Record<EventSeverity, { icon: React.ReactNode; color: string; bg: string }> = {
  danger:  { icon: <Zap size={13} />,           color: 'text-rose-400',    bg: 'bg-rose-950/40' },
  warning: { icon: <AlertTriangle size={13} />,  color: 'text-amber-400',   bg: 'bg-amber-950/40' },
  info:    { icon: <Info size={13} />,           color: 'text-blue-400',    bg: 'bg-blue-950/30' },
};

function EventRow({ item }: { item: EventLogItem }) {
  const style = SEVERITY_STYLES[item.severity];
  return (
    <li className={`flex items-start gap-2 px-3 py-2 rounded ${style.bg}`}>
      <span className={`mt-0.5 shrink-0 ${style.color}`}>{style.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs leading-snug ${style.color} truncate`}>{item.message}</p>
      </div>
      <span className="shrink-0 font-mono text-[10px] text-slate-500">{item.time}</span>
    </li>
  );
}

export function EventAlertsWidget() {
  return (
    <Card title="Event Alerts" className="h-full">
      <ul className="flex flex-col gap-1.5 overflow-y-auto max-h-52">
        {eventLogData.map((item) => (
          <EventRow key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
}
