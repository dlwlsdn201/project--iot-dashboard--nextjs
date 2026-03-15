import { atom } from 'jotai';

/** 실시간 에너지 데이터 한 시점의 타입 */
export interface EnergyDataPoint {
  /** 밀리초 타임스탬프 */
  timestamp: number;
  /** 전력 사용량 (kW) */
  powerKw: number;
}

/** FIFO 버퍼의 최대 보관 데이터 수 */
export const MAX_BUFFER_SIZE = 60;

/** 실시간 에너지 데이터 배열 atom (최대 MAX_BUFFER_SIZE개 유지) */
export const energyDataAtom = atom<EnergyDataPoint[]>([]);

/**
 * 에너지 데이터를 배열 끝에 추가하는 write-only derived atom.
 * 배열이 MAX_BUFFER_SIZE를 초과하면 가장 오래된 항목(index 0)을 제거하여
 * 메모리 오버플로우를 방지한다. (FIFO 큐)
 *
 * @param _get - jotai get 함수 (미사용)
 * @param set  - jotai set 함수
 * @param newPoint - 추가할 EnergyDataPoint
 */
export const appendEnergyDataAtom = atom(
  null,
  (_get, set, newPoint: EnergyDataPoint) => {
    set(energyDataAtom, (prev) => {
      const next = [...prev, newPoint];
      return next.length > MAX_BUFFER_SIZE ? next.slice(-MAX_BUFFER_SIZE) : next;
    });
  },
);
