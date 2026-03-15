# Real-time Performance & State Management Rules

SmartEnergy Dashboard는 초 단위로 갱신되는 방대한 시계열 데이터를 다룹니다. 성능 저하 및 메모리 누수를 방지하기 위해 아래 규칙을 엄격히 준수해야 합니다.

## 1. 렌더링 격리 원칙 (Render Isolation)
- **Top-Down 렌더링 금지:** 실시간 데이터(Jotai Atom)를 상위 Layout이나 Page 컴포넌트에서 구독(useAtom)하지 마세요. 
- **Leaf-Node 구독:** 실시간 데이터가 필요한 '가장 말단 컴포넌트(Leaf Node)' 예를 들어 `LiveEnergyChart` 내부에서만 Atom을 구독하여, 화면 전체가 리렌더링되는 것을 방지하세요.

## 2. 시각화(Chart) 최적화 규칙
- **Animation Off:** 실시간 스트리밍(초당 업데이트)이 적용되는 차트는 라이브러리(EvilCharts, Recharts 등)의 렌더링 애니메이션 옵션을 반드시 꺼야 합니다. (예: `isAnimationActive={false}`, `transition: 0`).
- **Data Truncation (FIFO):** 브라우저 메모리 오버플로우를 막기 위해 차트에 바인딩되는 배열의 최대 길이는 항상 60~100개로 엄격하게 제한(Slice/Shift)해야 합니다.

## 3. 메모리 누수 방지 (Memory Leak Prevention)
- **Cleanup 필수:** WebSocket 연결, `setInterval`, `setTimeout` 등을 사용하는 Mock/Real 훅(`useSocketMock.ts` 등)은 컴포넌트 언마운트 시 반드시 `cleanup function`을 반환하여 리소스를 해제해야 합니다.
- **Event Listener:** `window.addEventListener`를 사용할 경우 동일하게 제거(`removeEventListener`)해야 합니다.

## 4. Derived State (파생 상태) 캐싱
- 임계치 초과 여부를 계산하는 로직(`isAlert`) 등은 렌더링 사이클마다 재계산하지 말고, Jotai의 파생 Atom(Derived Atom)을 사용하여 데이터가 변경될 때만 연산되도록 구성하세요.