"use client";
import React, { FC, ReactNode } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const StepperComponent: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  return (
    <div className="w-full py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal md:hidden"
            >
              step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal hidden md:block"
            >
              source details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal md:hidden"
            >
              step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal hidden md:block"
            >
              contract details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal md:hidden"
            >
              step 3
            </Typography>
            <Typography
              color={activeStep === 2 ? "blue-gray" : "gray"}
              className="font-normal hidden md:block"
            >
              Contract bytecode
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[2rem] w-max text-center">
            <Typography
              color={activeStep === 3 ? "blue-gray" : "gray"}
              className="font-normal md:hidden"
            >
              step 4
            </Typography>
            <Typography
              color={activeStep === 3 ? "blue-gray" : "gray"}
              className="font-normal hidden md:block"
            >
              Result
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className="pt-32">{children}</div>
    </div>
  );
};

export default StepperComponent;
