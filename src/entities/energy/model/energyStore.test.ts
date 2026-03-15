import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'jotai';
import { energyDataAtom, appendEnergyDataAtom, MAX_BUFFER_SIZE } from './energyStore';
import type { EnergyDataPoint } from './energyStore';

const makePoint = (id: number): EnergyDataPoint => ({
  timestamp: Date.now() + id,
  powerKw: 300 + id,
});

describe('energyDataAtom — FIFO buffer', () => {
  let store: ReturnType<typeof createStore>;

  beforeEach(() => {
    store = createStore();
  });

  it('초기 상태는 빈 배열이다', () => {
    expect(store.get(energyDataAtom)).toEqual([]);
  });

  it('데이터를 추가하면 배열에 포함된다', () => {
    store.set(appendEnergyDataAtom, makePoint(1));
    const data = store.get(energyDataAtom);
    expect(data).toHaveLength(1);
    expect(data[0].powerKw).toBe(301);
  });

  it(`${MAX_BUFFER_SIZE}개 미만일 때는 모든 데이터가 유지된다`, () => {
    for (let i = 0; i < MAX_BUFFER_SIZE; i++) {
      store.set(appendEnergyDataAtom, makePoint(i));
    }
    expect(store.get(energyDataAtom)).toHaveLength(MAX_BUFFER_SIZE);
  });

  it(`${MAX_BUFFER_SIZE}개 초과 시 배열 길이는 항상 ${MAX_BUFFER_SIZE}개를 유지한다`, () => {
    for (let i = 0; i < MAX_BUFFER_SIZE + 10; i++) {
      store.set(appendEnergyDataAtom, makePoint(i));
    }
    expect(store.get(energyDataAtom)).toHaveLength(MAX_BUFFER_SIZE);
  });

  it('초과 시 가장 오래된 데이터(index 0)가 제거된다 (FIFO)', () => {
    for (let i = 0; i < MAX_BUFFER_SIZE; i++) {
      store.set(appendEnergyDataAtom, makePoint(i));
    }
    // 첫 번째 데이터: powerKw = 300
    const oldestBeforeOverflow = store.get(energyDataAtom)[0].powerKw;
    expect(oldestBeforeOverflow).toBe(300);

    // 한 개 더 추가 → oldest가 밀려나야 함
    store.set(appendEnergyDataAtom, makePoint(MAX_BUFFER_SIZE));
    const newOldest = store.get(energyDataAtom)[0].powerKw;
    expect(newOldest).toBe(301); // index 0이 shift됨
  });

  it('가장 최근에 추가된 데이터가 배열의 마지막에 위치한다', () => {
    store.set(appendEnergyDataAtom, makePoint(1));
    store.set(appendEnergyDataAtom, makePoint(2));
    const data = store.get(energyDataAtom);
    expect(data[data.length - 1].powerKw).toBe(302);
  });
});
