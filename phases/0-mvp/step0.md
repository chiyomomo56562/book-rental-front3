# Step 0: shared-infrastructure

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/ARCHITECTURE.md`
- `/docs/ADR.md`
- `/docs/STYLE_GUIDE.md`
- `/package.json`

## 작업 (TDD 원칙 준수)

공통 인프라를 구축하며, 특히 API 통신과 MSW 환경을 우선 설정한다.

1. **Axios 설정**: `src/shared/api/axiosInstance.ts`를 생성하고 기본 URL 및 인터셉터를 설정하라. (AGENT.md 준수)
2. **MSW 설정**: `src/app/mocks/` 하위에 기본 브라우저 설정 및 핸들러 구조를 잡아라.
3. **공용 UI 컴포넌트**: `src/shared/ui/` 하위에 `Button`, `Input`, `Card`, `Badge` 등 기본 아토믹 컴포넌트를 TailwindCSS로 작성하라.
4. **Layout**: `src/shared/ui/Layout/DefaultLayout.tsx`를 작성하여 페이지 공통 구조를 잡아라.

## Acceptance Criteria

```bash
npm run build   # 컴파일 에러 없음
# shared/ui 컴포넌트들에 대한 간단한 렌더링 테스트 통과 확인 (필요 시 작성)
```

## 검증 절차

1. `axiosInstance`가 전역에서 싱글톤으로 작동하는지 확인한다.
2. TailwindCSS 클래스가 `STYLE_GUIDE.md`의 금지 사항(매직 넘버 등)을 위반하지 않았는지 확인한다.
3. `phases/0-mvp/index.json`의 0번 step을 `"completed"`로 업데이트한다.

## 금지사항

- `axiosInstance`를 직접 API 파일 이외에서 참조하지 마라.
- `shared` 레이어에서 `features`나 `pages`를 참조하지 마라.
