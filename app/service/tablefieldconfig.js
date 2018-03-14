/**
 * 2018-03-11 14:37:18
 * 表格配置
 */
const Service = require('egg').Service;

class TableFieldConfigService extends Service {

  async getByTableId(tableId) {
    const data = await this.app.mysql.select('c_tablefieldconfig', {
      where: { table_id: tableId },
      orders: [['col_sort']]
    });
    return data;
  }

  async select(tableName, pageIndex = 1, pageSize = 10) {
    const total = await this.app.mysql.count('c_tablefieldconfig')
    const data = await this.app.mysql.select('c_tablefieldconfig', {
      where: {
        table_name: tableName,
      },
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
    });
    return { data: data, total: total };
  }

  async getById(id) {
    const data = await this.app.mysql.get('c_tablefieldconfig', { id: id });
    return data;
  }

  async add(data) {
    const result = await this.app.mysql.insert('c_tablefieldconfig', data);
    return result;
  }

  // 支持批量删除，批量用 , 隔开
  async del(ids) {
    const result = await this.app.mysql.delete('c_tablefieldconfig', { id: ids.split(',') });
    return result;
  }

  // 支持批量删除，批量用 , 隔开
  async delByTableId(tableId) {
    const result = await this.app.mysql.delete('c_tablefieldconfig', { table_id: tableId });
    return result;
  }

  async update(data) {
    const result = await this.app.mysql.update('c_tablefieldconfig', data);
    return result
  }
}

module.exports = TableFieldConfigService;