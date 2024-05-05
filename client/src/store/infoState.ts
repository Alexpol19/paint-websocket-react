import { makeAutoObservable } from "mobx";

class InfoState {
  connectedUsers: string[] = []
  sessions: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setConnectedUsers(users: string[]) {
    this.connectedUsers = users;
  }

  setSessions(ids: string[]) {
    this.sessions = ids
  }
}

export default new InfoState
