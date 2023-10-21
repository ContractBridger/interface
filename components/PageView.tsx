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
  const network = useNetwork();
  const chainIsUnsupported = network.chain?.unsupported;

  let currentChainId = network.chain?.id;
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

  const [sendingRequest, setSendingRequest] = useState(false);

  const [constructorArgs, setConstructorArgs] =
    useState<Dictionary<string> | null>({
      fee: "100",
      admin: "0x23e34",
    });

  const [sourceContractAddress, setSourceContractAddress] =
    useState<string>("");

  const [deploymentReceipt, setDeploymentReceipt] =
    useState<ContractTransactionReceipt | null>(null);

  const handleContructorArgsChange = (key: string, value: string) => {
    setConstructorArgs((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () =>
    !isLastStep && setActiveStep((cur) => (cur + 1) as STEP);
  const handlePrev = () =>
    !isFirstStep && setActiveStep((cur) => (cur - 1) as STEP);

  const pullContract = useCallback(async () => {
    if (!isAddress(sourceContractAddress)) {
      toast.error("Please provide a valid contract address");
      return;
    }

    if (chainIsUnsupported) {
      toast.error("Please switch to one of the supported chain");
      return;
    }

    try {
      // check that the provided address is not an EOA
      const code = await provider.getCode(sourceContractAddress);
      if (code === "0x") {
        toast.error(
          `Address provided is not a contract address on ${network.chain.name} network`,
        );
        return;
      }

      setSendingRequest(true);

      // make request to the server to fetch the contract details
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: sourceContractAddress,
          networkId: currentChainId,
        }),
      };
      const response = await fetch(`${SERVER_URL}/pull-contract`, options);
      let data = await response.json();

      if (data === "SOURCE_CODE_NOT_FOUND") {
        toast.error("Could not find source code for unverified contract!");
        return;
      }
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
    } finally {
      setSendingRequest(false);
    }
  }, [sourceContractAddress, chainIsUnsupported, provider]);

  const compileContract = useCallback(async () => {
    if (!contractData) {
      toast.error("No contract pulled yet!");
      return;
    }

    try {
      setSendingRequest(true);
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
      toast.error(error.message || "error compiling contract!!!");
      return;
    } finally {
      setSendingRequest(false);
    }
  }, [contractData]);

  const deployContract = useCallback(async () => {
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
      setSendingRequest(true);

      const deploymentTransactionReceipt = await baseContract
        .deploymentTransaction()
        .wait();

      setDeploymentReceipt(deploymentTransactionReceipt);

      if (deploymentTransactionReceipt.status === 1) {
        toast.success("Contract deployment successfull!");
      } else {
        toast.error("Contract deployment failed!");
      }
      handleNext();
    } catch (error) {
      if (error.info.error.code === 4001) {
        toast.error("User denied transaction signature.");
      } else {
        console.error("error: ", error);
        toast.error("An error occured! check the console for more info");
      }
      return;
    } finally {
      setSendingRequest(false);
    }
  }, [compiledContract, account, signer]);

  const getActiveStepView = (step: STEP) => {
    switch (step) {
      case 0:
        return (
          <SourceDetailsStepView
            contractAddress={sourceContractAddress}
            handleChange={setSourceContractAddress}
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
  }, [activeStep, pullContract, compileContract, deployContract]);

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
          sendingRequest={sendingRequest}
        />
      </StepperComponent>
    </section>
  );
};

export default PageView;
