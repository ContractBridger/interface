"use client";
import ContractBytecodeStepView from "@/components/Steps/ContractBytecodeStepView";
import ContractDetailsStepView from "@/components/Steps/ContractDetailsStepView";
import DeploymentResultStepView from "@/components/Steps/DeploymentResultStepView";
import { SourceDetailsStepView } from "@/components/Steps/SourceDetailsStepView";
import StepperComponent from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { useCallback, useState } from "react";
import { useNetwork } from "wagmi";

export type STEP = 0 | 1 | 2 | 3;
export interface Dictionary<T> {
  [key: string]: T;
}

const PageView = () => {
  const [activeStep, setActiveStep] = useState<STEP>(0);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);
  const network = useNetwork();

  const [sourceInfo, setSourceInfo] = useState<{
    contractAddress: string;
    chain: number | null;
  }>({
    contractAddress: "",
    chain: null,
  });

  const [contractDetails, setConstractDetails] = useState<{
    data: object;
    constructorAgs: Dictionary<string>;
  }>({
    data: null,
    constructorAgs: {},
  });

  const handleSourceInfoChain = useCallback(
    (
      key: keyof typeof sourceInfo,
      value:
        | (typeof sourceInfo)["contractAddress"]
        | (typeof sourceInfo)["chain"],
    ) => {
      switch (key) {
        case "contractAddress":
          return setSourceInfo((prev) => ({
            ...prev,
            contractAddress: value as (typeof sourceInfo)["contractAddress"],
          }));
        case "chain":
          return setSourceInfo((prev) => ({
            ...prev,
            chain: value as (typeof sourceInfo)["chain"],
          }));
        default:
          break;
      }
    },
    [],
  );

  const handleNext = () =>
    !isLastStep && setActiveStep((cur) => (cur + 1) as STEP);
  const handlePrev = () =>
    !isFirstStep && setActiveStep((cur) => (cur - 1) as STEP);

  const pullContract = useCallback(() => {}, []);

  const compileContract = useCallback(() => {}, []);

  const deployContract = useCallback(() => {}, []);

  const getActiveStepView = (step: STEP) => {
    switch (step) {
      case 0:
        return (
          <SourceDetailsStepView
            {...sourceInfo}
            handleChange={handleSourceInfoChain}
          />
        );
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
