'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  success(data = null) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  fail(msg, data = null) {
    this.ctx.body = {
      success: false,
      msg,
      data,
    };
  }
}

module.exports = BaseController;
