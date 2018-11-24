/**
 * 2018-03-11 12:39:28
 * 通用的增删改查
 * 如果需要特殊定制，则单独处理
 */
const Service = require('egg').Service

class CurdService extends Service {
  async getDatabase(tbName) {
    const { service, app } = this.ctx
    app.dbs = app.dbs || {}

    let dbsConfig = await service.database.getDataBaseByTableName(tbName)
    let mysqlConfig = dbsConfig[0]
    // 如果不存在表对应的数据库，则表示该表是通用后台表
    if (!mysqlConfig) {
      return this.app.mysql
    }
    let dbName = mysqlConfig.database
    // 已经有实例则返回，否则创建数据库实例
    if (app.dbs[dbName]) {
      return app.dbs[dbName]
    } else {
      let mysqlInstance = await app.mysql.createInstanceAsync(mysqlConfig)
      app.dbs[dbName] = mysqlInstance
      return mysqlInstance
    }
  }

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

    let mysql = await this.getDatabase(tbName)

    const total = await mysql.count(tbName, otherFilter)
    const data = await mysql.select(tbName, {
      where: otherFilter || {},
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      orders: [['id']]
    })
    return { data: data, total: total }
  }

  async getById(tbName, id) {
    let mysql = await this.getDatabase(tbName)
    const data = await mysql.get(tbName, { id: id })
    return data
  }

  async add(tbName, data) {
    let mysql = await this.getDatabase(tbName)
    const result = await mysql.insert(tbName, data)
    return result
  }

  // 支持批量删除，批量用 , 隔开
  async del(tbName, ids) {
    let mysql = await this.getDatabase(tbName)
    const result = await mysql.delete(tbName, { id: ids.split(',') })
    return result
  }

  async update(tbName, data) {
    let mysql = await this.getDatabase(tbName)
    const result = await mysql.update(tbName, data)
    return result
  }
}

module.exports = CurdService
