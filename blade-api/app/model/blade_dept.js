'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const bladeDept = app.model.define('bladeDept', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    tenantId: {
      type: DataTypes.STRING(12),
      allowNull: true,
      defaultValue: '000000',
      field: 'tenant_id',
    },
    parentId: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'parent_id',
      defaultValue: '0',
    },
    deptCategory: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'dept_category',
    },
    deptName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'dept_name',
    },
    fullName: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'full_name',
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'sort',
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'remark',
    },
    isDeleted: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: '0',
      field: 'is_deleted',
    },
  }, {
    tableName: 'blade_dept',
  });
  bladeDept._add = function({ deptCode, tenantId, parentId = '0', deptCategory, deptName, fullName, sort, remark }) {
    return bladeDept.findOrCreate({
      where: { id: deptCode },
      defaults: {
        id: deptCode, tenantId, parentId, deptCategory, deptName, fullName, sort, remark,
      },
    });
  };
  bladeDept._update = function({ id, parentId, tenantId, deptCategory, deptName, fullName, sort, remark }) {
    return bladeDept.update({ tenantId, parentId, deptCategory, deptName, fullName, sort, remark }, { where: { id } });
  };
  bladeDept._delete = function({ id }) {
    return bladeDept.destroy({ where: { id } });
  };
  bladeDept._findList = async function({ deptName, size = 10, current = 1 }) {
    const Op = app.Sequelize.Op;
    const { rows: list, count: total } = await bladeDept.findAndCountAll({
      where: {
        [Op.and]: [
          deptName ? { deptName: { [Op.like]: `%${deptName}%` } } : null,
        ],
      },
      include: { model: app.model.BladeTenant, as: 'tenant', attributes: [ 'tenantName' ] },
      limit: size,
      offset: (current - 1) * size,
    });
    return { list, size, current, total };
  };
  bladeDept._findOne = params => {
    return bladeDept.findOne({ where: params, include: { model: bladeDept, as: 'parent', attributes: [ 'deptName', 'id' ] } });
  };
  bladeDept._findTree = function({ id }) {
    return bladeDept.findAll({ where: { parentId: id } });
  };
  bladeDept.associate = function() {
    bladeDept.hasOne(app.model.BladeTenant, { foreignKey: 'tenantId', sourceKey: 'tenantId', as: 'tenant' });
    bladeDept.belongsTo(bladeDept, { foreignKey: 'parentId', targetKey: 'id', as: 'parent' });
  };
  return bladeDept;
};
