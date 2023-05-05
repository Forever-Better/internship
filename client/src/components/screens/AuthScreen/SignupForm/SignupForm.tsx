import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SignupFormFields } from '@/types/signup-form-fields.interface';

import styles from './SignupForm.module.scss';
import FirstStep from './StepOne/StepOne';
import SecondStep from './StepTwo/StepTwo';
import StepsIndicator from './StepsIndicator/StepsIndicator';

const SignupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<SignupFormFields>({
    mode: 'onTouched'
  });

  return (
    <div className={styles.root}>
      <StepsIndicator step={step} />
      <h1 className='text-[32px] font-medium'>Создать аккаунт</h1>
      <FormProvider {...methods}>
        {' '}
        {step === 1 ? <FirstStep setStep={setStep} /> : step === 2 && <SecondStep />}
      </FormProvider>
    </div>
  );
};

export default SignupForm;
