'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  async index() {
    this.ctx.body = 'hi, login';
  }

  async login() {
    const { ctx, service } = this;
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    const user = await ctx.service.user.getByUsernameAndPassword(username, password);
    if (user) {
      ctx.cookies.set('username', user.username, { encrypt: true })
      ctx.body = { code: 0, data: user }
    } else {
      ctx.cookies.set('username', '')
      ctx.body = { code: 404, data: '帐号或者密码不正确!' }
    }
  }

  async register() {
    const { ctx, service } = this;
    let user = ctx.query
    let isExistUserName = await ctx.service.user.isExistUsername(user.username)
    if (!isExistUserName) {
      const result = await ctx.service.user.add(user);
      if (result) {
        ctx.body = { code: 0, data: result.insertId }
      } else {
        ctx.body = { code: 500, data: '注册用户失败，请检查帐号密码！' }
      }
    } else {
      ctx.body = { code: 500, data: '用户名已存在!' }
    }
  }

  async logout() {
    this.ctx.body = '注销'
  }
}

module.exports = LoginController;
