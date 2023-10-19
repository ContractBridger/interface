import { Option, Select } from "@material-tailwind/react";
import React from "react";
import { useNetwork } from "wagmi";

const SelectChainDropdown = () => {
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

export default SelectChainDropdown;
