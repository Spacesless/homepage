import { Service } from 'egg';

export default class User extends Service {
  public async createUser(row: object) : Promise<object> {
    const result = await this.app.mysql.insert('user', row);

    return result;
  }

  public async findUser(username: string) : Promise<object> {
    const result = await this.app.mysql.get('user', { username });

    return result;
  }

  public async resetPassword(username: string, password: string) {
    const options = {
      where: {
        username,
      },
    };

    const result = await this.app.mysql.update('setting', { password }, options);

    return result;
  }
}
