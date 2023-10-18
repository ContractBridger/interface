import CompileContractStepView from "@/components/CompileContractStepView";
import ContractDetailsStepView from "@/components/ContractDetailsStepView";
import ResultStepView from "@/components/ResultStepView";
import { SourceInfoStepView } from "@/components/SourceInfoStepView";
import StepperComponent from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { Metadata } from "next";
import { useState } from "react";
export const metadata: Metadata = {
  title: "Contract Bridger",
  description:
    "a tool for taking a contract already existing on one chain and deploying it to another chain",
  icons: {
    icon: "images/icon.png",
  },
};

export default function Home() {
  return (
    <section className="bg-primary flex flex-col items-center py-10 h-screen">
      <StepperComponent>
        <SourceInfoStepView />
        {/* <ContractDetailsStepView /> */}
        {/* <CompileContractStepView /> */}
        {/* <ResultStepView /> */}
        <StepperController />
      </StepperComponent>
    </section>
  );
}
