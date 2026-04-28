import React from 'react';
import { useForm } from 'react-hook-form';
import { RegistrationFormValues } from './types';
import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import Card from '../../shared/ui/Card/Card';

interface Props {
  onSubmit: (values: RegistrationFormValues) => void;
  isLoading: boolean;
  serverError?: string;
}

const BookRegistrationView: React.FC<Props> = ({ onSubmit, isLoading, serverError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      title: '',
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card title="도서 등록">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="도서 제목"
            placeholder="제목을 입력하세요"
            error={errors.title?.message || serverError}
            {...register('title', {
              required: '제목은 필수 입력 사항입니다',
              minLength: {
                value: 2,
                message: '제목은 최소 2자 이상이어야 합니다',
              },
              maxLength: {
                value: 100,
                message: '제목은 최대 100자 이하이어야 합니다',
              },
            })}
          />
          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              등록하기
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookRegistrationView;
