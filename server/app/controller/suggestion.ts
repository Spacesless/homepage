import Controller from '../core/base_controller';

export default class SuggestionController extends Controller {
  public async index() {
    const { ctx } = this;
    const params = ctx.params;

    const url = 'http://api.bing.com/qsonhs.aspx?q=' + params.keyword;
    const res = await ctx.curl(url);

    return this.success(res.data);
  }
}
