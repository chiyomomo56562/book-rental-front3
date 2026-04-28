import { useRentalHistory } from './hooks/useRentalHistory';
import { RentalHistoryView } from './RentalHistoryView';

interface Props {
  bookId: string;
}

export const RentalHistoryContainer = ({ bookId }: Props) => {
  const { data: history, isLoading, isError } = useRentalHistory(bookId);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">대여 이력</h3>
      <RentalHistoryView 
        history={history ?? []} 
        isLoading={isLoading} 
        isError={isError} 
      />
    </div>
  );
};
