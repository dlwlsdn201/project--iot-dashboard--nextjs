'use client';

import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { appendEnergyDataAtom } from '@/entities/energy/model/energyStore';

const MIN_POWER_KW = 300;
const MAX_POWER_KW = 800;

const randomPowerKw = (): number =>
  Math.floor(Math.random() * (MAX_POWER_KW - MIN_POWER_KW + 1)) + MIN_POWER_KW;

/**
 * 지정한 간격으로 랜덤 에너지 데이터를 생성하여 energyDataAtom에 주입하는 Mock 훅.
 * intervalMs 변경 시 기존 interval을 정리하고 새 interval로 재시작한다.
 *
 * @param intervalMs 데이터 갱신 주기 (ms). 기본값 5000
 */
export function useSocketMock(intervalMs: number = 5000): void {
  const appendData = useSetAtom(appendEnergyDataAtom);

  useEffect(() => {
    const intervalId = setInterval(() => {
      appendData({
        timestamp: Date.now(),
        powerKw: randomPowerKw(),
      });
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [appendData, intervalMs]);
}
