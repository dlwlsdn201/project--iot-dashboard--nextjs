# Git Workflow & Code Quality Conventions

엔터프라이즈 환경에서의 원활한 협업과 코드 리뷰를 위해, 커밋 메시지와 코드 구조에 대한 표준을 정의합니다.

## 1. Git Commit Convention (Conventional Commits)
커밋 메시지는 반드시 아래 포맷을 따릅니다:
`type(scope): subject`

- **feat**: 새로운 기능 추가 (예: `feat(widget): add load gauge chart`)
- **fix**: 버그 수정 (예: `fix(store): fix memory leak in socket mock`)
- **refactor**: 코드 리팩토링 (기능 변화 없음)
- **design**: UI, CSS 등 디자인 변경 (예: `design(shared): apply dark mode colors to base card`)
- **test**: 테스트 코드 추가 및 수정
- **chore**: 빌드 업무 수정, 패키지 매니저 설정 (예: `chore(deps): install base-ui`)

*주의: Subject는 소문자로 시작하며, 과거 시제 대신 명령형(add, fix)을 사용합니다.*

## 2. 코드 품질 및 안전성 (TypeScript Strictness)
- **No `any`:** TypeScript에서 `any` 타입의 사용을 엄격히 금지합니다. 타입을 모를 경우 `unknown`을 사용하고 Type Guard로 좁혀서(Narrowing) 사용하세요.
- **Non-null Assertion 금지:** `obj!.property` 방식의 강제 확언을 피하고, 옵셔널 체이닝(`obj?.property`)과 Nullish 병합 연산자(`??`)를 사용해 런타임 에러를 방지하세요.

## 3. 주석 및 문서화 (Documentation)
- 복잡한 비즈니스 로직(예: 데이터 버퍼링, 알림 임계치 계산 로직) 위에는 JSDoc 스타일(`/** ... */`)로 해당 함수의 목적과 파라미터 설명을 반드시 작성하세요.
- 불필요한 인라인 주석(`// 데이터를 더한다`)은 지양하고, 코드가 스스로 설명(Self-documenting)하도록 변수명과 함수명을 명확히 짓는 데 집중하세요.