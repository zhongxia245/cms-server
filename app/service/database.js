/**
 * 2018-03-11 12:39:28
 */
const Service = require('egg').Service;

class DatabaseService extends Service {

  async getTables(dbName) {
    let tables = await this.app.mysql.query(`
      select TABLE_SCHEMA,TABLE_NAME,TABLE_ROWS,TABLE_COMMENT 
      from information_schema.TABLES 
      where table_schema = '${dbName}'`
    );
    return tables;
  }

  async getColumnsByTable(tableName) {
    let tables = await this.app.mysql.query(`
      select TABLE_SCHEMA,TABLE_NAME,COLUMN_NAME,DATA_TYPE,COLUMN_COMMENT from information_schema.columns 
      where table_name = '${tableName}'`
    );
    return tables;
  }
}

module.exports = DatabaseService;