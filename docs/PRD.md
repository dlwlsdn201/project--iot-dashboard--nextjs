# [PRD] SmartEnergy BEMS Dashboard

## 1. Product Overview
- **Repository**: `project--iot-dashboard--nextjs`
- **System Context**: Embedded IoT Sensor -> Server -> Frontend Dashboard.
- **Objective**: 구축용 BEMS/FEMS(건물/공장 에너지 관리 시스템) 환경에 적합한 '고밀도 데이터 관제 대시보드' 프론트엔드 구현. 
- **Core Values**: 
  1. 단순한 SaaS 스타일을 배제한 전문적인(Trustworthy) 산업용 관제 UI.
  2. 한 화면에 방대한 데이터를 압축적으로 보여주는 고밀도 그리드(Bento-box) 레이아웃.
  3. 실시간 데이터 스트리밍 환경에서의 렌더링 부하 최적화.

## 2. Target Audience & Scenarios
- **Primary User**: 건물/공장 시설 관리자 및 에너지 분석가.
- **Pain Point**: 데이터가 여러 화면에 흩어져 있어 이상 징후 파악이 늦음.
- **Solution**: 7개의 핵심 위젯을 한 화면(12-column grid)에 조립하여, 스크롤 이동을 최소화하고 직관적인 모니터링 환경 제공.

## 3. Core Features (The 7 Dashboard Widgets)
아래 7개의 위젯(W1~W7)을 12-column 그리드 상에 배치하는 것을 핵심으로 한다.
- **[W1] 실시간 에너지 스트리밍 차트 (Live Energy)**: 초 단위 전력 사용량 라인 차트.
- **[W2] 최근 7일 에너지원별 추세 (7-Day Trend)**: 전기, 가스, 열 등 다중 에너지원 누적 막대 차트.
- **[W3] 단위별 탄소 배출량 (Carbon Emission)**: 주/월/년 필터 탭이 포함된 막대 차트.
- **[W4] 실시간 및 피크 부하 (Load Gauge)**: 실시간 부하 수치와 일일 최대 부하를 직관적으로 보여주는 반원형 게이지(Gauge) UI.
- **[W5] 실시간 이벤트 로그 (Event Alerts)**: 위험(Danger), 경고(Warning) 등 심각도별 색상이 적용된 스크롤 가능한 최신 이벤트 리스트.
- **[W6] 전년 동월 대비 사용량 (YoY Comparison)**: 작년(Line)과 올해(Bar)를 겹쳐서 비교하는 콤보 차트.
- **[W7] 5년 주기 전력 사용 예측 (5-Year Prediction)**: 과거 실선 데이터와 미래 점선(Dotted) 예측 구간이 포함된 라인 차트.