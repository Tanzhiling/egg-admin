'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const bladeScopeData = app.model.define('bladeScopeData', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      field: 'id',
    },
    menuId: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'menu_id',
    },
    resourceCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'resource_code',
    },
    scopeName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'scope_name',
    },
    scopeField: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'scope_field',
    },
    scopeClass: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'scope_class',
    },
    scopeColumn: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'scope_column',
    },
    scopeType: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'scope_type',
    },
    scopeValue: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      field: 'scope_value',
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'remark',
    },
    createUser: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'create_user',
    },
    createDept: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'create_dept',
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_time',
      defaultValue: DataTypes.NOW,
    },
    updateUser: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: 'update_user',
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'update_time',
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'status',
    },
    isDeleted: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      field: 'is_deleted',
    },
  }, {
    tableName: 'blade_scope_data',
  });
  return bladeScopeData;
};
