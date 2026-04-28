# Step 1: book-registration-feature

## 읽어야 할 파일

- `/docs/features/BOOK_REGISTRATION_FEATURE.md`
- `/docs/apis/BOOK_API.md`
- `/docs/tests/BOOK_REGISTRATION_FEATURE_TEST.md`
- `/src/shared/api/axiosInstance.ts` (Step 0 결과물)

## 작업 (TDD 원칙 준수)

1. `/docs/tests/BOOK_REGISTRATION_FEATURE_TEST.md`의 시나리오를 바탕으로 **실패하는 테스트**를 먼저 작성하라.
2. `src/features/BookRegistration/` 폴더를 생성하고 다음 구조로 구현하라:
   - `api.ts`: 도서 등록 API 호출
   - `types.ts`: 요청/응답 타입 정의
   - `mapper.ts`: 데이터 변환 로직
   - `hooks/useCreateBook.ts`: React Query Mutation 훅
   - `BookRegistrationContainer.tsx`: 로직 담당
   - `BookRegistrationView.tsx`: UI 담당
3. MSW 핸들러를 추가하여 API 호출을 모킹하라.

## Acceptance Criteria

```bash
npm test src/features/BookRegistration   # 관련 테스트 통과
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. TDD 사이클을 준수했는가?
2. `api -> mapper -> hooks -> components` 흐름을 준수했는가?
3. 제목 유효성 검증(2~100자)이 정상 작동하는가?
4. 성공 시 `['books', 'list']` 쿼리가 무효화되는가?
5. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.

## 금지사항

- View 컴포넌트에서 비즈니스 로직을 작성하지 마라.
- 컴포넌트에서 직접 API 응답(Raw Data)을 가공하지 마라.
