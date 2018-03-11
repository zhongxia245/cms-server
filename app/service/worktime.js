const Service = require('egg').Service;

class WorkTimeService extends Service {
  async findAll(pageIndex = 1, pageSize = 10) {
    const total = await this.app.mysql.count('tb_worktimes')
    const result = await this.app.mysql.select('tb_worktimes', {
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize
    });
    return { data: result, total: total };
  }

  async add(worktime) {
    const result = await this.app.mysql.insert('tb_worktimes', worktime);
    return result;
  }

  async getYearDuration(startTime, endTime) {
    const worktimes = await this.app.mysql.select('tb_worktimes', { start_time: startTime, end_time: endTime });
    return worktimes
  }

  async del(id) {
    const users = await this.app.mysql.update('tb_worktimes', { id: id, disabled: 1 });
    if (users) return true
    return false
  }
}

module.exports = WorkTimeService;