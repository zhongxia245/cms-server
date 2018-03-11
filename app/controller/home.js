'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi, egg!'
    this.ctx.body = await this.app.mysql.query(`select TABLE_SCHEMA,TABLE_NAME,TABLE_ROWS,TABLE_COMMENT from information_schema.TABLES where table_schema = 'cms_server'`)
  }
}

module.exports = HomeController;
