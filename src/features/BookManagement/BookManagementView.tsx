import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import Card from '../../shared/ui/Card/Card';

type Props = {
  isModalOpen: boolean;
  newTitle: string;
  errorMsg: string;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onTitleChange: (title: string) => void;
  onRename: () => void;
  onDelete: () => void;
};

export const BookManagementView = ({
  isModalOpen,
  newTitle,
  errorMsg,
  onOpenModal,
  onCloseModal,
  onTitleChange,
  onRename,
  onDelete,
}: Props) => {
  return (
    <Card className="p-4 bg-gray-50 border-dashed border-2 border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">도서 관리 (Danger Zone)</h3>
      <div className="flex gap-4">
        <Button onClick={onOpenModal} variant="secondary">
          제목 수정
        </Button>
        <Button onClick={onDelete} variant="danger">
          도서 삭제
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h4 className="text-xl font-bold mb-4">도서 제목 수정</h4>
            <div className="mb-4">
              <label htmlFor="rename-input" className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <Input
                id="rename-input"
                value={newTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="변경할 제목을 입력하세요"
              />
              {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button onClick={onCloseModal} variant="secondary">
                취소
              </Button>
              <Button onClick={onRename} variant="primary">
                저장
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
