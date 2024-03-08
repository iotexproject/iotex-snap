import { makeAutoObservable } from "mobx";

export class MapState<T extends Record<string, any>> {
  currentId: string = ''
  key: string = ''
  list: T[] = [];
  get map() {
    return this.list.reduce((acc, item) => {
      acc[item[this.key]] = item;
      return acc;
    }, {} as { [key: string]: T });
  }
  get currentValue () {
    return this.map[this.currentId]
  }
  constructor(args: Partial<MapState<T>>) {
    Object.assign(this, args);
    makeAutoObservable(this)
  }

  setCurrentId (id: string) {
    this.currentId = id
  }
}
