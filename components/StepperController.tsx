"use client";
import { Button } from "@material-tailwind/react";
import React, { FC } from "react";

const StepperController: FC<{
  isFirstStep: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handlePrev: () => void;
}> = ({ isFirstStep, isLastStep, handleNext, handlePrev }) => {
  return (
    <div className="mt-8 flex justify-between">
      <Button onClick={handlePrev} disabled={isFirstStep}>
        Prev
      </Button>
      <Button onClick={handleNext} disabled={isLastStep}>
        Next
      </Button>
    </div>
  );
};

export default StepperController;
