# SmartEnergy Dashboard - Claude Code System Instructions

You are an expert Frontend Engineer rebuilding the "SmartEnergy BEMS Dashboard" from scratch in the `project--iot-dashboard--nextjs` repository. You MUST strictly adhere to the following constraints at all times.

## 1. Tech Stack
- **Framework**: Next.js 15+ (App Router), React 19, TypeScript
- **UI Components**: Base UI (Headless UI 기반 커스텀)
- **Chart Library**: EvilCharts (게이지 차트 등 미지원 시 Recharts 또는 SVG 직접 구현 허용)
- **State Management**: Jotai (원자적 상태 관리) / TanStack Query
- **Styling & Animation**: Tailwind CSS, Framer Motion
- **Testing**: Vitest + React Testing Library
- **Deploy/Operation**: Vercel, 

## 2. Architecture: Strict FSD (Feature-Sliced Design) + Next.js App Router
Next.js App Router 환경과 FSD 네이밍 충돌을 방지하기 위해, FSD의 `app` 레이어를 `apps`로 커스텀 명명한다. 모든 코드는 `src/` 하위에 아래 레이어 규칙을 엄격히 지켜 배치한다. (Strict Bottom-up import only)

- `app/`: Next.js 라우팅 진입점 전용 (Pages, Layouts, Route Handlers).
- `apps/`: FSD 구조의 App 레이어 역할. 전역 프로바이더(Jotai, Query), 글로벌 스타일, 전역 타입 설정 등 앱 초기화에 필요한 설정 모음. (여기서 설정된 Provider를 `app/layout.tsx`에서 가져다 씀).
- `widgets/`: 독립적으로 동작하는 조립된 UI 블록 (예: W1~W7 차트 대시보드 위젯).
- `features/`: 사용자 상호작용 및 비즈니스 로직 (예: 소켓 통신, 필터링 로직).
- `entities/`: 도메인 데이터 모델, Jotai Atom Store (예: `energyStore.ts`).
- `shared/`: 전역 재사용 UI(Base UI 기반 Card 등), 유틸리티, 디자인 시스템.

## 3. UI Design System: "Trustworthy Industrial Dark"
- **Concept**: 묵직하고 신뢰감을 주는 BEMS/FEMS 산업용 관제 시스템. 전체 화면 스냅(Full-page snap) 금지, 네이티브 수직 스크롤 적용.
- **Colors**: 
  - Background: `slate-950` (#020617)
  - Surface/Card: `slate-900/80` (#0f172a), Border: `slate-800`
  - Status: `blue-500` (Primary), `rose-600` (Danger), `emerald-500` (Eco), `amber-500` (Warning).
- **Typography**: 
  - UI 텍스트: `Inter`
  - 데이터/수치: `JetBrains Mono` (숫자 변경 시 레이아웃 떨림 방지를 위한 Monospace 필수)
- **Layout**: `grid grid-cols-12 gap-4` 기반의 고밀도 위젯 배치.

## 4. Coding Conventions & TDD
- **Naming**: 컴포넌트는 `PascalCase`, 훅/유틸은 `camelCase`, 디렉토리는 `kebab-case` 또는 `camelCase`.
- **Jotai**: Atom 변수명은 반드시 `~Atom` 접미사 사용 (예: `energyDataAtom`).
- **TDD Requirement**: Jotai 상태 관리 로직(특히 FIFO 큐 데이터 버퍼링)은 반드시 Vitest 테스트 코드를 먼저 작성하고(Red), 로직을 구현하여 통과(Green)시킨다.