'use strict';
const Service = require('../base');
class OfficeService extends Service {
  // 新增
  async create(params) {
    const office_code = await this.createUuid();
    const [ result, status ] = await this.ctx.model.SysOffice.findOrCreate({
      where: { user_name: params.user_name },
      defaults: Object.assign(
        params,
        await this.updateByOrDate(),
        await this.createByOrDate(),
        {
          office_code,
        }
      ),
    });
    if (status) {
      return { msg: '新增成功！', success: status };
    }
    return { msg: result.user_name + '已经存在', success: false };
  }
  // 更新
  async update(params, id) {
    const data = await this.ctx.model.SysOffice.update(
      Object.assign(params, await this.updateByOrDate()),
      {
        where: { user_code: id },
      }
    );
    if (data) {
      return { msg: '更新成功！', success: true };
    }
    return { msg: '更新失败', success: false };
  }
  // 删除
  async delete(params) {
    const status = await this.ctx.model.SysOffice.destroy({ where: params });
    if (status) {
      return { msg: '删除成功！', success: true };
    }
    return { msg: '找不到这条数据', success: false };
  }
  // 列表 支持page order
  async list(params) {
    const Op = this.app.Sequelize.Op;
    const { nick_name, status, size = 10, current = 1 } = params;
    const {
      rows: data,
      count: total,
    } = await this.ctx.model.SysOffice.findAndCountAll({
      attributes: this.attributes,
      where: {
        [Op.and]: [
          nick_name ? { nick_name } : null,
          status ? { status } : null,
        ],
      },
      limit: size,
      offset: (current - 1) * size,
    });
    return { msg: '查询成功！', success: true, data, size, current, total };
  }
}
module.exports = OfficeService;
