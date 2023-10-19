"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useAccount, useNetwork, useConfig, useSwitchNetwork } from "wagmi";

export const ChainDropdown = () => {
  const network = useNetwork();
  return (
    <div className="w-72">
      <Select label="Select Chain">
        {network.chains.map((chain) => (
          <Option key={chain.id}>{chain.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export const SourceInfoStepView = () => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Provide source information
      </Typography>
      <Typography color="blue-gray">
        Select the source chain and provide the address of the contract to
        deploy to another chain
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex justify-start items-center gap-6">
          <div className="w-72">
            <Input crossOrigin="" label="Contract address" />
          </div>
          <div className="w-72">
            <ChainDropdown />
          </div>
        </div>
      </form>
    </Card>
  );
};
