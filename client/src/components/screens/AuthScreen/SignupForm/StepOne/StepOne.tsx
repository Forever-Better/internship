import { Button } from '@vkontakte/vkui';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { getPublicUrl } from '@/helpers/getPublicUrl';
import type { SignupFormFields } from '@/types/signup-form-fields.interface';

import EmailField from '../../Fields/EmailField';
import PasswordField from '../../Fields/PasswordField';

import styles from './StepOne.module.scss';

const StepOne: React.FC<{ setStep: React.Dispatch<React.SetStateAction<number>> }> = ({ setStep }) => {
  const {
    control,
    formState: { isValid }
  } = useFormContext<SignupFormFields>();

  return (
    <div className={styles.root}>
      <div className={styles.instructions}>
        <p className={styles.withEmail}>С помощью электронной почты</p>
        <p>
          Уже есть учетная запись? <Link to={getPublicUrl.login()}>Войти</Link>
        </p>
      </div>
      <form className={styles.emailForm}>
        <div className={styles.fields}>
          <EmailField control={control} name='email' />
          <PasswordField control={control} name='password' />
        </div>
        <section className={styles.submit}>
          <Button disabled={!isValid} size='m' onClick={() => setStep(2)}>
            Продолжить
          </Button>
        </section>
      </form>
    </div>
  );
};

export default StepOne;
