import Controller from '../core/base_controller';

export default class UserController extends Controller {
  public async register() {
    const { ctx, service } = this;
    const params = ctx.params;

    const findUser = service.user.findUser(params.username);

    if (findUser) {
      return this.fail('用户名已被使用');
    }

    const result = await service.user.createUser(params);

    if (result.affectedRows === 1) {
      return this.success(result);
    }

    return this.fail('注册用户失败');
  }

  public async login() {
    const { ctx, service } = this;
    const params = ctx.params;

    const findUser = service.user.findUser(params.username);

    if (findUser) {
      const { userId, username, password } = findUser;
      if (password === params.password) {
        ctx.session.userId = findUser.id;
        return this.success({
          userId,
          username,
        });
      }
    }

    return this.fail('未找到该用户');
  }

  public async logout() {
    this.ctx.session.userId = null;
    return this.success();
  }

  public async checkUsername() {
    const { ctx, service } = this;
    const params = ctx.params;

    const findUser = service.user.findUser(params.username);

    if (findUser) {
      ctx.session.resetUsername = findUser.username;
      return this.success();
    }

    return this.fail('未找到该用户');
  }

  public async checkAnswer() {
    const { ctx, service } = this;
    const params = ctx.params;

    if (!ctx.session.resetUsername) {
      return this.fail('请先验证用户名');
    }

    const findUser = service.user.findUser(ctx.session.resetUsername);

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

  public async reset() {
    const { ctx, service } = this;
    const params = ctx.params;

    const { resetUsername, resetCheck } = ctx.session;
    if (resetUsername && resetCheck) {
      const result = service.resetPassword(resetUsername, params.password);

      if (result.affectedRows === 1) {
        ctx.session.resetUsername = null;
        ctx.session.resetCheck = null;
        return this.success('重置密码成功');
      }
    }

    return this.fail('验证不通过');
  }
}
