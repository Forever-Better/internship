import { FormItem, Input } from '@vkontakte/vkui';
import type { UseControllerProps } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { getFormFieldStatus } from '@/helpers/getFormFieldStatus';
import type { SignupFormFields } from '@/types/signup-form-fields.interface';

const LastNameField: React.FC<UseControllerProps<SignupFormFields> & React.HTMLProps<HTMLInputElement>> = (props) => {
  const {
    field,
    fieldState: { error, invalid, isDirty }
  } = useController({
    ...props,
    rules: {
      required: 'Введите фамилию.',
      minLength: {
        value: 3,
        message: 'Минимум 3 символа.'
      },
      maxLength: {
        value: 22,
        message: 'Максимум 22 символа.'
      }
    }
  });

  return (
    <FormItem bottom={error?.message} status={getFormFieldStatus(invalid, isDirty)} top='Фамилия'>
      <Input {...field} />
    </FormItem>
  );
};

export default LastNameField;
