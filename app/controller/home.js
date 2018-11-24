'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const token = this.app.jwt.sign({ name: 'zhongxia', id: 1 }, this.config.jwt.secret, {
      expiresIn: 60 * 1 * 1, // 授权时效24小时
    });
    this.ctx.body = `curl -H "Authorization: Bearer ${token}" http://localhost:7001/api/auth`;
  }

  async auth() {
    this.ctx.body = '已经登录，可以查看内容';
  }

  async noAuth() {
    this.ctx.body = '未登录也可以查看哦';
  }
}

module.exports = HomeController;
