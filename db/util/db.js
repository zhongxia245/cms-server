/**
 * 数据库操作文件
 */
const mysql = require('mysql2')

const defaultConfig = require('../../config/config.default.js')
const dbConfig = defaultConfig({ baseDir: '' }).mysql.client

const pool = mysql.createPool(dbConfig)

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}
