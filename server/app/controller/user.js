'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async register() {
    const { ctx, service } = this;
    const params = ctx.request.body;

    const findUser = await service.user.findUser(params.username);

    if (findUser) {
      return this.fail('用户名已被使用');
    }

    const result = await service.user.createUser(params);

    if (result.affectedRows === 1) {
      return this.success(result.insertId);
    }

    return this.fail('注册用户失败');
  }

  async login() {
    const { ctx, service } = this;
    const params = ctx.request.body;

    const findUser = await service.user.findUser(params.username);

    if (findUser) {
      const { id, username, password } = findUser;
      if (password === params.password) {
        ctx.session.userId = id;

        service.user.updateLoginTime(id)

        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        ctx.rotateCsrfSecret();

        return this.success({
          id,
          username,
        });
      } else {
        return this.fail('用户名或密码不正确');
      }
    }

    return this.fail('未找到该用户');
  }

  async logout() {
    this.ctx.session.userId = null;
    return this.success();
  }

  async checkUsername() {
    const { ctx, service } = this;
    const params = ctx.request.body;

    const findUser = await service.user.findUser(params.username);

    if (findUser) {
      ctx.session.resetUsername = findUser.username;
      return this.success({
        question: findUser.question,
      });
    }

    return this.fail('未找到该用户');
  }

  async checkAnswer() {
    const { ctx, service } = this;
    const params = ctx.request.body;

    if (!ctx.session.resetUsername) {
      return this.fail('请先验证用户名');
    }

    const findUser = await service.user.findUser(ctx.session.resetUsername);

    if (findUser) {
      const { answer, tip } = findUser;

      if (answer === params.answer) {
        ctx.session.resetCheck = true;
        return this.success();
      }

      return this.fail('答案不正确', {
        tip,
      });
    }
  }

  async reset() {
    const { ctx, service } = this;
    const params = ctx.request.body;
    console.log(ctx.session)
    const { resetUsername, resetCheck } = ctx.session;
    if (resetUsername && resetCheck) {
      const result = await service.user.resetPassword(resetUsername, params.password);

      if (result.affectedRows === 1) {
        ctx.session.userId = null
        ctx.session.resetUsername = null;
        ctx.session.resetCheck = null;
        return this.success('重置密码成功');
      }
    }

    return this.fail('验证不通过');
  }
}

module.exports = UserController
