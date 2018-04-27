import * as express from 'express';

import ApiCtrl from './controllers/api';
import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const apiCtrl = new ApiCtrl();
  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Apis
  router.route('/apis').get(apiCtrl.getAll);
  router.route('/apis/count').get(apiCtrl.count);
  router.route('/api').post(apiCtrl.insert);
  router.route('/api/:id').get(apiCtrl.get);
  router.route('/api/:id').put(apiCtrl.update);
  router.route('/api/:id').delete(apiCtrl.delete);
  
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
