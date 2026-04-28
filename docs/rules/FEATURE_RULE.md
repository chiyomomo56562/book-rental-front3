# Feature Implementation Rules

이 문서는 개별 Feature 모듈을 실제로 **어떻게(How)** 구현하고 구성하는지에 대한 세부 지침을 담습니다. 상위 아키텍처 원칙 및 계층 간 경계는 [ARCHITECTURE.md](../ARCHITECTURE.md)를 반드시 먼저 참조하십시오.

## 1. Feature Folder Structure (Airbnb Standard)

- **React Components**: `PascalCase`를 사용합니다.
- **Other Files**: `camelCase`를 사용합니다.

```
{featureName}/
├── components/ # {Feature}Container.tsx, {Feature}View.tsx
├── hooks/      # use{Action}Query.ts, use{Entity}{Role}.ts (필요 시 역할별 통합)
├── api.ts      # 네트워크 요청
├── mapper.ts   # API Response -> UI Model 변환
├── types.ts    # 타입 정의
└── state.ts    # 전용 상태 관리
```

## 2. Naming Rules (Mechanics)

### Components
- **Component & File Name**: `PascalCase`를 사용합니다.
    - 예: `BookContainer.tsx`, `BookView.tsx`

### Hooks
- **Hook & File Name**: `camelCase`를 사용하며 `use` 접두사를 붙입니다. 엔티티와 생명주기가 같다면 하나의 파일에 여러 훅(Query, Mutation)을 통합할 수 있습니다.
    - 예: 단일 - `useBooksQuery.ts`, 통합 - `useBookActions.ts` (역할 명시)

### Functions & Variables
- **Standard**: `camelCase`를 사용합니다.
- **Handlers**: Container에서 정의하는 이벤트 핸들러는 `handle` 접두사 사용 (예: `handleSearch`, `handleSubmit`)

### State & Types
- **Types/Interfaces**: `PascalCase`를 사용합니다.
- **Constants**: `CONSTANT_CASE`를 사용합니다.
- **Store Hook**: `use{Name}Store` (예: `useBookStore`)

## 3. Implementation Patterns

- **Server State Handling**:
  - `api.ts`에서 데이터를 가져오고, `hooks/`에서 이를 `useQuery` 등으로 감싸서 제공합니다.
  - 이 과정에서 반드시 `mapper.ts`의 변환 함수를 거쳐야 합니다.
- **State Management**:
  - 해당 기능 안에서만 쓰이는 상태는 `state.ts`에 정의된 전용 Store를 사용합니다.