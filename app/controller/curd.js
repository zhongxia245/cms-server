'use strict';

const Controller = require('egg').Controller;

class CurdController extends Controller {

  async index() {
    this.ctx.body = `simple curd api.`;
  }

  async select() {
    const { ctx, service, config } = this;
    let tbName = ctx.params.tableName;
    let pageIndex = ctx.params.pageIndex;
    let filter = ctx.query || {}
    filter.pageSize = filter.pageSize || config.pageSize;
    const data = await ctx.service.curd.select(tbName, pageIndex, filter);
    ctx.body = data;
  }

  async getById() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let id = ctx.params.id;
    let data = await ctx.service.curd.getById(tbName, id);
    ctx.body = data;
  }

  async del() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let id = ctx.params.id;
    let result = await ctx.service.curd.del(tbName, id);
    ctx.body = result;
  }

  async add() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.add(tbName, data);
    ctx.body = result;
  }

  async update() {
    const { ctx, service } = this;
    let tbName = ctx.params.tableName;
    let data = ctx.request.body;
    let result = await ctx.service.curd.update(tbName, data);
    ctx.body = result;
  }

  // =========================================
  //   根据表的ID，来获取表名，在进行增删改查
  // =========================================
  async getTableNameById(tableId) {
    let tableData = await this.service.tableconfig.getById(tableId);
    return tableData.table_name;
  }

  async selectByTableId() {
    const { ctx, service, config } = this;
    let tableId = ctx.params.tableId;
    let tableName = await this.getTableNameById(tableId)
    let pageIndex = ctx.params.pageIndex;
    let pageSize = ctx.query.pageSize || config.pageSize;
    const data = await ctx.service.curd.select(tableName, pageIndex, pageSize);
    ctx.body = data;
  }

  async getByTableIdAndId() {
    const { ctx, service } = this;
    let tableId = ctx.params.tableId;
    let tableName = await this.getTableNameById(tableId);
    let id = ctx.params.id;
    let data = await ctx.service.curd.tableName(tbName, id);
    ctx.body = data;
  }

  async delByTableId() {
    const { ctx, service } = this;
    let tableId = ctx.params.tableId;
    let tableName = await this.getTableNameById(tableId);
    let id = ctx.params.id;
    let result = await ctx.service.curd.del(tableName, id);
    ctx.body = result;
  }

  async addByTableId() {
    const { ctx, service } = this;
    let tableId = ctx.params.tableId;
    let tableName = await this.getTableNameById(tableId);
    let data = ctx.request.body;
    let result = await ctx.service.curd.add(tableName, data);
    ctx.body = result;
  }

  async updateByTableId() {
    const { ctx, service } = this;
    let tableId = ctx.params.tableId;
    let tableName = await this.getTableNameById(tableId);
    let data = ctx.request.body;
    let result = await ctx.service.curd.update(tableName, data);
    ctx.body = result;
  }
}

module.exports = CurdController;
