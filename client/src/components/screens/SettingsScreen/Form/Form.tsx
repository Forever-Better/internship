import { Button, FormItem, FormLayoutGroup, FormStatus, Input, Spacing } from '@vkontakte/vkui';
import { useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';

import { getFormFieldStatus } from '@/helpers/getFormFieldStatus';
import { useUpdateMeMutation } from '@/services/user/user.service';
import { ProfileForm } from '@/types/enums';
import type { UpdateProfileFormFields } from '@/types/update-profile-form-fields.interface';
import type { User } from '@/types/user.interface';

import styles from './Form.module.scss';
import ImageUploadBlock from './ImageUploadBlock/ImageUploadBlock';

const Form: React.FC<{ data: User }> = ({ data }) => {
  const [updateMe, { isLoading, isSuccess }] = useUpdateMeMutation();
  const methods = useForm<UpdateProfileFormFields>({
    defaultValues: {
      image: data?.image,
      status: data?.status,
      firstName: data?.firstName,
      lastName: data?.lastName,
      age: data?.age,
      city: data?.city,
      university: data?.university
    }
  });

  const { field: statusField } = useController<UpdateProfileFormFields>({
    name: ProfileForm.STATUS,
    control: methods.control
  });
  const { field: firstNameField, fieldState: firstNameFieldState } = useController<UpdateProfileFormFields>({
    name: ProfileForm.FIRSTNAME,
    control: methods.control,
    rules: { required: 'Обязательное поле', minLength: { value: 3, message: 'Минимум 3 символа' } }
  });
  const { field: lastNameField, fieldState: lastNameFieldState } = useController<UpdateProfileFormFields>({
    name: ProfileForm.LASTNAME,
    control: methods.control,
    rules: { required: 'Обязательное поле', minLength: { value: 3, message: 'Минимум 3 символа' } }
  });
  const { field: universityField } = useController<UpdateProfileFormFields>({
    name: ProfileForm.UNIVERSITY,
    control: methods.control
  });
  const { field: ageField } = useController<UpdateProfileFormFields>({
    name: ProfileForm.AGE,
    control: methods.control
  });
  const { field: cityField } = useController<UpdateProfileFormFields>({
    name: ProfileForm.CITY,
    control: methods.control
  });
  const [image, setImage] = useState(data?.image);

  const onSubmit = methods.handleSubmit((data) => {
    updateMe(data);
  });

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit}>
        {isSuccess && (
          <FormStatus className={styles.positiveStatus} header='Изменения сохранены'>
            <div className={styles.content}>
              <span>Новые данные будут отражены на вашей странице.</span>
            </div>
          </FormStatus>
        )}
        <Spacing size={32} />
        <FormProvider {...methods}>
          <ImageUploadBlock image={image} setImage={setImage} />
          <FormItem top='Статус'>
            <Input {...statusField} />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem
              // bottom={firstNameFieldState.error?.message}
              // status={getFormFieldStatus(firstNameFieldState.invalid, firstNameFieldState.isDirty)}
              top='Имя'
            >
              <Input
                // status={getFormFieldStatus(firstNameFieldState.invalid, firstNameFieldState.isDirty)}
                {...firstNameField}
              />
            </FormItem>
            <FormItem
              // bottom={lastNameFieldState.error?.message}
              // status={getFormFieldStatus(lastNameFieldState.invalid, lastNameFieldState.isDirty)}
              top='Фамилия'
            >
              <Input
                // status={getFormFieldStatus(lastNameFieldState.invalid, lastNameFieldState.isDirty)}
                {...lastNameField}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem top='Университет'>
            <Input {...universityField} />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Возраст'>
              <Input {...ageField} />
            </FormItem>
            <FormItem top='Город'>
              <Input {...cityField} />
            </FormItem>
          </FormLayoutGroup>
        </FormProvider>
        <Spacing size={32} />
        <Button disabled={!methods.formState.isValid || isLoading} loading={isLoading} size='l' type='submit'>
          Обновить
        </Button>
      </form>
    </div>
  );
};

export default Form;
