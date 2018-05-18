'use strict';

const Controller = require('egg').Controller;

class TableConfigController extends Controller {

  async index() {
    this.ctx.body = '表字段配置';
  }

  async select() {
    const { ctx, service, config } = this;
    const tableName = ctx.params.tableName;
    const pageIndex = ctx.params.pageIndex;
    const pageSize = ctx.query.pageSize || config.pageSize;
    const data = await service.tablefieldconfig.select(tableName, pageIndex, pageSize);
    ctx.body = data;
  }


  async getByTableId() {
    const { ctx, service } = this;
    const tableId = ctx.params.tableId;
    const data = await service.tablefieldconfig.getByTableId(tableId);
    ctx.body = data;
  }
}

module.exports = TableConfigController;
