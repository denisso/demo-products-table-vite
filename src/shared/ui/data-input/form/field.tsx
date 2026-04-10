import type {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';
import clsx from 'clsx';
import React from 'react';
import type { Color } from '@/shared/types';

interface FormFieldProps<TFormData extends FieldValues> {
  label: string;
  isLabelMuted?: boolean;
  name: Path<TFormData>;
  register: UseFormRegister<TFormData>;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  error?: FieldError;
  required?: boolean | string;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  color?: Color;
  render: (fieldProps: {
    ref: (instance: HTMLInputElement | null) => void;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    id: string;
    color: Color;
  }) => React.ReactElement;
}

const requiredMessage = {
  required: 'Обязательное поле',
};

export function FormField<TFormData extends FieldValues>({
  label,
  name,
  register,
  onChange,
  error,
  required = false,
  render,
  layout = 'vertical',
  className,
  isLabelMuted,
  color,
}: FormFieldProps<TFormData>) {
  const uniqueId = React.useId();
  const id = `${String(name)}-${uniqueId}`;
  const validationRules = required ? requiredMessage : {};

  const {
    ref,
    onChange: _onChangeReg,
    onBlur,
  } = register(name, validationRules);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    _onChangeReg(event);
    if (typeof onChange == 'function') {
      onChange(event);
    }
  };
  const _color: Color = error ? 'error' : color ? color : 'neutral';
  const Input = render({
    ref,
    name,
    onChange: _onChange,
    onBlur,
    id,
    color: _color,
  });
  const labelClass = 'font-medium no-interaction';

  return (
    <>
      <div className={className}>
        {layout === 'vertical' ? (
          <div className='flex flex-col gap-2'>
            <label className={labelClass} htmlFor={id}>
              {label}
            </label>
            {Input}
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            {Input}
            <label
              className={clsx(labelClass, { ['text-muted']: isLabelMuted })}
              htmlFor={id}
            >
              {label}
            </label>
          </div>
        )}
        <div className='h-4'>
          {error && <p className='label text-error'>{error.message}</p>}
        </div>
      </div>
    </>
  );
}
