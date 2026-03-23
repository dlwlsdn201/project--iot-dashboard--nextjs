/**
 * 모든 샘플 데이터는 모듈 로드 시점(= 브라우저 새로고침마다) new Date() 기준으로 동적 생성된다.
 * - X축 레이블: 오늘 날짜를 기준으로 상대적으로 계산
 * - 수치 값: 현실적인 범위 안에서 랜덤 초기화
 */

const _today = new Date();
const _currentYear = _today.getFullYear();

/** 정수 난수 (min 이상 max 이하) */
function rand(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

/** 오늘 기준 N일 전 날짜를 "M/D" 형식으로 반환. daysAgo=0이면 "오늘" */
function relativeDay(daysAgo: number): string {
  if (daysAgo === 0) return '오늘';
  const d = new Date(_today);
  d.setDate(_today.getDate() - daysAgo);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

/**
 * 오늘 기준 N개월 전의 월 레이블을 반환한다.
 * - 일반 달: "M월"
 * - 1월(연도 경계): "'YY 1월" — 연도가 바뀌는 시점을 시각적으로 구분
 */
function rollingMonthLabel(monthsBack: number): string {
  const d = new Date(_today.getFullYear(), _today.getMonth() - monthsBack, 1);
  const m = d.getMonth() + 1;
  if (m === 1) return `'${String(d.getFullYear()).slice(2)} 1월`;
  return `${m}월`;
}

/** 현재 시각 기준 N분 전 시각을 "HH:MM:SS" 형식으로 반환 */
function timeAgo(minutesAgo: number): string {
  const d = new Date(_today);
  d.setMinutes(_today.getMinutes() - minutesAgo);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

// ─── W2: 최근 7일 에너지원별 누적 데이터 ────────────────────────────────────

/** 최근 7일 에너지원별 누적 데이터 (W2) */
export const energySourceTrendData = Array.from({ length: 7 }, (_, i) => ({
  day: relativeDay(6 - i),
  electricity: rand(350, 580),
  gas:         rand(140, 240),
  heat:        rand(75,  135),
}));

// ─── W3: 탄소 배출량 — 주/월/년 ─────────────────────────────────────────────

const _KR_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** 탄소 배출량 데이터 — 주/월/년 (W3) */
export const carbonEmissionData = {
  /** 주간 탭: 어제 포함 직전 7일 — 실제 요일명을 순서대로 표시 */
  weekly: Array.from({ length: 7 }, (_, i) => {
    const d = new Date(_today);
    d.setDate(_today.getDate() - (7 - i)); // 7일 전 → 어제 순서
    return {
      label: _KR_DAYS[d.getDay()],
      tCO2: parseFloat((rand(80, 160) / 10).toFixed(1)),
    };
  }),
  /** 월간 탭: 오늘 기준 과거 11개월 (직전 달까지) */
  monthly: Array.from({ length: 11 }, (_, i) => ({
    label: rollingMonthLabel(11 - i),
    tCO2: rand(260, 390),
  })),
  /** 연간 탭: 현재 연도 포함 최근 6년 */
  yearly: Array.from({ length: 6 }, (_, i) => ({
    label: `${_currentYear - 5 + i}년`,
    tCO2: rand(3200, 4200),
  })),
};

// ─── W6: 전년 동월 대비 ──────────────────────────────────────────────────────

/** 전년 동월 대비 데이터 (W6) — 오늘 기준 과거 11개월 (직전 달까지) */
export const yoyComparisonData = Array.from({ length: 11 }, (_, i) => ({
  month:    rollingMonthLabel(11 - i),
  lastYear: rand(250, 370),
  thisYear: rand(240, 380),
}));

/**
 * YoY 차트 범례 레이블.
 * 11개월 롤링 윈도우는 두 연도에 걸치므로 연도 고정 표기 대신 범용 레이블 사용.
 */
export const yoyYearLabels = {
  thisYear: '당해연도',
  lastYear: '전년 동월',
};

// ─── W7: 5년 예측 ────────────────────────────────────────────────────────────

/**
 * 5년 예측 데이터 — 과거(solid) + 미래(dotted) (W7)
 * 과거 4년 + 현재(bridge point) + 미래 1년
 */
const _bridgeActual = rand(3100, 3600);
export const predictionData = [
  { year: `${_currentYear - 4}년`, actual: rand(3600, 4000), forecast: null          },
  { year: `${_currentYear - 3}년`, actual: rand(3450, 3900), forecast: null          },
  { year: `${_currentYear - 2}년`, actual: rand(3300, 3800), forecast: null          },
  { year: `${_currentYear - 1}년`, actual: rand(3150, 3700), forecast: null          },
  { year: `${_currentYear}년`,     actual: _bridgeActual,    forecast: _bridgeActual }, // bridge point
  { year: `${_currentYear + 1}년`, actual: null,             forecast: rand(2900, 3400) },
];

/** W7 ReferenceLine에 표시할 현재 연도 레이블 */
export const predictionCurrentYearLabel = `${_currentYear}년`;

// ─── W5: 이벤트 로그 ─────────────────────────────────────────────────────────

export type EventSeverity = 'danger' | 'warning' | 'info';

export interface EventLogItem {
  id: string;
  time: string;
  severity: EventSeverity;
  message: string;
  /** 확인 처리된 시각 (confirmed 상태일 때 존재) */
  confirmedAt?: string;
}

const _EVENT_POOL: Array<{ severity: EventSeverity; message: string }> = [
  { severity: 'danger',  message: 'B동 3층 분전반 과부하 감지 (105% 초과)' },
  { severity: 'danger',  message: 'A동 UPS 배터리 잔량 15% 미만' },
  { severity: 'danger',  message: '고압 수전 설비 이상 전압 감지' },
  { severity: 'warning', message: '냉각탑 #2 소비전력 임계치 도달' },
  { severity: 'warning', message: '에너지 피크 타임 진입 (14:00~17:00)' },
  { severity: 'warning', message: '공조기 AHU-04 필터 교체 권고' },
  { severity: 'warning', message: '전력 사용량 일간 예산 85% 도달' },
  { severity: 'info',    message: '태양광 패널 출력 정상 복귀' },
  { severity: 'info',    message: '일간 에너지 예산 70% 도달' },
  { severity: 'info',    message: '자동 수요반응(DR) 프로그램 종료' },
  { severity: 'info',    message: '야간 절전 모드 자동 전환 완료' },
];

/** 이벤트 풀을 섞어 상위 8개를 현재 시각 기준 타임스탬프와 함께 반환 */
function generateEventLog(): EventLogItem[] {
  const shuffled = [..._EVENT_POOL].sort(() => Math.random() - 0.5).slice(0, 8);
  // 최근 이벤트가 위로 오도록 시간 간격을 누적해서 부여
  let elapsed = rand(1, 8);
  return shuffled.map((event, i) => {
    const item: EventLogItem = {
      id: `e${i + 1}`,
      time: timeAgo(elapsed),
      ...event,
    };
    elapsed += rand(5, 20);
    return item;
  });
}

/** 실시간 이벤트 로그 목록 (W5) */
export const eventLogData: EventLogItem[] = generateEventLog();
