## 1. Tech Stack

- **Language:** TypeScript 5.4.5
- **Framework:** React 18.3.1 (Vite)
- **State Management:** Zustand 4.5.2
- **Server State:** @tanstack/react-query 5.37.1
- **Styling:** TailwindCSS 3.4.3
- **Build Tool:** Vite 5.2.11
- **Node.js:** 22.22.2
- **ESLint:** 8.57.0
- **Prettier:** 3.2.5

> ⚠️ **Node.js 22.22.2 버전을 준수하여 환경을 구성함**

## 2. Global DO NOT

- **components에서 직접 외부 API 호출 x** → 반드시 hooks 또는 api 레이어 사용
- **VAC 내부에서 비즈니스 로직 작성 x** → 모든 판단 로직은 Container/Hooks에서 처리
- **컴포넌트에서 직접 state 변경 x** → hooks를 통해서만 변경 (Action 사용)
- **shared → features 의존 x** → 단방향 의존성 유지 (하위 레이어는 상위를 참조하지 않아야 함)
- **api.ts에서 데이터 가공 x** → 순수 네트워크 요청만 담당 (transform은 hooks 또는 mapper에서 수행)
- **any 타입 사용 금지** → 인터페이스 및 타입을 명확히 정의하여 타입 안정성 확보
- **Magic Number/String 금지** → 상수는 반드시 별도의 `constant.ts`로 관리

## 3. Commands

- `npm install`: 의존성 설치
- `npm run dev`: 개발 서버 실행 (Vite)
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 결과물 미리보기
- `npm run lint`: ESLint를 통한 코드 스타일 및 오류 체크
- `npm run format`: Prettier를 통한 코드 포맷팅