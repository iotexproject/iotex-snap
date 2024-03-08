import BigNumber from "bignumber.js"
import { Store } from ".."
import { erc20Abi, getContract } from "viem";
import { makeAutoObservable } from "mobx"
import { Address } from "../address";
import { convertAddress } from "../../lib/address";

export class Token {
  root!: Store
  address = new Address('')
  name: string= ''
  symbol: string = ''
  decimals: number = 18
  balance: BigNumber = new BigNumber(0)
  price: BigNumber = new BigNumber(0)
  logo: string = ''

  get id () {
    return this.address.ethAddress
  }

  txs: any[] = []
  get contract() {
    return getContract({
      // @ts-ignore
      address: this.address.ethAddress,
      abi: erc20Abi,
      // 1b. Or public and/or wallet clients
      client: { public: this.root.wallet.publicClient, wallet: this.root.wallet.walletClient }
    })
  }
  constructor({address, ...args}: Partial<Omit<Token, 'address'>> & {address: string} ) {
    Object.assign(this, args)
    this.address = new Address(address)
    makeAutoObservable(this)
  }

  get balanceFormat () {
     return `${this.balance.div(new BigNumber(10).pow(this.decimals)).toFormat(2)} ${this.symbol}`
  }
  get balanceUSDFormat () {
    return `$${this.balance.times(this.price).toFormat(2)} USD`
  }

  async init () {
    await Promise.all([
      this.getBalance()
    ])
  }
  async getBalance() {
    // @ts-ignore
    const balance = await this.contract.read.balanceOf([this.root.wallet.account.ethAddress])
    this.balance = new BigNumber(balance.toString())
  }

  async transfer (to: string, amount: string) {
    // @ts-ignore
    const res = await this.contract.write.transfer([convertAddress('0x', to), new BigNumber(amount).multipliedBy(new BigNumber(10).pow(18)).toFixed()], {
      account: this.root.wallet.account.ethAddress,
    })
    this.getBalance()
  }
}
