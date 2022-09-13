import Controller from '../core/base_controller';

export default class SettingController extends Controller {
  public async index() {
    const { ctx, service } = this;

    const userId = ctx.session.userId;
    const record = await service.setting.findRecord(userId);

    if (record) {
      return this.success(record);
    }
    return this.fail('未找到对应记录');
  }

  public async create() {
    const { ctx, service } = this;

    const params = ctx.params;
    const userId = ctx.session.userId;

    params.userId = userId;
    const result = await service.setting.createRecord(params);

    if (result.affectedRows === 1) {
      return this.success(result);
    }
    return this.fail('云端存储配置失败');
  }

  public async update() {
    const { ctx, service } = this;

    const params = ctx.params;

    const result = await service.setting.updateRecord(params);

    if (result.affectedRows === 1) {
      return this.success(result);
    }
    return this.fail('云端存储配置失败');
  }
}
