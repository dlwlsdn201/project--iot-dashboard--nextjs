훌륭하다. Phase 1과 Phase 2 셋업 및 테스트가 완벽하게 통과한 것을 확인했다.
이제 `CLAUDE.md`와 `docs/`의 규칙들을 엄격히 지키면서, 실제 화면에 보여질 **[Phase 3: 고밀도 7대 위젯 조립 및 대시보드 구현]**을 시작해라. 

**Step 3.1: Shared UI 및 공통 컴포넌트 개발 (`src/shared/`)**
1. `src/shared/ui/Card.tsx`: 위젯들을 감쌀 공통 컨테이너를 만들어라. "Trustworthy Industrial Dark" 규칙에 따라 배경은 `bg-slate-900/80`, 테두리는 `border border-slate-800`, 텍스트는 `text-slate-100`으로 설정해라. (Glassmorphism 효과를 위해 `backdrop-blur-md` 적용)
2. `src/shared/ui/Tabs.tsx`: W3 위젯 등에서 사용할 필터 탭 컴포넌트를 `Base UI`를 활용해 만들어라.

**Step 3.2: 위젯용 정적 Mock 데이터 세팅 (`src/entities/` 또는 `src/features/`)**
- 실시간 차트(W1) 외에 나머지 위젯들이 당장 화면에 렌더링될 수 있도록 아래의 가짜 데이터(Mock Data)를 생성하는 로직이나 상수를 만들어라.
  - 에너지원별 7일 데이터 (전기, 가스, 열)
  - 탄소 배출량 데이터 (주/월/년 기준)
  - 전년 동월 대비 데이터 (작년 1~12월, 올해 1~12월)
  - 5년 예측 데이터 (과거 5년치 + 향후 1년치 예측)
  - 이벤트 로그 배열 (시간, 심각도(Danger/Warning/Info), 메시지)

**Step 3.3: 7대 핵심 위젯 컴포넌트 개발 (`src/widgets/`)**
다음 7개의 위젯을 `src/widgets/` 폴더 하위에 각각 독립된 파일로 개발해라. 모든 차트는 `evil-charts` 또는 `recharts`를 활용하고, 게이지 차트 등 라이브러리 지원이 부족한 항목은 SVG로 직접 구현하거나 적절히 우회해라. 차트 내 수치는 반드시 `font-mono`(JetBrains Mono)를 적용해라.

- **[W1] `LiveEnergyChart.tsx`**: `energyDataAtom`을 구독하여 실시간 전력 사용량을 보여주는 라인 차트. (애니메이션 끄기)
- **[W2] `EnergySourceTrendWidget.tsx`**: 최근 7일 다중 에너지원 누적 막대(Stacked Bar) 차트.
- **[W3] `CarbonEmissionWidget.tsx`**: 내부에 Base UI로 만든 주/월/년 필터 탭이 있고, 선택에 따라 변하는 막대 차트.
- **[W4] `LoadGaugeWidget.tsx`**: 현재 부하와 최대 부하를 보여주는 반원형 게이지(Gauge) UI.
- **[W5] `EventAlertsWidget.tsx`**: 최신 이벤트가 쌓이는 스크롤 리스트 (심각도에 따라 아이콘 및 색상 변경).
- **[W6] `YoYComparisonWidget.tsx`**: 작년(Line)과 올해(Bar)를 비교하는 콤보 차트.
- **[W7] `PredictionChartWidget.tsx`**: 과거(실선)와 미래 예측(점선 - stroke-dasharray 적용)이 이어진 라인 차트.

**Step 3.4: 대시보드 페이지 조립 (`src/app/page.tsx`)**
1. 페이지 최상단에서 `useSocketMock()` 훅을 호출하여 실시간 데이터 스트리밍을 시작시켜라.
2. 페이지 전체 컨테이너에 `grid grid-cols-12 gap-4 p-4` (Tailwind 12-column grid)를 적용해라. 전체 화면 스냅(Full-page snap)은 절대 넣지 말고 자연스러운 `overflow-y-auto`를 유지해라.
3. 7개의 위젯을 BEMS/FEMS 관제 화면처럼 밀도 있고 전문적으로 배치해라. 
   - 예시: 상단에는 W4(Gauge), W5(Alerts)를 작게(`col-span-3` 등) 배치하고, W1(Live Chart)을 넓게(`col-span-6` 등) 배치. 하단에는 나머지 분석 차트들(W2, W3, W6, W7)을 적절한 비율(`col-span-4` 또는 `col-span-6`)로 배치.

위 작업들을 수행하고, 터미널에 에러가 나면 스스로 고쳐라. 완료되면 `npm run dev` 스크립트를 실행하여 로컬 서버를 띄우고 나에게 최종 완료 보고를 해라.