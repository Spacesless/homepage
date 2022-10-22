'use strict';

const Controller = require('../core/base_controller');

class SettingController extends Controller {
  async index() {
    const { ctx, service } = this;

    const userId = ctx.session.userId;
    const record = await service.setting.findRecord(userId);

    if (record) {
      const { desktopIcon, iconShow, searchShow, weatherShow, todoShow } = record;
      let formatDesktopIcon = [];

      try {
        formatDesktopIcon = JSON.parse(desktopIcon);
      } catch {
        formatDesktopIcon = [];
      }
      const result = {
        ...record,
        desktopIcon: formatDesktopIcon,
        iconShow: !!iconShow,
        searchShow: !!searchShow,
        weatherShow: !!weatherShow,
        todoShow: !!todoShow,
      };
      delete result.userId;

      return this.success(result);
    }

    return this.fail('未找到对应记录');
  }

  async create() {
    const { ctx, service } = this;

    const params = ctx.request.body;
    const userId = ctx.session.userId;

    params.userId = userId;
    const result = await service.setting.createRecord(params);

    if (result.affectedRows === 1) {
      return this.success(result);
    }

    return this.fail('云端存储配置失败');
  }

  async update() {
    const { ctx, service } = this;

    const params = ctx.request.body;

    const userId = ctx.session.userId;
    const result = await service.setting.updateRecord(params, userId);

    if (result.affectedRows === 1) {
      return this.success(result);
    }

    return this.fail('云端存储配置失败');
  }
}

module.exports = SettingController;
