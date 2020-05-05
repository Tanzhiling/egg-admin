'use strict';

module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysUser = app.model.define(
    'sys_user',
    {
      id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
        field: 'user_code',
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'user_name',
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'nick_name',
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      mobile: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      sex: {
        type: DataTypes.CHAR(1),
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(1000),
        allowNull: true,
      },
      sign: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      wxOpenid: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'wx_openid',
      },
      mobileImei: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'mobile_imei',
      },
      userType: {
        type: DataTypes.STRING(16),
        allowNull: false,
        field: 'user_type',
        defaultValue: '0',
      },
      refCode: {
        type: DataTypes.STRING(64),
        allowNull: true,
        field: 'ref_code',
      },
      refName: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'ref_name',
      },
      mgrType: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '0',
        field: 'mgr_type',
      },
      pwdSecurityLevel: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'pwd_security_level',
      },
      pwdUpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'pwd_update_date',
      },
      pwdUpdateRecord: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        field: 'pwd_update_record',
      },
      pwdQuestion: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question',
      },
      pwdQuestionAnswer: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question_answer',
      },
      pwdQuestion2: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question_2',
      },
      pwdQuestionAnswer2: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question_answer_2',
      },
      pwdQuestion3: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question_3',
      },
      pwdQuestionAnswer3: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'pwd_question_answer_3',
      },
      pwdQuestUpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'pwd_quest_update_date',
      },
      lastLoginIp: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: 'last_login_ip',
      },
      lastLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_date',
      },
      freezeDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'freeze_date',
      },
      freezeCause: {
        type: DataTypes.STRING(200),
        allowNull: true,
        field: 'freeze_cause',
      },
      userWeight: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: '0',
        field: 'user_weight',
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: '0',
      },
      createBy: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'create_by',
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'create_date',
        defaultValue: DataTypes.NOW,
      },
      updateBy: {
        type: DataTypes.STRING(64),
        allowNull: false,
        field: 'update_by',
      },
      updateDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'update_date',
        defaultValue: DataTypes.NOW,
      },
      remarks: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      corpCode: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '0',
        field: 'corp_code',
      },
      corpName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'JeeSite',
        field: 'corp_name',
      },
    },
    {
      tableName: 'sys_user',
    }
  );
  SysUser._add = function({ id, username, nickname, password, email, mobile, sex, avatar, phone, sign, userType, mgrType, status, remarks, createBy, updateBy }) {
    return SysUser.findOrCreate({
      where: { username },
      defaults: {
        id, nickname, password, email, mobile, sex, avatar, phone, sign, userType, mgrType, status, remarks, createBy, updateBy,
      },
    });
  };
  SysUser._update = function({ id, nickname, password, email, mobile, sex, avatar, phone, sign, userType, mgrType, status, remarks, updateBy }) {
    return SysUser.update({ nickname, password, email, mobile, sex, avatar, phone, sign, userType, mgrType, status, remarks, updateBy }, { where: { id } });
  };
  SysUser._delete = function({ id }) {
    return SysUser.destroy({ where: { id } });
  };
  SysUser._findList = async function({ username, status, size = 10, current = 1 }) {
    const Op = app.Sequelize.Op;
    const { rows: list, count: total } = await SysUser.findAndCountAll({
      attributes: { exclude: [ 'password' ] },
      where: {
        [Op.and]: [
          username ? { username: { [Op.like]: `%${username}%` } } : null,
          status ? { status } : null,
        ],
      },
      limit: size,
      offset: (current - 1) * size,
    });
    return { list, size, current, total };
  };
  SysUser._findOne = function({ id }) {
    return SysUser.findOne({ attributes: { exclude: [ 'password' ] }, where: { id } });
  };
  return SysUser;
};
