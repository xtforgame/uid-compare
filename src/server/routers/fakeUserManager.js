class FakeUserManager {
  constructor(){
    this.userCount = 0;
    this.users = {};
    this.userIdMap = {};
    this.register('admin', 'admin', 'admin');
  }

  register(username, password, name, privilege){
    if(this.users[username]){
      return null;
    }
    const id = `${++this.userCount}`;
    const user = {
      id,
      name,
      username,
      password,
      privilege,
    };

    this.users[username] = user;
    this.userIdMap[id] = user;
    return user;
  }

  authenticate(auth_type, username, password){
    const user = this.users[username];
    if(auth_type !== 'basic' || !user){
      return null;
    }
    const {
      id: userid,
      privilege,
    } = user;
    return {
      userid,
      username,
      token_type: 'Bearer',
      privilege,
      token: `${username}FakeToken`,
    };
  }

  _exposeUserData(user){
    if(!user){
      return null;
    }
    const {
      id,
      name,
      username,
      privilege,
    } = user;
    return {
      id,
      name,
      username,
      privilege,
    };
  }

  getUserById(id){
    return this._exposeUserData(this.userIdMap[id]);
  }

  getUserByName(username){
    return this._exposeUserData(this.users[username]);
  }
}

export default new FakeUserManager();
