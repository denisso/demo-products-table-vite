import React from 'react';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import clsx from 'clsx';
import type { Color } from '@/shared/types';

export type FieldRenderProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name: string;
  id: string;
  color: Color;
  ref: React.RefCallback<HTMLInputElement>; // для прямого доступа к элементу
};

interface FormFieldProps<TFormData extends FieldValues> {
  label: string;
  isLabelMuted?: boolean;
  name: Path<TFormData>;
  control: Control<TFormData>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // можно вызывать с новым значением
  required?: boolean | string;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  color?: Color;
  render: (fieldProps: FieldRenderProps) => React.ReactElement;
}

const requiredMessage = {
  required: 'Обязательное поле',
};

export function FormField<TFormData extends FieldValues>({
  label,
  name,
  control,
  onChange,
  required = false,
  render,
  layout = 'vertical',
  className,
  isLabelMuted,
  color,
}: FormFieldProps<TFormData>) {
  const uniqueId = React.useId();
  const id = `${String(name)}-${uniqueId}`;
  const rules = required ? requiredMessage : {};

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        // Объединяем внешний onChange и field.onChange
        const handleChange = (
          eventOrValue: React.ChangeEvent<HTMLInputElement>,
        ) => {
          // Передаём значение в react-hook-form
          field.onChange(eventOrValue);
          // Если передан внешний обработчик, вызываем его с новым значением
          if (onChange) {
            onChange(eventOrValue);
          }
        };

        const finalColor: Color = fieldState.error
          ? 'error'
          : color
            ? color
            : 'neutral';

        const fieldProps: FieldRenderProps = {
          ref: field.ref,
          name: field.name,
          value: field.value ?? '', // field.value гарантированно строка
          onChange: handleChange,
          onBlur: field.onBlur,
          id,
          color: finalColor,
        };

        const Input = render(fieldProps);
        const labelClass = 'font-medium no-interaction';

        return (
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
              {fieldState.error && (
                <p className='label text-error'>{fieldState.error.message}</p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
