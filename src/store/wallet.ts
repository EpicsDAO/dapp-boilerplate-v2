import { atom } from 'recoil'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { Connection, clusterApiUrl } from '@solana/web3.js'

type WalletState = {
  network: WalletAdapterNetwork
  endpoint: string
  connection: Connection
}

const network = WalletAdapterNetwork.Devnet
export const endpoint = clusterApiUrl(network)
const connection = new Connection(endpoint, 'confirmed')

export const walletState = atom<WalletState>({
  key: 'walletState',
  default: {
    network,
    endpoint,
    connection,
  },
})
