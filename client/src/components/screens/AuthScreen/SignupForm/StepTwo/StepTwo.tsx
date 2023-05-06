import { Icon20ArrowLeftOutline } from '@vkontakte/icons';
import { Button, FormStatus, Separator, Spacing } from '@vkontakte/vkui';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useSignupMutation } from '@/services/auth/auth.service';
import type { SignupData } from '@/store/user/user.interface';

import Brand from '../../Brand/Brand';
import FirstNameField from '../../Fields/FirstName';
import LastNameField from '../../Fields/LastName';

const SecondStep: React.FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const navigate = useNavigate();
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useFormContext<SignupData>();

  const [signup, { error, isLoading }] = useSignupMutation();

  const onSubmit = handleSubmit((formData: SignupData) => {
    signup(formData)
      .unwrap()
      .then(() => {
        navigate(getPublicUrl.feed());
      });
  });

  return (
    <div className='auth-form-root'>
      <Brand />
      <form className='auth-form' onSubmit={onSubmit}>
        <div className='auth-form-fields'>
          <FirstNameField control={control} disabled={isLoading} name='firstName' />
          <LastNameField control={control} disabled={isLoading} name='lastName' />
          {error && <FormStatus mode='error'>{String(error)}</FormStatus>}
        </div>
        <Button
          stretched
          appearance='positive'
          disabled={isLoading || !isValid}
          loading={isLoading}
          size='l'
          type='submit'
        >
          Создать
        </Button>
      </form>
      <Spacing size={12}>
        <Separator />
      </Spacing>
      <Button appearance='neutral' className='auth-form-create-button' size='l' onClick={() => setStep(1)}>
        <div className='auth-form-create-button-label'>
          <Icon20ArrowLeftOutline />
          Назад
        </div>
      </Button>
    </div>
  );
};

export default SecondStep;
