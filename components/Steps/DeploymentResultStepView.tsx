"use client";
import { Card, Typography } from "@material-tailwind/react";
import React from "react";

const DeploymentResultStepView = () => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Deployment Result
      </Typography>
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col mb-4">
          <span className="text-sm">Status</span>
          <span>Success</span>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-sm">Transaction Hash</span>
          <a
            href="https://etherscan.io/tx/0x5b73e239c55d790e3c9c3bbb84092652db01bb8dbf49ccc9e4a318470419d9a0"
            target="_blank"
          >
            0x5b73e239c55d790e3c9c3bbb84092652db01bb8dbf49ccc9e4a318470419d9a0
          </a>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-sm">Deployed address</span>
          <span>0x543b4b074CC6313ef811F4c300166cb1e81567DE</span>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-sm">Deployer</span>
          <span>0xd5E4484326EB3Dd5FBbd5Def6d02aFE817fD4684</span>
        </div>

        <div className="flex flex-col mb-4">
          <span className="text-sm">Explorer Link</span>
          <a
            href="https://etherscan.io/address/0x5e227ad1969ea493b43f840cff78d08a6fc17796"
            target="_blank"
          >
            0x5e22...7796
          </a>
        </div>
      </div>
    </Card>
  );
};

export default DeploymentResultStepView;
