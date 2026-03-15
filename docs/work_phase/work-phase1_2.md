우리는 현재 빈 저장소인 `project--iot-dashboard--nextjs` 루트 디렉토리에 있다. 
작업을 시작하기 전에, 이 디렉토리에 있는 `CLAUDE.md` 파일과 `docs/` 폴더 하위의 규칙 문서들을 모두 읽고 프로젝트의 목표와 제약 사항을 완벽히 숙지해라. 

특히, Next.js의 라우터인 `app/` 레이어와 FSD 전역 설정을 담당하는 `apps/` 레이어를 분리한 아키텍처 전략과 "Trustworthy Industrial Dark" 디자인 시스템을 절대 잊지 마라.

모든 코드가 유실되어 처음부터 다시 구축해야 하므로, 아래의 **[Action Plan: Phase 1 & 2]**를 순서대로 실행하고 터미널 명령어를 직접 수행해라.

---

**Step 1: Next.js 15 초기화 및 패키지 설치**
1. 현재 빈 디렉토리에 Next.js 15 (App Router, Tailwind CSS, TypeScript, `src/` 디렉토리 사용) 프로젝트를 초기화해라. (필요하다면 임시 폴더에 생성 후 현재 루트로 파일들을 이동시켜라.)
2. 초기화가 완료되면 다음 필수 패키지들을 설치해라: 
   `npm install jotai framer-motion lucide-react @base-ui-components/react evil-charts recharts`
   `npm install -D vitest @testing-library/react @testing-library/dom jsdom`

**Step 2: 커스텀 FSD 구조 셋업 및 환경 설정**
1. `src/` 하위에 명시된 6개의 FSD 레이어 폴더(`app`, `apps`, `widgets`, `features`, `entities`, `shared`)를 생성해라. 기존에 생성된 컴포넌트나 불필요한 보일러플레이트 파일은 삭제하거나 정리해라.
2. `src/apps/providers/JotaiProvider.tsx`를 생성하고, 이를 `src/app/layout.tsx`의 칠드런에 감싸도록(wrapping) 설정해라.
3. `tailwind.config.ts` 및 글로벌 CSS(`src/app/globals.css`)에 "Trustworthy Industrial Dark" 색상 테마(Background: slate-950 등)와 폰트(Inter, JetBrains Mono)를 설정해라.

**Step 3: TDD 기반 Jotai 상태 관리 구현 (Red -> Green)**
1. Vitest 환경 설정을 세팅하고(`vitest.config.ts` 생성 및 `package.json` 스크립트 추가), `src/entities/energy/model/energyStore.test.ts` 파일을 생성해라.
2. 테스트 코드에는 "Jotai 상태 배열(`energyDataAtom`)에 데이터 추가 시, 배열의 최대 길이가 60개를 넘지 않고 가장 오래된 데이터가 삭제(Shift/Slice)되는 FIFO 버퍼링 로직"을 검증하는 내용을 작성해라. (Red 단계)
3. `src/entities/energy/model/energyStore.ts`를 구현하여 위 테스트를 완벽하게 통과시켜라. (Green 단계)
4. 1초마다 랜덤 에너지 데이터(예: 300~800kW)를 생성하여 `energyStore`에 주입하는 Mock 로직을 `src/features/websocket/useSocketMock.ts`에 작성해라. (언마운트 시 clearInterval 필수)

---

위 3단계를 모두 완료한 후, 터미널에서 테스트 스크립트(`npm run test` 또는 `vitest run`)를 실행해라. 
에러가 발생하면 스스로 원인을 분석하고 디버깅하여 해결해라. 테스트가 성공적으로 통과(Pass)하면, 지금까지 수행한 작업의 요약과 함께 나에게 **"Phase 1 & 2 완료 보고"**를 해라. 
보고를 확인한 후, 7개의 핵심 위젯 화면 조립을 위한 Phase 3 명령을 내리겠다.