'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { appendEnergyDataAtom } from '@/entities/energy/model/energyStore';

const MIN_POWER_KW = 300;
const MAX_POWER_KW = 800;
const INTERVAL_MS = 1000;

/** MIN~MAX 사이의 랜덤 정수를 반환한다 */
const randomPowerKw = (): number =>
  Math.floor(Math.random() * (MAX_POWER_KW - MIN_POWER_KW + 1)) + MIN_POWER_KW;

/**
 * 1초 간격으로 랜덤 에너지 데이터를 생성하여 energyDataAtom에 주입하는 Mock 훅.
 * 컴포넌트 언마운트 시 setInterval을 정리하여 메모리 누수를 방지한다.
 *
 * 실제 WebSocket 연결로 교체 시 이 훅만 수정하면 된다.
 */
export function useSocketMock(): void {
  const appendData = useSetAtom(appendEnergyDataAtom);

  useEffect(() => {
    const intervalId = setInterval(() => {
      appendData({
        timestamp: Date.now(),
        powerKw: randomPowerKw(),
      });
    }, INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [appendData]);
}
