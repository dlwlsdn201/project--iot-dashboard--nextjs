/** 최근 7일 에너지원별 누적 데이터 (W2) */
export const energySourceTrendData = [
  { day: '6일 전', electricity: 420, gas: 180, heat: 95 },
  { day: '5일 전', electricity: 390, gas: 165, heat: 88 },
  { day: '4일 전', electricity: 510, gas: 200, heat: 110 },
  { day: '3일 전', electricity: 475, gas: 190, heat: 102 },
  { day: '2일 전', electricity: 530, gas: 215, heat: 118 },
  { day: '1일 전', electricity: 498, gas: 205, heat: 107 },
  { day: '오늘',  electricity: 460, gas: 192, heat: 99  },
];

/** 탄소 배출량 데이터 — 주/월/년 (W3) */
export const carbonEmissionData = {
  weekly: [
    { label: '월', tCO2: 12.4 },
    { label: '화', tCO2: 11.8 },
    { label: '수', tCO2: 14.2 },
    { label: '목', tCO2: 13.5 },
    { label: '금', tCO2: 15.1 },
    { label: '토', tCO2: 9.3  },
    { label: '일', tCO2: 8.7  },
  ],
  monthly: [
    { label: '1월',  tCO2: 320 },
    { label: '2월',  tCO2: 298 },
    { label: '3월',  tCO2: 345 },
    { label: '4월',  tCO2: 310 },
    { label: '5월',  tCO2: 290 },
    { label: '6월',  tCO2: 275 },
    { label: '7월',  tCO2: 305 },
    { label: '8월',  tCO2: 330 },
    { label: '9월',  tCO2: 315 },
    { label: '10월', tCO2: 280 },
    { label: '11월', tCO2: 300 },
    { label: '12월', tCO2: 360 },
  ],
  yearly: [
    { label: '2020년', tCO2: 3820 },
    { label: '2021년', tCO2: 3650 },
    { label: '2022년', tCO2: 3910 },
    { label: '2023년', tCO2: 3540 },
    { label: '2024년', tCO2: 3480 },
    { label: '2025년', tCO2: 3320 },
  ],
};

/** 전년 동월 대비 데이터 (W6) */
export const yoyComparisonData = [
  { month: '1월',  lastYear: 310, thisYear: 295 },
  { month: '2월',  lastYear: 288, thisYear: 270 },
  { month: '3월',  lastYear: 330, thisYear: 345 },
  { month: '4월',  lastYear: 305, thisYear: 312 },
  { month: '5월',  lastYear: 280, thisYear: 268 },
  { month: '6월',  lastYear: 260, thisYear: 255 },
  { month: '7월',  lastYear: 295, thisYear: 310 },
  { month: '8월',  lastYear: 318, thisYear: 330 },
  { month: '9월',  lastYear: 300, thisYear: 298 },
  { month: '10월', lastYear: 272, thisYear: 260 },
  { month: '11월', lastYear: 290, thisYear: 278 },
  { month: '12월', lastYear: 345, thisYear: 352 },
];

/** 5년 예측 데이터 — 과거(solid) + 미래(dotted) (W7)
 * 기준: 오늘(2026-03-23) = 현재 연도
 * 과거 4년(2022~2025) + 현재(2026, bridge) + 미래 1년(2027)
 */
export const predictionData = [
  { year: '2022년', actual: 3910,     forecast: null  },
  { year: '2023년', actual: 3540,     forecast: null  },
  { year: '2024년', actual: 3480,     forecast: null  },
  { year: '2025년', actual: 3320,     forecast: null  },
  { year: '2026년', actual: 3180,     forecast: 3180  },  // bridge point: 현재 연도(실측 + 예측 교차)
  { year: '2027년', actual: null,     forecast: 3050  },
];

export type EventSeverity = 'danger' | 'warning' | 'info';

export interface EventLogItem {
  id: string;
  time: string;
  severity: EventSeverity;
  message: string;
  /** 확인 처리된 시각 (confirmed 상태일 때 존재) */
  confirmedAt?: string;
}

/** 실시간 이벤트 로그 목록 (W5) */
export const eventLogData: EventLogItem[] = [
  { id: 'e1', time: '15:02:11', severity: 'danger',  message: 'B동 3층 분전반 과부하 감지 (105% 초과)' },
  { id: 'e2', time: '14:58:44', severity: 'warning', message: '냉각탑 #2 소비전력 임계치 도달' },
  { id: 'e3', time: '14:51:03', severity: 'info',    message: '태양광 패널 출력 정상 복귀' },
  { id: 'e4', time: '14:43:29', severity: 'warning', message: '에너지 피크 타임 진입 (14:00~17:00)' },
  { id: 'e5', time: '14:32:17', severity: 'danger',  message: 'A동 UPS 배터리 잔량 15% 미만' },
  { id: 'e6', time: '14:20:05', severity: 'info',    message: '일간 에너지 예산 70% 도달' },
  { id: 'e7', time: '13:55:50', severity: 'warning', message: '공조기 AHU-04 필터 교체 권고' },
  { id: 'e8', time: '13:41:22', severity: 'info',    message: '자동 수요반응(DR) 프로그램 종료' },
];
