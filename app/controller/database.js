'use strict';

const Controller = require('egg').Controller;

class DatabaseController extends Controller {
  async index() {
    this.ctx.body = 'hi database!';
  }

  async getTables() {
    const { ctx } = this
    let dbName = ctx.params.db_name || 'cms_server'
    let tables = await this.app.mysql.query(`
      select TABLE_SCHEMA,TABLE_NAME,TABLE_ROWS,TABLE_COMMENT 
      from information_schema.TABLES 
      where table_schema = '${dbName}'`
    );
    ctx.body = tables;
  }

  async getColumnsByTable() {
    const { ctx } = this
    let table_name = ctx.params.table_name || 'tb_users'
    let tables = await this.app.mysql.query(`
      select * from information_schema.columns 
      where table_name = '${table_name}'`
    );
    this.ctx.body = tables;
  }
}

module.exports = DatabaseController;
