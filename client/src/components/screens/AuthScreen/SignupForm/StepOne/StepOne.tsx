import { Icon20ArrowLeftOutline } from '@vkontakte/icons';
import { Button, Separator, Spacing } from '@vkontakte/vkui';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { SignupFormFields } from '@/types/signup-form-fields.interface';

import Brand from '../../Brand/Brand';
import EmailField from '../../Fields/EmailField';
import PasswordField from '../../Fields/PasswordField';

const StepOne: React.FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { isValid }
  } = useFormContext<SignupFormFields>();

  return (
    <div className='auth-form-root'>
      <Brand />
      <form className='auth-form'>
        <div className='auth-form-fields'>
          <EmailField control={control} name='email' />
          <PasswordField control={control} name='password' />
        </div>
        <Button stretched disabled={!isValid} size='l' onClick={() => setStep(2)}>
          Продолжить
        </Button>
      </form>
      <Spacing size={12}>
        <Separator />
      </Spacing>
      <Button
        appearance='neutral'
        className='auth-form-create-button'
        size='l'
        onClick={() => navigate(getPublicUrl.login())}
      >
        <div className='auth-form-create-button-label'>
          <Icon20ArrowLeftOutline />
          Войти
        </div>
      </Button>
    </div>
  );
};

export default StepOne;
