# Step 4: rental-history-feature

## 읽어야 할 파일

- `/docs/features/RENTAL_HISTORY_FEATURE.md`
- `/docs/apis/RENTAL_API.md`
- `/docs/tests/RENTAL_HISTORY_FEATURE_TEST.md`

## 작업 (TDD 원칙 준수)

1. `/docs/tests/RENTAL_HISTORY_FEATURE_TEST.md`의 시나리오를 바탕으로 **실패하는 테스트**를 먼저 작성하라.
2. `src/features/RentalHistory/` 폴더를 생성하고 다음 구조로 구현하라:
   - `api.ts`: 대여 이력 조회 API 호출
   - `types.ts`: 요청/응답 타입 정의
   - `mapper.ts`: 데이터 변환 로직 (날짜 포맷팅 등)
   - `hooks/useRentalHistory.ts`: React Query Query 훅
   - `RentalHistoryContainer.tsx`: 로직 담당
   - `RentalHistoryView.tsx`: UI 담당
3. MSW 핸들러를 추가하여 API 호출을 모킹하라.

## Acceptance Criteria

```bash
npm test src/features/RentalHistory      # 관련 테스트 통과
npm run build                            # 빌드 에러 없음
```

## 검증 절차

1. TDD 사이클을 준수했는가?
2. 날짜 형식이 요구사항(YYYY-MM-DD HH:mm)에 부합하는가?
3. 결과에 따라 `phases/0-mvp/index.json`을 업데이트하라.
