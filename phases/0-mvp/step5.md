# Step 5: book-management-feature

## 읽어야 할 파일

- `/docs/features/BOOK_MANAGEMENT_FEATURE.md`
- `/docs/apis/BOOK_API.md`
- `/docs/tests/BOOK_MANAGEMENT_FEATURE_TEST.md`

## 작업 (TDD 원칙 준수)

1. `/docs/tests/BOOK_MANAGEMENT_FEATURE_TEST.md`의 시나리오를 바탕으로 **실패하는 테스트**를 먼저 작성하라.
2. `src/features/BookManagement/` 폴더를 생성하고 다음 구조로 구현하라:
   - `api.ts`: 도서 수정 및 삭제 API 호출
   - `types.ts`: 요청/응답 타입 정의
   - `mapper.ts`: 데이터 변환 로직
   - `hooks/useUpdateBook.ts`: 수정 Mutation 훅
   - `hooks/useDeleteBook.ts`: 삭제 Mutation 훅
   - `BookManagementContainer.tsx`: 로직 담당
   - `BookManagementView.tsx`: UI 담당
3. MSW 핸들러를 추가하여 API 호출을 모킹하라.

## Acceptance Criteria

```bash
npm test src/features/BookManagement     # 관련 테스트 통과
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. TDD 사이클을 준수했는가?
2. 삭제 전 확인 컨펌(Confirm) 로직이 포함되었는가?
3. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.
