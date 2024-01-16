import { makeAutoObservable } from 'mobx';


class UserStore {
  newUsers = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    this.newUsers.push(user);
  }
  
  
}



const userStore = new UserStore();
export default userStore;
