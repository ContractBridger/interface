"use client";
import CompileContractStepView from "@/components/CompileContractStepView";
import ContractDetailsStepView from "@/components/ContractDetailsStepView";
import ResultStepView from "@/components/ResultStepView";
import { SourceInfoStepView } from "@/components/SourceInfoStepView";
import StepperComponent from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { step } from "@material-tailwind/react";
import { useState } from "react";

type STEP = 0 | 1 | 2 | 3;

const PageView = () => {
  const [activeStep, setActiveStep] = useState<STEP>(0);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);

  const handleNext = () =>
    !isLastStep && setActiveStep((cur) => (cur + 1) as STEP);
  const handlePrev = () =>
    !isFirstStep && setActiveStep((cur) => (cur - 1) as STEP);

  const getActiveStepView = (step: STEP) => {
    switch (step) {
      case 0:
        return <SourceInfoStepView />;
      case 1:
        return <ContractDetailsStepView />;
      case 2:
        return <CompileContractStepView />;
      case 3:
        return <ResultStepView />;
      default:
        return null;
    }
  };

  const acctiveStepView = getActiveStepView(activeStep);

  return (
    <section className="bg-primary flex flex-col items-center py-10 h-screen">
      <StepperComponent
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setIsFirstStep={setIsFirstStep}
        setIsLastStep={setIsLastStep}
      >
        {acctiveStepView}
        <StepperController
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </StepperComponent>
    </section>
  );
};

export default PageView;
