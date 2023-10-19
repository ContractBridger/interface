"use client";
import { Card, Input, Typography } from "@material-tailwind/react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

const contracttemplate = `/**
*Submitted for verification at Etherscan.io on 2019-11-14
*/

// hevm: flattened sources of /nix/store/im7ll7dx8gsw2da9k5xwbf8pbjfli2hc-multicall-df1e59d/src/Multicall.sol
pragma solidity >=0.5.0;
pragma experimental ABIEncoderV2;

////// /nix/store/im7ll7dx8gsw2da9k5xwbf8pbjfli2hc-multicall-df1e59d/src/Multicall.sol
/* pragma solidity >=0.5.0; */
/* pragma experimental ABIEncoderV2; */

/// @title Multicall - Aggregate results from multiple read-only function calls
/// @author Michael Elliot <mike@makerdao.com>
/// @author Joshua Levine <joshua@makerdao.com>
/// @author Nick Johnson <arachnid@notdot.net>

contract Multicall {
   struct Call {
       address target;
       bytes callData;
   }
   function aggregate(Call[] memory calls) public returns (uint256 blockNumber, bytes[] memory returnData) {
       blockNumber = block.number;
       returnData = new bytes[](calls.length);
       for(uint256 i = 0; i < calls.length; i++) {
           (bool success, bytes memory ret) = calls[i].target.call(calls[i].callData);
           require(success);
           returnData[i] = ret;
       }
   }
   // Helper functions
   function getEthBalance(address addr) public view returns (uint256 balance) {
       balance = addr.balance;
   }
   function getBlockHash(uint256 blockNumber) public view returns (bytes32 blockHash) {
       blockHash = blockhash(blockNumber);
   }
   function getLastBlockHash() public view returns (bytes32 blockHash) {
       blockHash = blockhash(block.number - 1);
   }
   function getCurrentBlockTimestamp() public view returns (uint256 timestamp) {
       timestamp = block.timestamp;
   }
   function getCurrentBlockDifficulty() public view returns (uint256 difficulty) {
       difficulty = block.difficulty;
   }
   function getCurrentBlockGasLimit() public view returns (uint256 gaslimit) {
       gaslimit = block.gaslimit;
   }
   function getCurrentBlockCoinbase() public view returns (address coinbase) {
       coinbase = block.coinbase;
   }
}`;

const ContractDetailsStepView = () => {
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Contract details
      </Typography>
      <Typography color="blue-gray">
        Confirm contract details and provide constructor arguments (if any)
      </Typography>
      <form className="mt-8 mb-4 w-full">
        <div className="mb-6 flex flex-wrap justify-start items-center gap-6">
          <div className="w-72">
            <Input
              crossOrigin=""
              size="md"
              label="Contract name"
              value={"Multicall"}
              readOnly
            />
          </div>
          <div className="w-72">
            <Input
              crossOrigin=""
              size="md"
              label="Compiler version"
              value={"v0.5.12+commit.7709ece9"}
              readOnly
            />
          </div>
        </div>
      </form>
      <Typography variant="h6" color="blue-gray">
        Constructor Arguments
      </Typography>
      <form className="mb-2 w-full">
        <div className="mb-4 flex flex-wrap justify-start items-center gap-4">
          <div className="w-72">
            <Input crossOrigin="" size="md" label="fee" />
          </div>
          <div className="w-72">
            <Input crossOrigin="" size="md" label="adminAddress" />
          </div>
          <div className="w-72">
            <Input crossOrigin="" size="md" label="startTime" />
          </div>
        </div>
      </form>
      <SyntaxHighlighter
        language="solidity"
        style={prism}
        customStyle={{ height: "500px" }}
        showLineNumbers={true}
      >
        {contracttemplate}
      </SyntaxHighlighter>
    </Card>
  );
};

export default ContractDetailsStepView;
