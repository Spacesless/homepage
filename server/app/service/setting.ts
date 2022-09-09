import { Service } from 'egg';

export default class Setting extends Service {
  public async findRecord(userId: number) : Promise<object> {
    const record = await this.app.mysql.get('setting', { userId });

    return record;
  }

  public async createRecord(row: object) : Promise<object> {
    const result = await this.app.mysql.insert('setting', row);

    return result;
  }

  public async updateRecord(row: object, userId: number) : Promise<object> {
    const options = {
      where: {
        userId,
      },
    };

    const result = await this.app.mysql.update('setting', row, options);

    return result;
  }
}
