import { FormItem, Input } from '@vkontakte/vkui';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { getFormFieldStatus } from '@/helpers/getFormFieldStatus';

interface EmailFieldProps extends UseControllerProps<any> {
  strict?: boolean;
}

const EmailField: React.FC<EmailFieldProps & React.HTMLProps<HTMLInputElement>> = ({ strict = true, ...props }) => {
  const {
    field,
    fieldState: { error, invalid, isDirty }
  } = useController({
    ...props,
    rules: strict
      ? {
          required: 'Введите адрес электронной почты.',
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?!.* ).{8,16}$/,
            message: 'Введите email'
          },
          minLength: {
            value: 5,
            message: 'Минимум 5 символов.'
          },
          maxLength: {
            value: 32,
            message: 'Максимум 32 символa.'
          }
        }
      : {
          required: 'Введите адрес электронной почты.'
        }
  });

  return (
    <FormItem
      bottom={error?.message}
      cellPadding={0}
      status={getFormFieldStatus(invalid, isDirty)}
      top='Адрес электронной почты'
    >
      <Input {...field} />
    </FormItem>
  );
};

export default EmailField;
