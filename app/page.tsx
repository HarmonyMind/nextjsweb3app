'use client'

import styles from "./page.module.css";

import '@rainbow-me/rainbowkit/styles.css';

import {
  WalletList,
  RainbowKitProvider,
  getDefaultConfig,
  Chain,
  ConnectButton,
} from '@rainbow-me/rainbowkit';


import { metaMaskWallet, trustWallet, uniswapWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";

const queryClient = new QueryClient();

/* copypaste this from BuildBear dashboard*/
const bbtestnet = {
  id: 16898,
  name: "mushy-quicksilver-884dd2d0",
  //network: "bbtestnet", !!! it is not needed 
  iconUrl: 'https://blockchainmetrics.online/img/block-chain.svg', // add network icon
  iconBackground: '#fff', // add icon background
  nativeCurrency: {
    decimals: 18,
    name: "Native Token",
    symbol: "Native Token",
  },
  rpcUrls: {
    public: { http: ["https://rpc.buildbear.io/mushy-quicksilver-884dd2d0"] },
    default: { http: ["https://rpc.buildbear.io/mushy-quicksilver-884dd2d0"] },
  },
  blockExplorers: {
    etherscan: {
      name: "BBExplorer",
      url: "https://explorer.buildbear.io/mushy-quicksilver-884dd2d0",
    },
    default: {
      name: "BBExplorer",
      url: "https://explorer.buildbear.io/mushy-quicksilver-884dd2d0",
    },
  },
} as const satisfies Chain;

const _walletList: WalletList = [
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet, trustWallet, uniswapWallet, walletConnectWallet],
  },
];

const _chains: readonly [Chain, ...Chain[]] = [bbtestnet, polygon, polygonAmoy,];

const config = getDefaultConfig({
  appName: 'nexnjsweb3app',
  projectId: 'YOUR_PROJECT_ID',
  wallets: _walletList,
  chains: _chains,
  ssr: false,
});



export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <main className={styles.main}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 12,
              }}
            >
              <ConnectButton />
            </div>
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
