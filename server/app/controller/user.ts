import Controller from '../core/base_controller';

export default class UserController extends Controller {
  public async register() {
    //
  }

  public async login() {
    const { ctx, service } = this;
    const params = ctx.params;

    const findUser = service.user.findUser(params.username);

    if (findUser) {
      if (findUser.password === params.password) {
        ctx.session.userId = findUser.id;
        return this.success();
      }
    }
    return this.fail('未找到该用户');
  }

  public async logout() {
    this.ctx.session.userId = null;
    return this.success();
  }

  public async forgot() {
    //
  }

  public async reset() {
    //
  }
}
