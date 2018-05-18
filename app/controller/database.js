'use strict';

const Controller = require('egg').Controller;

class DatabaseController extends Controller {
  async index() {
    this.ctx.body = 'hi database!';
  }

  async getTables() {
    const { ctx } = this;
    const dbName = ctx.params.dbName || 'cms_server';
    const tables = await this.service.database.getTables(dbName);
    ctx.body = tables;
  }

  async getColumnsByTable() {
    const { ctx } = this;
    const tableName = ctx.params.tableName || 'tb_users';
    const tables = await this.service.database.getColumnsByTable(tableName);
    ctx.body = tables;
  }
}

module.exports = DatabaseController;
