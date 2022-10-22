const { Service } = require('egg');

class User extends Service {
  async createUser(row) {
    row.createTime = this.app.mysql.literals.now;

    const result = await this.app.mysql.insert('app_user', row);

    return result;
  }

  async findUser(userId) {
    const result = await this.app.mysql.get('app_user', { id: userId });

    return result;
  }

  async findUserByName(username) {
    const result = await this.app.mysql.get('app_user', { username });

    return result;
  }

  async updateLoginTime(userId) {
    const options = {
      where: {
        id: userId,
      },
    };

    const result = await this.app.mysql.update('app_user', { loginTime: this.app.mysql.literals.now }, options);

    return result;
  }

  async resetPassword(userId, password) {
    const options = {
      where: {
        id: userId,
      },
    };

    const result = await this.app.mysql.update('app_user', { password }, options);

    return result;
  }
}

module.exports = User;
