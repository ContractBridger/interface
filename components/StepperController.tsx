"use client";
import { Button } from "@material-tailwind/react";
import React from "react";

const StepperController = () => {
  return (
    <div className="mt-8 flex justify-between">
      <Button
      //   onClick={handlePrev} disabled={isFirstStep}
      >
        Prev
      </Button>
      <Button
      //   onClick={handleNext} disabled={isLastStep}
      >
        Next
      </Button>
    </div>
  );
};

export default StepperController;
