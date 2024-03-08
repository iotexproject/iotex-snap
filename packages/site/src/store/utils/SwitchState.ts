import { makeAutoObservable } from 'mobx';

export class SwitchState {
  value: boolean = false;
  constructor(value: boolean) {
    this.value = value;
    makeAutoObservable(this);
  }
  open() {
    this.value = true;
  }
  close() {
    this.value = false;
  }
  toggle() {
    this.value = !this.value;
  }
}
