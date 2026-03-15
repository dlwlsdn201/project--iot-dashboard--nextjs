import { atom } from 'jotai';
import { eventLogData, type EventLogItem } from './mockData';

/** 미확인 활성 이벤트 목록 */
export const activeEventsAtom = atom<EventLogItem[]>([...eventLogData]);

/** 확인/처리 완료된 이벤트 아카이브 (최신순) */
export const confirmedEventsAtom = atom<EventLogItem[]>([]);

/**
 * 특정 이벤트를 활성 목록에서 아카이브로 이동시키는 write-only atom.
 * @param eventId - 처리 완료할 이벤트의 id
 */
export const confirmEventAtom = atom(
  null,
  (get, set, eventId: string) => {
    const active = get(activeEventsAtom);
    const target = active.find((e) => e.id === eventId);
    if (!target) return;

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const confirmedAt = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    set(activeEventsAtom, active.filter((e) => e.id !== eventId));
    set(confirmedEventsAtom, [{ ...target, confirmedAt }, ...get(confirmedEventsAtom)]);
  },
);
