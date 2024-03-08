import { ethers } from 'ethers'
import { Network } from './chain'
import BigNumber from 'bignumber.js'
import { Store } from '.'
import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { iotex } from 'viem/chains'
import { makeAutoObservable } from 'mobx'
import { Address } from './address'



export class Wallet {
  root!: Store
  account: Address = new Address('')

  walletClient!: ReturnType<typeof createWalletClient>
  publicClient = createPublicClient({ chain: iotex,   transport: http() })


  constructor( args: Partial<Wallet>) {
    Object.assign(this, args)
    makeAutoObservable(this)

  }

  async init () {
    this.walletClient = createWalletClient({
      chain: iotex,
      // @ts-ignore
      transport: custom(window.ethereum!)
    })
    // @ts-ignore
    const address = (await this.walletClient.requestAddresses())?.[0] as string
    this.account = new Address(address)
  }
}
