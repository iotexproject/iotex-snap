import { makeAutoObservable } from "mobx"
import { globalStore } from "."
import { convertAddress } from "../lib/address"

export class Address {
   value: string = ''
   get ethAddress () {
    return convertAddress('0x', this.value)
   }
   get ioAddress () {
    return convertAddress('io', this.value)
   }

   get address () {
    if (globalStore?.mode) {
      return convertAddress(globalStore.mode, this.value)
    }
    return this.ioAddress
   }

   get shortAddress () {
    return this.address.slice(0, 6) + '...' + this.address.slice(-4)
   }

   constructor (value: string) {
      this.value = value
      makeAutoObservable(this)
   }
}
