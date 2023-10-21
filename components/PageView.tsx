"use client";
import ContractBytecodeStepView from "@/components/Steps/ContractBytecodeStepView";
import ContractDetailsStepView from "@/components/Steps/ContractDetailsStepView";
import DeploymentResultStepView from "@/components/Steps/DeploymentResultStepView";
import { SourceDetailsStepView } from "@/components/Steps/SourceDetailsStepView";
import StepperComponent from "@/components/Stepper";
import StepperController from "@/components/StepperController";
import { useCallback, useState } from "react";
import { ContractFactory, ContractTransactionReceipt, isAddress } from "ethers";
import { toast } from "react-toastify";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import { useEthersProvider, useEthersSigner } from "hooks/ethersAdapters";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export type STEP = 0 | 1 | 2 | 3;
export interface Dictionary<T> {
  [key: string]: T;
}

const PageView = () => {
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const account = useAccount();

  const [activeStep, setActiveStep] = useState<STEP>(0);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [isLastStep, setIsLastStep] = useState(false);
  const [contractData, setConstractData] = useState<{
    contractName: any;
    optimizationUsed: any;
    runs: string;
    sourceCode: any;
    fullSourceCodeString: string;
  } | null>(null);
  const [compiledContract, setCompiledContract] = useState<{
    bytecode: string;
    ABI: string;
  } | null>(null);

  const [constructorArgs, setConstructorArgs] =
    useState<Dictionary<string> | null>({
      fee: "100",
      admin: "0x23e34",
    });

  const [sourceInfo, setSourceInfo] = useState<{
    contractAddress: string;
    chain: String | null;
  }>({
    contractAddress: "",
    chain: null,
  });

  const [deploymentReceipt, setDeploymentReceipt] =
    useState<ContractTransactionReceipt | null>(null);

  const handleContructorArgsChange = (key: string, value: string) => {
    setConstructorArgs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSourceInfoChange = useCallback(
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

  const pullContract = async () => {
    if (!isAddress(sourceInfo.contractAddress)) {
      toast.error("Please provide a valid contract address");
      return;
    }

    if (!sourceInfo.chain) {
      toast.error("Please select chain");
      return;
    }

    try {
      // check that the provided address is not an EOA
      const code = await provider.getCode(sourceInfo.contractAddress);
      if (code === "0x") {
        toast.error("Address provided is not a contract address");
        return;
      }

      // make request to the server to fetch the contract details
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: sourceInfo.contractAddress,
          networkId: sourceInfo.chain,
        }),
      };
      const response = await fetch(`${SERVER_URL}/pull-contract`, options);
      let data = await response.json();
      let sourceCode;
      if (data.sourceCode.startsWith("{{")) {
        sourceCode = JSON.parse(data.sourceCode.slice(1, -1));
      } else {
        sourceCode = data.sourceCode;
      }

      const isObject = sourceCode?.sources;
      let fullSourceCodeString = "";

      if (isObject) {
        const contractKeys = Object.keys(sourceCode?.sources);

        contractKeys.forEach(
          (key) =>
            (fullSourceCodeString = fullSourceCodeString.concat(
              `\n${sourceCode?.sources[key].content}`,
            )),
        );
      } else {
        fullSourceCodeString = sourceCode;
      }

      data = {
        ...data,
        sourceCode,
        fullSourceCodeString: fullSourceCodeString,
      };

      setConstractData(data);

      toast.success("Contract found!");

      handleNext();
    } catch (error) {
      console.error("error: ", error);
      toast.error(error.message || "error pulling contract details");
      return;
    }
  };

  const compileContract = async () => {
    if (!contractData) {
      toast.error("No contract pulled yet!");
      return;
    }

    try {
      // make request to the server to compile the contract
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractName: contractData.contractName,
          sourceCode: contractData.fullSourceCodeString,
        }),
      };

      const response = await fetch(`${SERVER_URL}/compile-contract`, options);

      let data = await response.json();
      setCompiledContract(data);
      toast.success("Contract successfully compilled!");
      handleNext();
    } catch (error) {
      console.error("error: ", error);
      if (error.info.error.code === 4001) {
        toast.error(
          "MetaMask Tx Signature: User denied transaction signature.",
        );
      } else {
        toast.error("An error occured! check the console for more info");
      }
      return;
    }
  };

  const deployContract = async () => {
    if (!compiledContract) {
      toast.error("No contract to deploy");
      return;
    }
    if (!account.isConnected) {
      toast.error("Please connect to a wallet");
      return;
    }
    try {
      const contractFactory = new ContractFactory(
        compiledContract.ABI,
        compiledContract.bytecode,
        signer,
      );

      const baseContract = await contractFactory.deploy();

      const deploymentTransactionReceipt = await baseContract
        .deploymentTransaction()
        .wait();

      setDeploymentReceipt(deploymentTransactionReceipt);

      if (deploymentTransactionReceipt.status === 1) {
        toast.success("Contract deployment successfull!");
      } else {
        if (deploymentTransactionReceipt.status === 1) {
          toast.error("Contract deployment failed!");
        }
      }
      handleNext();
    } catch (error) {
      console.error("error: ", error);
      if (error.info.error.code === 4001) {
        toast.error("User denied transaction signature.");
      } else {
        toast.error("An error occured! check the console for more info");
      }
      return;
    }
  };

  const getActiveStepView = (step: STEP) => {
    switch (step) {
      case 0:
        return (
          <SourceDetailsStepView
            {...sourceInfo}
            handleChange={handleSourceInfoChange}
          />
        );
      case 1:
        return (
          <ContractDetailsStepView
            contractData={contractData}
            constructorArgs={constructorArgs}
            handleContructorArgsChange={handleContructorArgsChange}
          />
        );
      case 2:
        return <ContractBytecodeStepView data={compiledContract} />;
      case 3:
        return <DeploymentResultStepView data={deploymentReceipt} />;
      default:
        return null;
    }
  };

  const getStepHandler = useCallback(() => {
    switch (activeStep) {
      case 0:
        return pullContract;
      case 1:
        return compileContract;
      case 2:
        return deployContract;
      default:
        break;
    }
  }, [activeStep, sourceInfo]);

  const activeStepView = getActiveStepView(activeStep);

  return (
    <section className="bg-primary flex flex-col items-center py-10 h-screen">
      <StepperComponent
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        setIsFirstStep={setIsFirstStep}
        setIsLastStep={setIsLastStep}
      >
        {activeStepView}
        <StepperController
          activeStep={activeStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          handlePrev={handlePrev}
          actionHandler={getStepHandler()}
        />
      </StepperComponent>
    </section>
  );
};

export default PageView;
