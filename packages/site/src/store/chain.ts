
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { makeAutoObservable } from 'mobx'
import { Store } from '.'

export class Network {
  root!: Store
  chainId: number = 4689
  rpcUrls: string[] = ['https://babel-api.mainnet.iotex.io']
  chainName!: string
  blockExplorerUrls:string[] = []
  balance: BigNumber = new BigNumber(0)
  nativeCurrency: {
    symbol: string
    decimals: number
  } = {
    symbol: 'IOTX',
    decimals: 18
  }
  label!: string

  get readProvider() {
    return new ethers.providers.JsonRpcProvider(this.rpcUrls[0])
  }

  constructor(args: Partial<Network>) {
    Object.assign(this, args)
    makeAutoObservable(this)
  }
  async getBalance (account: string) {
    const balance = await this.readProvider.getBalance(account)
    this.balance = new BigNumber(balance.toString()).div(new BigNumber(10).pow(this.nativeCurrency.decimals))
  }
}

export const iotexChain = new Network({

})
