import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SignupFormFields } from '@/types/signup-form-fields.interface';

import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';

const SignupForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const methods = useForm<SignupFormFields>({
    mode: 'onTouched'
  });

  return (
    <FormProvider {...methods}>
      {step === 1 ? <StepOne setStep={setStep} /> : step === 2 && <StepTwo setStep={setStep} />}
    </FormProvider>
  );
};

export default SignupForm;
