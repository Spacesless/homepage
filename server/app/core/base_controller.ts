import { Controller } from 'egg';

class BaseController extends Controller {
  success(data: any = null) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  fail(msg: string, data: any = null) {
    this.ctx.body = {
      success: false,
      msg,
      data,
    };
  }
}

export default BaseController;
