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
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

const ChainDropdown = () => {
  const chains = ["mainnet", "sepola", "bsc", "bsc testnet"];
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        <Button
          variant="text"
          className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
        >
          {chains[0]}{" "}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="hidden overflow-visible lg:block">
        <ul className="flex w-full flex-col gap-1">
          {chains.map((item, index) => (
            <a href="#" key={index}>
              <MenuItem>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  {item}
                </Typography>
              </MenuItem>
            </a>
          ))}
        </ul>
      </MenuList>
    </Menu>
  );
};

export const StepOne = () => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Provide source information
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex justify-start gap-6">
          <div className="w-72">
            <Input crossOrigin="" label="Contract address" />
          </div>
          <ChainDropdown />
          {/* <Input size="lg" label="Contract Address" /> */}
        </div>
      </form>
    </Card>
  );
};
