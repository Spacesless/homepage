'use strict';

const Controller = require('../core/base_controller');

class SuggestionController extends Controller {
  async index() {
    const { ctx } = this;
    const { keyword } = ctx.query;

    const result = []

    if(!keyword) {
      return this.success(result)
    }

    const url = 'http://api.bing.com/qsonhs.aspx?q=' + keyword;
    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    const data = res.data
    if(data && data.AS) {
      data.AS.Results.forEach(item => {
        result.push(...item.Suggests)
      })
    }

    return this.success(result);
  }
}

module.exports = SuggestionController
