## UI Requirements
- 로딩 상태 표시
- 에러 메시지 표시
- 데이터 렌더링

## Behavior
- mount 시 데이터 fetch
- 사용자 액션 처리 (optional)

## Architectural Constraints
- **Responsibility**: Composing Features only.
- **Forbidden**: API calls, Business logic, State management (delegate to features).
- **UI Focus**: Only UI layout and feature composition.

## Output Format
- React component (.tsx)