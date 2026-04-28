# Step 6: page-composition-routing

## 읽어야 할 파일

- `/docs/pages/BOOK_LIST_PAGE.md`
- `/docs/pages/BOOK_DETAIL_PAGE.md`
- `/docs/pages/BOOK_REGISTRATION_PAGE.md`
- `/docs/ARCHITECTURE.md` (Router 설정 관련)

## 작업

1. `src/pages/` 하위에 각 페이지 컴포넌트를 생성하고 해당 피처들을 조합하라:
   - `BookListPage.tsx`: `BookList` 피처 포함
   - `BookDetailPage.tsx`: `BookDetail`, `RentalHistory` 피처 포함
   - `BookRegistrationPage.tsx`: `BookRegistration` 피처 포함
2. `src/app/providers/RouterProvider.tsx` (또는 유사한 위치)에서 React Router를 설정하라.
   - `/`: `BookListPage`
   - `/books/new`: `BookRegistrationPage`
   - `/books/:id`: `BookDetailPage`
3. `DefaultLayout`을 모든 페이지에 적용하라.

## Acceptance Criteria

```bash
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. 각 라우팅 경로가 올바르게 작동하는가?
2. 페이지 간 이동(Navigation)이 정상적인가?
3. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.
4. 모든 단계가 완료되었으므로 Phase를 종료하라.
