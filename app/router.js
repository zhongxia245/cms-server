'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/api/auth', app.jwt, controller.home.auth);
  router.get('/api/noauth', controller.home.noAuth);

  // login
  router.post('/api/login', controller.login.login);
  router.post('/api/register', controller.login.register);

  // database
  router.get('/api/database/:dbName', app.jwt, controller.database.getTables);
  router.get('/api/database/:tableName/columns', app.jwt, controller.database.getColumnsByTable);

  // simple curd
  router.get('/api/curd/:tableName/:id', app.jwt, controller.curd.getById);
  // router.get('/api/curd/select/:tableName/:pageIndex', app.jwt, controller.curd.select)
  router.get('/api/curd/select/:tableName/:pageIndex', controller.curd.select);
  router.put('/api/curd/:tableName', app.jwt, controller.curd.update);
  router.post('/api/curd/:tableName', app.jwt, controller.curd.add);
  router.delete('/api/curd/:tableName/:id', app.jwt, controller.curd.del);

  // tableconfig
  router.get('/api/tableconfig/:id', app.jwt, controller.tableconfig.getById);
  router.post('/api/tableconfig/:tableName', app.jwt, controller.tableconfig.addTableAndColumns);
  router.delete('/api/tableconfig/:id', app.jwt, controller.tableconfig.delTableAndColumns);

  // tableFieldConfig
  router.get('/api/tablefieldconfig/:tableId', app.jwt, controller.tablefieldconfig.getByTableId);
  router.get('/api/tablefieldconfig/:tableName/:pageIndex', app.jwt, controller.tablefieldconfig.select);
};
