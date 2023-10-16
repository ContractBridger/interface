"use client";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia, bsc, bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, bsc, bscTestnet],
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
  );
};

export default Providers;
