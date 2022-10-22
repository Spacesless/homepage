const { Service } = require('egg');

class Setting extends Service {
  async findRecord(userId) {
    const record = await this.app.mysql.get('app_setting', { userId });

    return record;
  }

  async createRecord(row) {
    const { desktopIcon } = row;

    row = {
      ...row,
      desktopIcon: JSON.stringify(desktopIcon),
    };
    const result = await this.app.mysql.insert('app_setting', row);

    return result;
  }

  async updateRecord(row, userId) {
    const options = {
      where: {
        userId,
      },
    };

    const { desktopIcon } = row;

    row = {
      ...row,
      desktopIcon: JSON.stringify(desktopIcon),
    };

    const result = await this.app.mysql.update('app_setting', row, options);

    return result;
  }
}

module.exports = Setting;
