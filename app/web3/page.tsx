"use client";

import { createConfig, http, useWriteContract } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import {
  WagmiWeb3ConfigProvider,
  MetaMask,
  Goerli,
} from "@ant-design/web3-wagmi";
import { Address, NFTCard, Connector, ConnectButton } from "@ant-design/web3";
import { Button } from "antd";
import { parseEther } from "viem";

const config = createConfig({
  chains: [mainnet, goerli],
  transports: {
    [mainnet.id]: http(
      "https://api.zan.top/node/v1/eth/mainnet/7f039b4a093940a8bb5d2f76cca81e45"
    ),
    [goerli.id]: http(
      "https://api.zan.top/node/v1/eth/goerli/7f039b4a093940a8bb5d2f76cca81e45"
    ),
  },
});

const CallTest = () => {
  const { writeContract } = useWriteContract();

  return (
    <Button
      onClick={() => {
        writeContract({
          abi: [
            {
              type: "function",
              name: "mint",
              stateMutability: "payable",
              inputs: [
                {
                  internalType: "uint256",
                  name: "quantity",
                  type: "uint256",
                },
              ],
              outputs: [],
            },
          ],
          address: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
          functionName: "mint",
          args: [1],
          value: parseEther("0.01"),
        });
      }}
    >
      mint
    </Button>
  );
};

export default () => {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      eip6963
      wallets={[MetaMask()]}
      chains={[Goerli]}
    >
      <Address format address="00000001231231231231231231231" />
      <NFTCard
        address="0x79fcdef22feed20eddacbb2587640e45491b757f"
        tokenId={8540}
      />
      <Connector>
        <ConnectButton />
      </Connector>
      <CallTest />
    </WagmiWeb3ConfigProvider>
  );
};
