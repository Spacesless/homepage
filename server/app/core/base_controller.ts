import { Controller } from 'egg';

class BaseController extends Controller {
  success(data: any = null) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  fail(msg: string) {
    this.ctx.body = {
      success: false,
      data: msg,
    };
  }
}

export default BaseController;
