import { FormItem, Input } from '@vkontakte/vkui';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { getFormFieldStatus } from '@/helpers/getFormFieldStatus';
import type { SignupFormFields } from '@/types/signup-form-fields.interface';

const FirstNameField: React.FC<UseControllerProps<SignupFormFields> & React.HTMLProps<HTMLInputElement>> = (props) => {
  const {
    field,
    fieldState: { error, invalid, isDirty }
  } = useController({
    ...props,
    rules: {
      required: 'Введите имя.',
      minLength: {
        value: 3,
        message: 'Минимум 3 символа.'
      },
      maxLength: {
        value: 16,
        message: 'Максимум 16 символов.'
      }
    }
  });

  return (
    <FormItem bottom={error?.message} status={getFormFieldStatus(invalid, isDirty)} top='Имя'>
      <Input {...field} />
    </FormItem>
  );
};

export default FirstNameField;
