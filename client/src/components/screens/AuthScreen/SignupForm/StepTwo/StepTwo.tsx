import { Button, FormStatus } from '@vkontakte/vkui';
import { useFormContext } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import { useSignupMutation } from '@/services/auth/auth.service';
import type { SignupData } from '@/store/user/user.interface';

import FirstNameField from '../../Fields/FirstName';
import LastNameField from '../../Fields/LastName';

import styles from './StepTwo.module.scss';

const SecondStep: React.FC = () => {
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
    <div className={styles.root}>
      <div className={styles.instructions}>
        <p>
          Уже есть учетная запись? <Link to={getPublicUrl.login()}>Войти</Link>
        </p>
      </div>
      <form className={styles.emailForm} onSubmit={onSubmit}>
        <div className={styles.fields}>
          <FirstNameField control={control} disabled={isLoading} name='firstName' />
          <LastNameField control={control} disabled={isLoading} name='lastName' />
          {error && <FormStatus mode='error'>{String(error)}</FormStatus>}
        </div>
        <section className={styles.submit}>
          <Button disabled={isLoading || !isValid} loading={isLoading} size='m' type='submit'>
            Создать
          </Button>
        </section>
      </form>
    </div>
  );
};

export default SecondStep;
