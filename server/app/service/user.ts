import { Service } from 'egg';

export default class User extends Service {
  public async register() {
    //
  }

  public async findUser(username: string) : Promise<object> {
    const result = await this.app.mysql.get('setting', { username });

    return result;
  }

  public async checkUser() {
    //
  }

  public async forgot() {
    //
  }

  public async resetPassword() {
    //
  }
}
