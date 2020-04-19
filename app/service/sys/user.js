'use strict';
const Service = require('../base');
class UserService extends Service {
  // 新增
  async create(params) {
    const [ result, status ] = await this.ctx.model.SysUser.findOrCreate({
      where: { userName: params.userName },
      defaults: Object.assign(
        params,
        await this.createByOrDate(),
        await this.updateByOrDate(),
        {
          userCode: await this.createUuid(),
          userType: '1',
          password: await this.md5(params.password),
        }
      ),
    });
    if (status) {
      return { msg: '新增成功！', success: status };
    }
    return { msg: result.userName + '已经存在', success: false };
  }
  // 更新
  async update(params, userCode) {
    const data = await this.ctx.model.SysUser.update(
      Object.assign(params, await this.updateByOrDate()),
      {
        where: { userCode },
      }
    );
    if (data) {
      return { msg: '更新成功！', success: true };
    }
    return { msg: '更新失败', success: false };
  }
  // 删除
  async delete(params) {
    const status = await this.ctx.model.SysUser.destroy({ where: params });
    if (status) {
      return { msg: '删除成功！', success: true };
    }
    return { msg: '找不到这条数据', success: false };
  }
  // 列表 支持page order
  async list(params) {
    const Op = this.app.Sequelize.Op;
    const { nickName, status, size = 10, current = 1 } = params;
    const {
      rows: data,
      count: total,
    } = await this.ctx.model.SysUser.findAndCountAll({
      where: {
        [Op.and]: [
          nickName ? { nickName } : null,
          status ? { status } : null,
        ],
      },
      limit: size,
      offset: (current - 1) * size,
    });
    return { msg: '查询成功！', success: true, data, size, current, total };
  }
  // 详情
  async detail(params) {
    const data = await this.ctx.model.SysModule.findOne({
      where: params,
    });
    return { msg: '查询成功！', success: true, data };
  }
  // 登录
  async login(params) {
    const { userName } = params;
    const Op = this.app.Sequelize.Op;
    const isUser = await this.ctx.model.SysUser.findOne({
      where: { userName },
    });
    if (isUser) {
      const password = await this.md5(params.password);
      const data = await this.ctx.model.SysUser.findOne({
        where: {
          [Op.and]: [{ password }, { userName }],
        },
      });
      if (data) {
        const token = this.jwtSign(data);
        return {
          msg: '登录成功！',
          success: true,
          data,
          token,
        };
      }
      return { msg: '用户密码不正确！', success: false };
    }
    return { msg: '当前用户未注册！', success: false };
  }
}
module.exports = UserService;
