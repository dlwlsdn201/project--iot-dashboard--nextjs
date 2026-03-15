# SmartEnergy BEMS Dashboard

> 건물·공장 에너지 관리 시스템(BEMS/FEMS)을 위한 고밀도 실시간 관제 대시보드.
> 산업 현장의 복잡한 데이터를 한 화면에 압축적으로 담아내는 것을 목표로 설계했습니다.

---

## Overview

SaaS 스타일의 깔끔한 대시보드가 아닌, 실제 에너지 관리자가 쓰는 **관제 시스템**에 가까운 UX를 구현하고 싶었습니다. 숫자가 끊임없이 바뀌어도 레이아웃이 흔들리지 않고, 이상 징후를 즉각 인지할 수 있는 고밀도 그리드 기반의 인터페이스를 만들었습니다.

실시간 소켓 데이터 스트리밍, 메모리 오버플로우 방지를 위한 FIFO 버퍼링, 렌더링 격리 전략 등 — 겉으로는 잘 보이지 않지만 프로덕션 환경에서 중요한 문제들을 다루는 데 집중했습니다.

---

## Tech Stack

| 영역 | 선택 | 이유 |
|---|---|---|
| Framework | **Next.js 16** (App Router) | RSC 기반 구조 분리, 라우팅 레이어 명확화 |
| Language | **TypeScript 5** | `any` 금지, strict 모드 — 타입이 곧 문서 |
| State | **Jotai 2** | 원자적 상태로 렌더링 격리. 실시간 데이터를 leaf node에서만 구독 |
| Styling | **Tailwind CSS v4** | `@theme` 기반 디자인 토큰, 커스텀 브레이크포인트 |
| Chart | **Recharts 3** | SVG 기반, 애니메이션 제어 용이. 게이지 UI는 SVG 직접 구현 |
| Animation | **Framer Motion** | 상태 전환 마이크로 인터랙션 |
| Testing | **Vitest + React Testing Library** | TDD로 FIFO 버퍼 로직 검증 (Red → Green) |
| Deploy | **Vercel** | |

---

## Architecture

Next.js App Router 환경에서 FSD(Feature-Sliced Design)를 적용할 때 발생하는 레이어 이름 충돌(`app/` 중복)을 해소하기 위해, FSD의 App 레이어를 `apps/`로 커스텀 명명했습니다.

```
src/
├── app/          # Next.js 라우팅 진입점 (Pages, Layouts, Route Handlers)
├── apps/         # FSD App Layer — 전역 Provider, 초기화 설정
│   └── providers/
│       └── JotaiProvider.tsx
├── widgets/      # 독립적으로 동작하는 UI 블록 (W1~W7 대시보드 위젯)
├── features/     # 비즈니스 로직 및 사용자 상호작용
│   └── websocket/
│       └── useSocketMock.ts   # 실제 WebSocket 교체 시 이 파일만 수정
├── entities/     # 도메인 모델, Jotai Atom Store
│   └── energy/
│       └── model/
│           ├── energyStore.ts   # FIFO 버퍼 atom
│           ├── eventStore.ts    # 이벤트 확인/아카이브 atom
│           └── mockData.ts
└── shared/       # 범용 UI 컴포넌트, 유틸리티, 디자인 시스템
    ├── ui/
    └── lib/
```

Import 방향은 단방향(Bottom-up)만 허용합니다. `widgets`는 `features`와 `entities`를 사용할 수 있지만, 역방향은 금지입니다.

---

## Key Design Decisions

### 1. 렌더링 격리 — 실시간 데이터를 Leaf Node에서만 구독

초당 업데이트되는 `energyDataAtom`을 Page나 Layout에서 구독하면 전체 트리가 매초 리렌더링됩니다. `LiveEnergyChart`와 `LoadGaugeWidget` 내부에서만 atom을 구독하도록 구조를 제한했습니다.

### 2. FIFO 버퍼링으로 메모리 오버플로우 방지

```ts
// energyStore.ts
export const appendEnergyDataAtom = atom(null, (_get, set, newPoint) => {
  set(energyDataAtom, (prev) => {
    const next = [...prev, newPoint];
    return next.length > MAX_BUFFER_SIZE ? next.slice(-MAX_BUFFER_SIZE) : next;
  });
});
```

차트에 바인딩되는 배열의 최대 길이를 60개로 제한합니다. 이 로직은 구현 전 Vitest로 테스트를 먼저 작성했습니다(TDD).

### 3. 차트 애니메이션 완전 비활성화

실시간 스트리밍 환경에서 차트 라이브러리의 기본 애니메이션은 렌더링 부하를 증가시킵니다. 모든 차트에 `isAnimationActive={false}`를 적용했습니다.

### 4. "Trustworthy Industrial Dark" 디자인 시스템

단순한 다크모드가 아닌, 산업용 관제 시스템의 신뢰감 있는 시각 언어를 구현했습니다.

- **Background** `slate-950` / **Surface** `slate-900/80` + `backdrop-blur`
- **Status Colors** — `blue-500` (정상), `amber-500` (경고), `rose-600` (위험), `emerald-500` (친환경)
- **Typography** — UI 텍스트: `Inter` / 수치 데이터: `JetBrains Mono` (숫자 변경 시 레이아웃 떨림 방지)

### 5. 반응형 레이아웃 — 스크롤 없는 전문가 뷰

```
Mobile  (< 768px)  : grid-cols-1  단일 컬럼, body 자연 스크롤
Tablet  (≥ 768px)  : grid-cols-4  grid-rows-3, 뷰포트 완전 채움
Laptop (≥ 1200px) : grid-cols-12 grid-rows-3, 7위젯 고밀도 배치
Desktop (≥ 1920px) : grid-cols-12 grid-rows-3, 7위젯 고밀도 배치
```

태블릿 이상에서는 `html/body { overflow: hidden }`으로 document scroll을 완전히 차단하고, CSS Grid의 `grid-template-rows: repeat(3, 1fr)`로 Header + Grid = 100vh 공식을 강제합니다.

---

## Dashboard Widgets

| 위젯 | 설명 |
|---|---|
| **W1** Live Energy | 실시간 전력 사용량 라인 차트. 갱신 주기 선택(1초/5초/1분), 화면 크기별 X축 tick 수 자동 조정 |
| **W2** 7-Day Trend | 전기·가스·열 에너지원별 누적 막대 차트 |
| **W3** Carbon Emission | 주/월/년 필터 탭이 포함된 탄소 배출량 막대 차트 |
| **W4** Load Gauge | SVG로 직접 구현한 반원형 게이지. 부하율에 따라 색상 동적 변환 |
| **W5** Event Alerts | 클릭으로 이벤트 처리 완료 처리 → Confirmed 아카이브 이동. 모달에서 검색 필터링 제공 |
| **W6** YoY Comparison | 전년(Line) 대비 올해(Bar) Combo 차트 |
| **W7** 5-Year Prediction | 과거 실측(실선)과 미래 예측(점선 `strokeDasharray`) 라인 차트 |

---

## Getting Started

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 테스트 (FIFO 버퍼 로직 등)
pnpm test

# 타입 검사
pnpm exec tsc --noEmit
```

> **Node.js 18+**, **pnpm** 환경을 권장합니다.

---

## Project Background

에너지 관리 시스템을 다루는 B2B SaaS 프로덕트를 개발하면서, "실제 현장에서 쓰이는 관제 화면은 어떻게 만들어야 하는가"라는 질문을 갖게 됐습니다. 이 프로젝트는 그 질문에 대한 개인적인 탐구의 내용이 담겨져 있다고 할 수 있겠습니다.

특히 아래 두 가지 문제가 흥미로웠습니다.

1. **실시간 데이터 스트리밍 환경에서의 렌더링 최적화** — 초당 업데이트가 전체 UI를 무너뜨리지 않게 하려면 어떤 구조가 필요한가?
2. **정보 밀도와 가독성의 균형** — 한 화면에 많은 데이터를 최대한 표현하면서도 이상 징후를 즉각 인지할 수 있게 하려면 어떻게 해야하는가?

---

