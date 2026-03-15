훌륭하다. 다음과 같은 몇 가지 UX/UI 보완을 부탁해

**Step 5.1: Mobile 사이즈 일 때, 전체 화면의 스크롤 기능 활성화**
  - 현재 코드베이스 버전으로는 Mobile 사이즈일 때, 모든 컨텐츠들이 한 화면에 보일 수 없는 뷰이기 때문에 스크롤이 필수적으로 활성화되어야 한다. 
  - 단, 태블릿 이상의 사이즈일 때는 현재 버전 그대로 100vh 에 다 보이도록 유지되어야 한다. 

**Step 5.2: Live Energy 차트의 UX/UI 보완**
  - Tablet(max-width: 1000px) 사이즈일 경우, X axis tick 갯수를 7개로 해야 label 끼리 겹쳐지는 이슈를 최대한 보완할 수 있을 것 같다
  - Mobile(max-width: 1000px) 사이즈일 경우, X axis tick 갯수를 5개로 해야 label 끼리 겹쳐지는 이슈를 최대한 보완할 수 있을 것 같다

**Step 5.3: Event Alerts 의 content confirm 상태 관리**
  - Event Alerts 의 알람 컨텐츠 중, 사용자가 확인, 처리 완료한 항목은 클릭 또는 터치하면 해당 로그는 "confirmed" 이름으로 archive 역할을 하는 공간으로 옮겨졌으면 좋겠다. 
  - 이 confirmed 공간은 Event Alerts 의 헤더 영역에 적절한 트리거 아이콘 요소를 배치하고, 아이콘 클릭 시, 확인/해결 완료한 이벤트 로그 데이터들을 확인할 수 있는 Modal UI 가 출력되었으면 좋겠다. 또한, 이 modal UI 내부에는 로그 내용을 기준으로 검색 필터링 기능을 하는 Input UI 도 있었으면 좋곘다.
  - 태블릿 이하의 사이즈일 때도 동일하게 dropdown overlay 에 표시되는 Event Alerts 의 헤더 타이틀 바로 옆에 동일한 트리거 아이콘이 생성되어야 하고 나머지 로직과 UX들은 동일해야한다.