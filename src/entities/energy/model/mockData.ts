/** 최근 7일 에너지원별 누적 데이터 (W2) */
export const energySourceTrendData = [
  { day: 'Day -6', electricity: 420, gas: 180, heat: 95 },
  { day: 'Day -5', electricity: 390, gas: 165, heat: 88 },
  { day: 'Day -4', electricity: 510, gas: 200, heat: 110 },
  { day: 'Day -3', electricity: 475, gas: 190, heat: 102 },
  { day: 'Day -2', electricity: 530, gas: 215, heat: 118 },
  { day: 'Day -1', electricity: 498, gas: 205, heat: 107 },
  { day: 'Today',  electricity: 460, gas: 192, heat: 99  },
];

/** 탄소 배출량 데이터 — 주/월/년 (W3) */
export const carbonEmissionData = {
  weekly: [
    { label: 'Mon', tCO2: 12.4 },
    { label: 'Tue', tCO2: 11.8 },
    { label: 'Wed', tCO2: 14.2 },
    { label: 'Thu', tCO2: 13.5 },
    { label: 'Fri', tCO2: 15.1 },
    { label: 'Sat', tCO2: 9.3  },
    { label: 'Sun', tCO2: 8.7  },
  ],
  monthly: [
    { label: 'Jan', tCO2: 320 },
    { label: 'Feb', tCO2: 298 },
    { label: 'Mar', tCO2: 345 },
    { label: 'Apr', tCO2: 310 },
    { label: 'May', tCO2: 290 },
    { label: 'Jun', tCO2: 275 },
    { label: 'Jul', tCO2: 305 },
    { label: 'Aug', tCO2: 330 },
    { label: 'Sep', tCO2: 315 },
    { label: 'Oct', tCO2: 280 },
    { label: 'Nov', tCO2: 300 },
    { label: 'Dec', tCO2: 360 },
  ],
  yearly: [
    { label: '2020', tCO2: 3820 },
    { label: '2021', tCO2: 3650 },
    { label: '2022', tCO2: 3910 },
    { label: '2023', tCO2: 3540 },
    { label: '2024', tCO2: 3480 },
    { label: '2025', tCO2: 3320 },
  ],
};

/** 전년 동월 대비 데이터 (W6) */
export const yoyComparisonData = [
  { month: 'Jan', lastYear: 310, thisYear: 295 },
  { month: 'Feb', lastYear: 288, thisYear: 270 },
  { month: 'Mar', lastYear: 330, thisYear: 345 },
  { month: 'Apr', lastYear: 305, thisYear: 312 },
  { month: 'May', lastYear: 280, thisYear: 268 },
  { month: 'Jun', lastYear: 260, thisYear: 255 },
  { month: 'Jul', lastYear: 295, thisYear: 310 },
  { month: 'Aug', lastYear: 318, thisYear: 330 },
  { month: 'Sep', lastYear: 300, thisYear: 298 },
  { month: 'Oct', lastYear: 272, thisYear: 260 },
  { month: 'Nov', lastYear: 290, thisYear: 278 },
  { month: 'Dec', lastYear: 345, thisYear: 352 },
];

/** 5년 예측 데이터 — 과거(solid) + 미래(dotted) (W7) */
export const predictionData = [
  { year: '2021', actual: 3650,     forecast: null  },
  { year: '2022', actual: 3910,     forecast: null  },
  { year: '2023', actual: 3540,     forecast: null  },
  { year: '2024', actual: 3480,     forecast: null  },
  { year: '2025', actual: 3320,     forecast: null  },
  { year: '2026', actual: null,     forecast: 3180  },
];

export type EventSeverity = 'danger' | 'warning' | 'info';

export interface EventLogItem {
  id: string;
  time: string;
  severity: EventSeverity;
  message: string;
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
