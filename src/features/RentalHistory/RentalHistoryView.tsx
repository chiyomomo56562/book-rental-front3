import { RentalHistoryViewModel } from './types';

interface Props {
  history: RentalHistoryViewModel[];
  isLoading: boolean;
  isError: boolean;
}

export const RentalHistoryView = ({ history, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 py-4 text-center">
        대여 이력을 불러오는 중 에러가 발생했습니다.
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-gray-500 py-8 text-center border rounded-lg">
        대여 이력이 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              대여 일시
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              반납 일시
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((item) => (
            <tr key={item.id} className={item.isCurrentlyRented ? 'bg-blue-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.rentedDateText}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                item.isCurrentlyRented ? 'text-blue-600 font-bold' : 'text-gray-900'
              }`}>
                {item.returnedDateText}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
