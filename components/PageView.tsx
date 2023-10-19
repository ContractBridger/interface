"use client";
import ContractBytecodeStepView from "@/components/Steps/ContractBytecodeStepView";
import ContractDetailsStepView from "@/components/Steps/ContractDetailsStepView";
import DeploymentResultStepView from "@/components/Steps/DeploymentResultStepView";
import { SourceDetailsStepView } from "@/components/Steps/SourceDetailsStepView";
import StepperComponent from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { useState } from "react";

export type STEP = 0 | 1 | 2 | 3;

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
        return <SourceDetailsStepView />;
      case 1:
        return <ContractDetailsStepView />;
      case 2:
        return <ContractBytecodeStepView />;
      case 3:
        return <DeploymentResultStepView />;
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
          activeStep={activeStep}
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
