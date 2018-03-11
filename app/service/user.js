const Service = require('egg').Service;

class UserService extends Service {

  async select(pageIndex = 1, pageSize = 10) {
    const total = await this.app.mysql.count('tb_users')
    const users = await this.app.mysql.select('tb_users', {
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize
    });
    return { data: users, total: total };
  }

  async getById(id) {
    const user = await this.app.mysql.get('tb_users', { id: id });
    return user;
  }

  async getByUsernameAndPassword(username, password) {
    const user = await this.app.mysql.get('tb_users', { username: username, password: password });
    return user;
  }

  async add(user) {
    const result = await this.app.mysql.insert('tb_users', user);
    return result;
  }

  // 支持批量删除，批量用 , 隔开
  async del(ids) {
    const result = await this.app.mysql.delete('tb_users', { id: ids.split(',') });
    return result;
  }

  async update(user) {
    const result = await this.app.mysql.update('tb_users', user);
    return result
  }

  async isExistUsername(username) {
    const users = await this.app.mysql.get('tb_users', { username: username });
    if (users) return true
    return false
  }
}

module.exports = UserService;