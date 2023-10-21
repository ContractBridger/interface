"use client";
import { Card, Input, Typography } from "@material-tailwind/react";
import SelectChainDropdown from "../SelectChainDropdown";
import { FC, useCallback } from "react";

export const SourceDetailsStepView: FC<{
  contractAddress: string;
  handleChange: (key: "contractAddress" | "chain", value: string) => void;
}> = ({ contractAddress, handleChange }) => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Provide source information
      </Typography>
      <Typography color="blue-gray">
        Select the source chain and provide the address of the contract to
        deploy to another chain
      </Typography>
      <form className="mt-8 mb-2 w-full">
        <div className="mb-4 flex flex-col sm:flex-row justify-start gap-6">
          <div className="w-full sm:w-72">
            <Input
              crossOrigin=""
              label="Contract address"
              value={contractAddress}
              onChange={(e) => handleChange("contractAddress", e.target.value)}
            />
          </div>
          <div className="w-full sm:w-72">
            <SelectChainDropdown
              handleChange={(chain) => handleChange("chain", chain)}
            />
          </div>
        </div>
      </form>
    </Card>
  );
};
