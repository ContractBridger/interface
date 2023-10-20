import { Option, Select } from "@material-tailwind/react";
import React, { FC } from "react";
import { useNetwork } from "wagmi";

const SelectChainDropdown: FC<{
  handleChange: (chain: any) => void;
}> = ({ handleChange }) => {
  const network = useNetwork();
  return (
    <Select label="Select Chain" onChange={handleChange}>
      {network.chains.map((chain) => (
        <Option key={chain.id} value={String(chain.id)}>
          {chain.name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectChainDropdown;
