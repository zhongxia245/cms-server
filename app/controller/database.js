'use strict';

const Controller = require('egg').Controller;

class DatabaseController extends Controller {
  async index() {
    this.ctx.body = 'hi database!';
  }

  async getTables() {
    const { ctx } = this
    let dbName = ctx.params.dbName || 'cms_server'
    let tables = await this.service.database.getTables(dbName)
    ctx.body = tables;
  }

  async getColumnsByTable() {
    const { ctx } = this
    let tableName = ctx.params.tableName || 'tb_users'
    let tables = await this.service.database.getColumnsByTable(tableName)
    ctx.body = tables;
  }
}

module.exports = DatabaseController;
