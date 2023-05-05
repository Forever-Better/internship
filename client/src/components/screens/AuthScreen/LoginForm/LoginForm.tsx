import { Button, FormStatus } from '@vkontakte/vkui';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useLoginMutation } from '@/services/auth/auth.service';
import type { LoginFormFields } from '@/types/login-form-fields.interface';

import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const navigate = useNavigate();

  const [login, { error, isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormFields>({
    mode: 'all'
  });

  const onSubmit = handleSubmit((formData: LoginFormFields) => {
    login(formData)
      .unwrap()
      .then(() => navigate(getPublicUrl.feed()));
  });

  return (
    <div className={styles.root}>
      <h1 className='font-medium'>Войти</h1>{' '}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.content}>
          <p className={styles.instructions}>
            Новый пользователь? <Link to={getPublicUrl.signup()}>Создать учетную запись</Link>
          </p>
          <div className={styles.fields}>
            <EmailField control={control} disabled={isLoading} name='email' strict={false} />
            <PasswordField control={control} disabled={isLoading} name='password' strict={false} />
          </div>
          {error && <FormStatus mode='error'>Неверные данные для входа.</FormStatus>}
        </div>
        <div className={styles.submit}>
          <Button disabled={isLoading} loading={isLoading} size='m' type='submit'>
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
