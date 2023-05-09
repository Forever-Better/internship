import { FormItem, Input } from '@vkontakte/vkui';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { getFormFieldStatus } from '@/helpers/getFormFieldStatus';

interface PasswordFieldProps extends UseControllerProps<any> {
  strict?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps & React.HTMLProps<HTMLInputElement>> = ({
  strict = true,
  ...restProps
}) => {
  const {
    field,
    fieldState: { error, invalid, isDirty }
  } = useController({
    ...restProps,
    rules: strict
      ? {
          required: 'Введите пароль.',
          // pattern: {
          //   value: /^(?=.*[0-9])(?=.*[a-z])/,
          //   message: 'Должен содержать строчные буквы (a-z) и хотя бы одну цифру (0-9).'
          // },
          minLength: {
            value: 8,
            message: 'Минимум 8 символов.'
          },
          maxLength: {
            value: 32,
            message: 'Максимум 32 символов.'
          }
        }
      : { required: 'Введите пароль.' }
  });

  return (
    <FormItem bottom={error?.message} status={getFormFieldStatus(invalid, isDirty)} top='Пароль'>
      {' '}
      <Input type='password' {...field} />
    </FormItem>
  );
};

export default PasswordField;
