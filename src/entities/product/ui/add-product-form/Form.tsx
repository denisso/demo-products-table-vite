import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormField,
  type FieldRenderProps,
  FormFields,
  LoadingButton,
  TextInput,
} from '@/shared/ui';
import { useAddProduct } from '@/entities/product/model';

type AddProductFormData = {
  title: string;
  brand: string;
  category: string;
  price: string;
  rating: string;
};

type AddProductFormProps = {
  onSuccess?: () => void;
};

export const AddProductForm = ({ onSuccess }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<AddProductFormData>();
  const m = useAddProduct();

  const onSubmit = async (data: AddProductFormData) => {
    const price = Number(data.price);
    const rating = Number(data.rating);

    if (Number.isNaN(price)) {
      setError('price', { message: 'Введите корректную цену' });
      return;
    }

    if (Number.isNaN(rating)) {
      setError('rating', { message: 'Введите корректный рейтинг' });
      return;
    }
    m.mutate({
      title: data.title.trim(),
      brand: data.brand.trim(),
      category: data.category.trim(),
      price,
      rating,
    });
  };

  React.useEffect(() => {
    if (m.isSuccess) {
      reset();
      onSuccess?.();
    }
  }, [reset, m.isSuccess, onSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <FormFields>
        <FormField
          label='Название'
          name='title'
          register={register}
          error={errors.title}
          required
          render={(fieldProps: FieldRenderProps) => (
            <TextInput {...fieldProps} type='text' placeholder='iPhone 15' />
          )}
        />
        <FormField
          label='Бренд'
          name='brand'
          register={register}
          error={errors.brand}
          required
          render={(fieldProps: FieldRenderProps) => (
            <TextInput {...fieldProps} type='text' placeholder='Apple' />
          )}
        />
        <FormField
          label='Категория'
          name='category'
          register={register}
          error={errors.category}
          required
          render={(fieldProps: FieldRenderProps) => (
            <TextInput {...fieldProps} type='text' placeholder='smartphones' />
          )}
        />
        <FormField
          label='Цена'
          name='price'
          register={register}
          error={errors.price}
          required
          render={(fieldProps) => (
            <TextInput {...fieldProps} type='number' placeholder='999' />
          )}
        />
        <FormField
          label='Рейтинг'
          name='rating'
          register={register}
          error={errors.rating}
          required
          render={(fieldProps) => (
            <TextInput {...fieldProps} type='number' placeholder='4.8' />
          )}
        />
      </FormFields>
      <LoadingButton
        loading={isSubmitting || m.isPending}
        type='submit'
        color='primary'
        className='mt-4 w-full'
        disabled={isSubmitting || m.isPending}
      >
        {isSubmitting ? 'Добавление...' : 'Добавить товар'}
      </LoadingButton>
    </form>
  );
};
