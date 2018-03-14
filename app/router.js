'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // login
  router.post('/api/login', controller.login.login);
  router.post('/api/register', controller.login.register);

  // database
  router.get('/api/database/:dbName', controller.database.getTables);
  router.get('/api/database/:tableName/columns', controller.database.getColumnsByTable);

  // simple curd
  router.get('/api/curd/:tableName/:id', controller.curd.getById);
  router.get('/api/curd/select/:tableName/:pageIndex', controller.curd.select);
  router.put('/api/curd/:tableName', controller.curd.update);
  router.post('/api/curd/:tableName', controller.curd.add);
  router.delete('/api/curd/:tableName/:id', controller.curd.del);

  // tableconfig 
  router.get('/api/tableconfig/:id', controller.tableconfig.getById);
  router.post('/api/tableconfig/:tableName', controller.tableconfig.addTableAndColumns);
  router.delete('/api/tableconfig/:id', controller.tableconfig.delTableAndColumns);

  // tableFieldConfig 
  router.get('/api/tablefieldconfig/:tableId', controller.tablefieldconfig.getByTableId);
  router.get('/api/tablefieldconfig/:tableName/:pageIndex', controller.tablefieldconfig.select);
};
