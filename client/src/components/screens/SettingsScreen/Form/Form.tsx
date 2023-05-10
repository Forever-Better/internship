import { Button, FormItem, FormLayoutGroup, FormStatus, Input, Spacing } from '@vkontakte/vkui';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

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
  const [image, setImage] = useState(data?.image);

  const { control } = methods;

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
            <Controller control={control} name={ProfileForm.STATUS} render={({ field }) => <Input {...field} />} />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Имя *'>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => <Input {...field} />}
                rules={{ required: true, minLength: 3 }}
              />
            </FormItem>
            <FormItem top='Фамилия *'>
              <Controller
                control={control}
                name={ProfileForm.LASTNAME}
                render={({ field }) => <Input {...field} />}
                rules={{ required: true, minLength: 3 }}
              />
            </FormItem>
          </FormLayoutGroup>
          <FormItem top='Университет'>
            <Controller control={control} name='university' render={({ field }) => <Input {...field} />} />
          </FormItem>
          <FormLayoutGroup mode='horizontal'>
            <FormItem top='Возраст *'>
              <Controller
                control={control}
                name='age'
                render={({ field }) => <Input {...field} />}
                rules={{ required: true }}
              />
            </FormItem>
            <FormItem top='Город'>
              <Controller control={control} name='city' render={({ field }) => <Input {...field} />} />
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
