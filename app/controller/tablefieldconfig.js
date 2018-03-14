'use strict';

const Controller = require('egg').Controller;

class TableConfigController extends Controller {

  async index() {
    this.ctx.body = `表字段配置`;
  }

  async select() {
    const { ctx, service, config } = this;
    let tableName = ctx.params.tableName;
    let pageIndex = ctx.params.pageIndex;
    let pageSize = ctx.query.pageSize || config.pageSize;
    const data = await service.tablefieldconfig.select(tableName, pageIndex, pageSize);
    ctx.body = data;
  }


  async getByTableId() {
    const { ctx, service } = this;
    let tableId = ctx.params.tableId;
    let data = await service.tablefieldconfig.getByTableId(tableId);
    ctx.body = data;
  }
}

module.exports = TableConfigController;
