'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

  async index() {
    this.ctx.body = 'hi, user';
  }

  async select() {
    const { ctx, service, config } = this;
    let pageIndex = ctx.params.pageIndex;
    let pageSize = ctx.params.pageSize || config.pageSize;
    const users = await ctx.service.user.select(pageIndex, pageSize);
    ctx.body = users;
  }

  async getById() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let user = await ctx.service.user.getById(id);
    ctx.body = user;
  }

  async del() {
    const { ctx, service } = this;
    let id = ctx.params.id;
    let result = await ctx.service.user.del(id);
    ctx.body = result;
  }

  async add() {
    const { ctx, service } = this;
    let user = ctx.request.body;
    let result = await ctx.service.user.add(user);
    ctx.body = result;
  }

  async update() {
    const { ctx, service } = this;
    let user = ctx.request.body;
    let result = await ctx.service.user.update(user);
    ctx.body = result;
  }
}

module.exports = UserController;
