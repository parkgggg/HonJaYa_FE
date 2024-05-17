"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1 from '../../_components/signupsteps/Step1';
import Step2 from '../../_components/signupsteps/Step2';
// import Step3 from '../../_components/signupsteps/Step3';

export default function SignupPage() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {/* {step === 3 && <Step3 prevStep={prevStep} />} */}
    </div>
  );
}