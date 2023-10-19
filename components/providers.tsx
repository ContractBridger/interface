"use client";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  sepolia,
  bsc,
  bscTestnet,
  arbitrum,
  arbitrumGoerli,
  base,
  baseGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-tailwind/react";

const { chains, publicClient } = configureChains(
  [
    mainnet,
    sepolia,
    bsc,
    bscTestnet,
    arbitrum,
    arbitrumGoerli,
    base,
    baseGoerli,
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "Contract Bridger",
  projectId: "c9d2016dd4977de9df5d46d2aacc18ec",
  chains,
});

const appInfo = {
  appName: "Contract Bridger",
};

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={appInfo} modalSize="wide">
          <ToastContainer
            position="top-right"
            autoClose={4500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />

          {children}
          <ToastContainer />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default Providers;
