'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  // login
  router.get('/api/login', controller.login.login);
  router.get('/api/register', controller.login.register);

  // user
  router.get('/api/user/:id', controller.user.getById);
  router.get('/api/user/select/:pageIndex', controller.user.select);
  router.post('/api/user/update', controller.user.update);
  router.post('/api/user/add', controller.user.add);
  router.get('/api/user/del/:id', controller.user.del);

  // worktime
  router.get('/api/worktime/add', controller.worktime.add);
  router.get('/api/worktime/del', controller.worktime.del);
  router.get('/api/worktime/:pageIndex', controller.worktime.select);

  // database
  router.get('/api/database/:dbName', controller.database.getTables);
  router.get('/api/database/:tableName/columns', controller.database.getColumnsByTable);

  // simple curd
  router.get('/api/curd/:tableName/:id', controller.curd.getById);
  router.get('/api/curd/select/:tableName/:pageIndex', controller.curd.select);
  router.put('/api/curd/:tableName', controller.curd.update);
  router.post('/api/curd/:tableName', controller.curd.add);
  router.delete('/api/curd/:tableName/:id', controller.curd.del);

  //  simple curd by tableid
  router.get('/api/curd_id/:tableId/:id', controller.curd.getByTableIdAndId);
  router.get('/api/curd_id/select/:tableId/:pageIndex', controller.curd.selectByTableId);
  router.put('/api/curd_id/:tableId', controller.curd.updateByTableId);
  router.post('/api/curd_id/:tableId', controller.curd.addByTableId);
  router.delete('/api/curd_id/:tableId/:id', controller.curd.delByTableId);

  // tableconfig 
  router.get('/api/tableconfig/:id', controller.tableconfig.getById);
  router.post('/api/tableconfig/:tableName', controller.tableconfig.addTableAndColumns);
  router.delete('/api/tableconfig/:id', controller.tableconfig.delTableAndColumns);

  // tableFieldConfig 
  router.get('/api/tablefieldconfig/:tableId', controller.tablefieldconfig.getByTableId);
  router.get('/api/tablefieldconfig/:tableName/:pageIndex', controller.tablefieldconfig.select);
};
