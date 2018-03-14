/**
 * 2018-03-11 12:39:28
 * 通用的增删改查
 * 如果需要特殊定制，则单独处理
 */
const Service = require('egg').Service;

class CurdService extends Service {

  async select(tbName, pageIndex = 1, { pageSize, ...otherFilter }) {
    // 移除空的过滤条件
    for (const key in otherFilter) {
      if (otherFilter.hasOwnProperty(key)) {
        if (!otherFilter[key]) {
          delete otherFilter[key]
        }
      }
    }

    pageSize = parseInt(pageSize)
    const total = await this.app.mysql.count(tbName, otherFilter);
    const data = await this.app.mysql.select(tbName, {
      where: otherFilter || {},
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      orders: [['id']]
    });
    return { data: data, total: total };
  }

  async getById(tbName, id) {
    const data = await this.app.mysql.get(tbName, { id: id });
    return data;
  }


  async add(tbName, data) {
    const result = await this.app.mysql.insert(tbName, data);
    return result;
  }

  // 支持批量删除，批量用 , 隔开
  async del(tbName, ids) {
    const result = await this.app.mysql.delete(tbName, { id: ids.split(',') });
    return result;
  }

  async update(tbName, data) {
    const result = await this.app.mysql.update(tbName, data);
    return result
  }
}

module.exports = CurdService;