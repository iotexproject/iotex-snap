import { makeAutoObservable } from "mobx";
import { request } from "../lib/request";
// import { Network } from "./chain";
// import { Multicall } from "./contract/multicall";
import { Token } from "./contract/token";
import { Wallet } from "./wallet";
import { MapState } from "./utils/MapState";


export class Store {
  wallet!: Wallet;
  // network!: Network;
  tokens: Token[] = []
  mode: 'io' | '0x' = '0x'
  tokenMap = new MapState<Token>({key: 'id', list: this.tokens})
  constructor() {
    this.wallet = new Wallet({root: this});
    makeAutoObservable(this)
    // this.network = new Network({root: this});
  }

  toggleMode () {
    this.mode = this.mode === 'io' ? '0x' : 'io'
  }

  async init () {
    await this.wallet.init()
    this.loadDepinTokens()
  }

  async loadDepinTokens () {
    const tokens = ((await request.get('/depintokens')) as any).data.xrc20
    this.tokens = (tokens as any as Token[]).map((item: any) => new Token({...item, root: this}))
    this.tokenMap = new MapState<Token>({key: 'id', list: this.tokens, currentId: this.tokens[0]!.id})
  }
}


export const globalStore = new Store()
