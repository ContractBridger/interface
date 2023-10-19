"use client";
import { Button } from "@material-tailwind/react";
import React, { FC, useMemo } from "react";
import { STEP } from "./PageView";

const StepperController: FC<{
  activeStep: STEP;
  isFirstStep: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handlePrev: () => void;
}> = ({ activeStep, isFirstStep, isLastStep, handleNext, handlePrev }) => {
  const nextButtonText = useMemo(() => {
    switch (activeStep) {
      case 0:
        return "Pull Contract";
      case 1:
        return "Compile Contract";
      case 2:
        return "Deploy Contract";
      default:
        return null;
    }
  }, [activeStep]);
  return (
    <div className="mt-8 flex justify-between">
      <Button onClick={handlePrev} disabled={isFirstStep}>
        Prev
      </Button>
      {!isLastStep && (
        <Button onClick={handleNext} disabled={isLastStep}>
          {nextButtonText}
        </Button>
      )}
    </div>
  );
};

export default StepperController;
