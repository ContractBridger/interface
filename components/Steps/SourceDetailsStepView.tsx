"use client";
import { Card, Input, Typography } from "@material-tailwind/react";
import SelectChainDropdown from "../SelectChainDropdown";

export const SourceDetailsStepView = () => {
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
            <Input crossOrigin="" label="Contract address" />
          </div>
          <div className="w-full sm:w-72">
            <SelectChainDropdown />
          </div>
        </div>
      </form>
    </Card>
  );
};
