# Step 3: book-detail-feature

## 읽어야 할 파일

- `/docs/features/BOOK_DETAIL_FEATURE.md`
- `/docs/apis/BOOK_API.md`
- `/docs/tests/BOOK_DETAIL_FEATURE_TEST.md`

## 작업 (TDD 원칙 준수)

1. `/docs/tests/BOOK_DETAIL_FEATURE_TEST.md`의 시나리오를 바탕으로 **실패하는 테스트**를 먼저 작성하라.
2. `src/features/BookDetail/` 폴더를 생성하고 다음 구조로 구현하라:
   - `api.ts`: 도서 상세 조회 및 대여/반납 API 호출
   - `types.ts`: 요청/응답 타입 정의
   - `mapper.ts`: 데이터 변환 로직
   - `hooks/useBookDetail.ts`: 조회용 Query 훅
   - `hooks/useRentalActions.ts`: 대여/반납용 Mutation 훅
   - `BookDetailContainer.tsx`: 로직 담당
   - `BookDetailView.tsx`: UI 담당
3. MSW 핸들러를 추가하여 API 호출을 모킹하라.

## Acceptance Criteria

```bash
npm test src/features/BookDetail         # 관련 테스트 통과
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. TDD 사이클을 준수했는가?
2. 대여/반납 성공 시 상세 데이터 및 목록 데이터가 무효화(Invalidate)되는가?
3. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.

## 금지사항

- View 컴포넌트에서 비즈니스 로직을 작성하지 마라.
