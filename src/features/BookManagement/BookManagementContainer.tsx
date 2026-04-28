import { useState } from 'react';
import { BookManagementView } from './BookManagementView';
import { useRenameBook } from './hooks/useRenameBook';
import { useRemoveBook } from './hooks/useRemoveBook';

type Props = {
  bookId: string;
  currentTitle: string;
};

export const BookManagementContainer = ({ bookId, currentTitle }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [errorMsg, setErrorMsg] = useState('');

  const { mutate: rename } = useRenameBook(bookId);
  const { mutate: remove } = useRemoveBook(bookId);

  const handleOpenModal = () => {
    setNewTitle(currentTitle);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (title: string) => {
    setNewTitle(title);
    if (title.trim()) {
      setErrorMsg('');
    }
  };

  const handleRename = () => {
    if (!newTitle.trim()) {
      setErrorMsg('제목을 입력해주세요');
      return;
    }
    if (newTitle === currentTitle) {
      handleCloseModal();
      return;
    }

    rename(newTitle, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove();
    }
  };

  return (
    <BookManagementView
      isModalOpen={isModalOpen}
      newTitle={newTitle}
      errorMsg={errorMsg}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      onTitleChange={handleTitleChange}
      onRename={handleRename}
      onDelete={handleDelete}
    />
  );
};
