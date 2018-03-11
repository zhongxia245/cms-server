'use strict';

const Controller = require('egg').Controller;

class CurdController extends Controller {

  async index() {
    this.ctx.body = `simple curd api.`;
  }

  async select() {
    const { ctx, service, config } = this;
    let tableName = ctx.params.tableName;
    let pageIndex = ctx.params.pageIndex;
    let pageSize = ctx.query.pageSize || config.pageSize;
    const data = await ctx.service.tableconfig.select(tableName, pageIndex, pageSize);
    ctx.body = data;
  }

  async getById() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;
    let id = ctx.params.id;
    let data = await ctx.service.curd.getById(tableName, id);
    ctx.body = data;
  }

  async getByTableName() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;
    let data = await ctx.service.tableconfig.getByTableName(tableName);
    ctx.body = data;
  }

  async del() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;
    let id = ctx.params.id;
    let result = await ctx.service.curd.del(tableName, id);
    ctx.body = result;
  }

  async add() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.add(tableName, data);
    ctx.body = result;
  }

  async update() {
    const { ctx, service } = this;
    let tableName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.update(tableName, data);
    ctx.body = result;
  }
}

module.exports = CurdController;
