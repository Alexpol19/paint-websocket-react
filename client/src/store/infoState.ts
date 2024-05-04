import { makeAutoObservable } from "mobx";

class InfoState {
  connectedUsers: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setConnectedUsers(users: string[]) {
    this.connectedUsers = users;
  }
}

export default new InfoState
