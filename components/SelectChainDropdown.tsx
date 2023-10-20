import { Option, Select } from "@material-tailwind/react";
import React, { FC } from "react";
import { useNetwork } from "wagmi";

const SelectChainDropdown: FC<{
  selectedChain: number;
  handleChange: (chain: any) => void;
}> = ({ selectedChain, handleChange }) => {
  const network = useNetwork();
  return (
    <Select label="Select Chain" onChange={handleChange}>
      {network.chains.map((chain) => (
        <Option key={chain.id}>{chain.name}</Option>
      ))}
    </Select>
  );
};

export default SelectChainDropdown;
