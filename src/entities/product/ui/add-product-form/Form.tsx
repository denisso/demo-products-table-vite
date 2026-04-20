import { useForm } from 'react-hook-form';
import { FormField, FormFields, LoadingButton, TextInput } from '@/shared/ui';
import { addProduct } from '../../api';
import { toastApi } from '@/shared/lib/toast';
import type { FetchError } from '@/shared/api';

type AddProductFormData = {
  title: string;
  brand: string;
  category: string;
  price: string;
  rating: string;
};

export const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<AddProductFormData>();

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

    try {
      const response = await addProduct({
        title: data.title.trim(),
        brand: data.brand.trim(),
        category: data.category.trim(),
        price,
        rating,
      });

      console.log(response);
      toastApi.addToast({
        message: `Товар "${response.title}" добавлен`,
        color: 'success',
      });
      reset();
    } catch (error) {
      const status = (error as FetchError).status;
      toastApi.addToast({
        message:
          typeof status === 'number'
            ? `Ошибка добавления товара (HTTP ${status})`
            : 'Сетевая ошибка. Попробуйте позже.',
        color: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <FormFields>
        <FormField
          label='Название'
          name='title'
          register={register}
          error={errors.title}
          required
          render={(fieldProps) => (
            <TextInput {...fieldProps} type='text' placeholder='iPhone 15' />
          )}
        />
        <FormField
          label='Бренд'
          name='brand'
          register={register}
          error={errors.brand}
          required
          render={(fieldProps) => (
            <TextInput {...fieldProps} type='text' placeholder='Apple' />
          )}
        />
        <FormField
          label='Категория'
          name='category'
          register={register}
          error={errors.category}
          required
          render={(fieldProps) => (
            <TextInput
              {...fieldProps}
              type='text'
              placeholder='smartphones'
            />
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
        loading={isSubmitting}
        type='submit'
        color='primary'
        className='mt-4 w-full'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Добавление...' : 'Добавить товар'}
      </LoadingButton>
    </form>
  );
};
