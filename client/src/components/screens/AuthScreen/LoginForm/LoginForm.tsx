import { Icon20ArrowRightOutline } from '@vkontakte/icons';
import { Button, FormStatus, Separator, Spacing } from '@vkontakte/vkui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useLoginMutation } from '@/services/auth/auth.service';
import type { LoginFormFields } from '@/types/login-form-fields.interface';

import Brand from '../Brand/Brand';
import EmailField from '../Fields/EmailField';
import PasswordField from '../Fields/PasswordField';

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
    <div className='auth-form-root'>
      <Brand />
      <form className='auth-form' onSubmit={onSubmit}>
        <div className='auth-form-fields'>
          <EmailField control={control} disabled={isLoading} name='email' strict={false} />
          <PasswordField control={control} disabled={isLoading} name='password' strict={false} />
        </div>
        {error && <FormStatus mode='error'>Неверные данные для входа.</FormStatus>}
        <Button stretched disabled={isLoading} loading={isLoading} size='l' type='submit'>
          Войти
        </Button>
      </form>
      <Spacing size={12}>
        <Separator />
      </Spacing>
      <Button
        appearance='positive'
        className='auth-form-create-button'
        size='l'
        onClick={() => navigate(getPublicUrl.signup())}
      >
        <div className='auth-form-create-button-label'>
          Создать аккаунт <Icon20ArrowRightOutline />
        </div>
      </Button>
    </div>
  );
};

export default LoginForm;
