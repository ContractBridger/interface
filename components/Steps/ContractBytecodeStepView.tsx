"use client";
import { Card, Textarea, Typography } from "@material-tailwind/react";
import React, { FC, useState } from "react";
import SelectChainDropdown from "../SelectChainDropdown";
import { toast } from "react-toastify";
import { useSwitchNetwork } from "wagmi";
import {} from "@rainbow-me/rainbowkit";

const ContractBytecodeStepView: FC<{
  data: { bytecode: string; ABI: string };
}> = ({ data: { bytecode, ABI } }) => {
  const { chains, error, pendingChainId, switchNetwork, status } =
    useSwitchNetwork();
  if (!bytecode) {
    toast.error("no contract bytecode provided");
    return;
  }
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Contract Bytecode
      </Typography>
      <Typography color="blue-gray">
        Supply constructor argument (if any), select destination chain, and
        deploy
      </Typography>

      {/* <form className="mt-8 mb-4 w-full">
        <div className="mb-6 flex flex-wrap justify-start items-center gap-6">
          <div className="w-full sm:w-72">
            <Input
              crossOrigin=""
              size="md"
              label="Contract name"
              value={contractData.contractName}
              readOnly
            />
          </div>
          <div className="w-full sm:w-72">
            <Input
              crossOrigin=""
              size="md"
              label="Optimization used"
              value={contractData.runs}
              readOnly
            />
          </div>
        </div>
      </form>
      {!!constructorArgs ? (
        <Fragment>
          <Typography variant="h6" color="blue-gray">
            Constructor Arguments
          </Typography>
          <form className="mb-2 w-full">
            <div className="mb-4 flex flex-wrap justify-start items-center gap-4">
              {constructorArgsKeys.map((key) => (
                <div key={key} className="w-full sm:w-72">
                  <Input
                    crossOrigin=""
                    size="md"
                    label={key}
                    value={constructorArgs[key]}
                    onChange={(e) =>
                      handleContructorArgsChange(key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </form>
        </Fragment>
      ) : null} */}

      <div className="w-full mb-8">
        <Typography variant="lead" className="mb-2 text-base" color="blue-gray">
          Destination chain:
        </Typography>
        <div className="w-full sm:w-72">
          <SelectChainDropdown
            handleChange={(chain) => switchNetwork?.(chain)}
          />
        </div>
      </div>
      <div className="w-full">
        <Textarea
          className="h-[399px]"
          label="Byte Code"
          value={bytecode}
          readOnly
        />
      </div>
    </Card>
  );
};

export default ContractBytecodeStepView;
