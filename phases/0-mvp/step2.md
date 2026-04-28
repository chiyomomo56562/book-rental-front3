# Step 2: book-list-feature

## 읽어야 할 파일

- `/docs/features/BOOK_LIST_FEATURE.md`
- `/docs/apis/BOOK_API.md`
- `/docs/tests/BOOK_LIST_FEATURE_TEST.md`

## 작업 (TDD 원칙 준수)

1. `/docs/tests/BOOK_LIST_FEATURE_TEST.md`의 시나리오를 바탕으로 **실패하는 테스트**를 먼저 작성하라.
2. `src/features/BookList/` 폴더를 생성하고 다음 구조로 구현하라:
   - `api.ts`: 도서 목록 조회 API 호출
   - `types.ts`: 요청/응답 타입 정의
   - `mapper.ts`: 데이터 변환 로직 (statusText, statusColor 등)
   - `hooks/useBookList.ts`: React Query Query 훅
   - `BookListContainer.tsx`: 로직 담당
   - `BookListView.tsx`: UI 담당
3. MSW 핸들러를 추가하여 API 호출을 모킹하라.

## Acceptance Criteria

```bash
npm test src/features/BookList           # 관련 테스트 통과
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. TDD 사이클을 준수했는가?
2. `api -> mapper -> hooks -> components` 흐름을 준수했는가?
3. 상태에 따른 색상(green/red) 및 텍스트 매핑이 정확한가?
4. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.

## 금지사항

- View 컴포넌트에서 비즈니스 로직을 작성하지 마라.
- 컴포넌트에서 직접 API 응답(Raw Data)을 가공하지 마라.
