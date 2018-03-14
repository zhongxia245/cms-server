'use strict';

const Controller = require('egg').Controller;

class TableConfigController extends Controller {

  async index() {
    this.ctx.body = `表配置`;
  }

  async getById() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let data = await service.tableconfig.getById(id);
    ctx.body = data;
  }

  /**
   * 添加表并且添加相对应的字段
   */
  async addTableAndColumns() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;

    // 获取表的所有字段
    let columns = await service.database.getColumnsByTable(tableName);

    // 提取数据库名
    let database = ''
    if (columns.length > 0) {
      database = columns[0]['TABLE_SCHEMA'];
    }

    // 添加表格
    let tableResult = await service.tableconfig.add({
      table_name: tableName,
      database: database,
      title: tableName
    })
    let tableId = tableResult.insertId;

    // 添加表字段
    for (let i = 0; i < columns.length; i++) {
      let tableFieldConfig = {
        table_id: tableId,
        table_name: tableName,
        name: columns[i]['COLUMN_NAME'],
        fieldname: columns[i]['COLUMN_NAME'],
        title: columns[i]['COLUMN_COMMENT'] || columns[i]['COLUMN_NAME'],
        data_type: columns[i]['DATA_TYPE'],
        col_sort: i,
        form_sort: i,
        remark: columns[i]['COLUMN_COMMENT']
      }
      service.tablefieldconfig.add(tableFieldConfig)
    }

    ctx.body = tableResult
  }

  async delTableAndColumns() {
    const { ctx, service } = this;
    let ids = ctx.params.id
    const result = await service.tableconfig.del(ids);
    const tableFieldResult = await service.tablefieldconfig.delByTableId(ids)
    ctx.body = result
  }

}

module.exports = TableConfigController;
