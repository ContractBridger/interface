"use client";
import { Button } from "@material-tailwind/react";
import React, { FC, useCallback, useMemo } from "react";
import { STEP } from "./PageView";

const StepperController: FC<{
  activeStep: STEP;
  isFirstStep: boolean;
  isLastStep: boolean;
  handlePrev: () => void;
  actionHandler: () => Promise<void>;
}> = ({ activeStep, isFirstStep, isLastStep, handlePrev, actionHandler }) => {
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
        <Button onClick={actionHandler} disabled={isLastStep}>
          {nextButtonText}
        </Button>
      )}
    </div>
  );
};

export default StepperController;
