import { Router } from 'express';

import MetaController from './controllers/meta.controller';
// import AuthController from './controllers/auth.controller';
// import UsersController from './controllers/users.controller';
import TrackController from './controllers/track.controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);

// Authentication
// routes.post('/auth/login', AuthController.login);

// Users
// routes.get('/users', UsersController.search);
// routes.post('/users', UsersController.create);
// routes.get('/users/me', authenticate, UsersController.fetch);
// routes.put('/users/me', authenticate, UsersController.update);
// routes.delete('/users/me', authenticate, UsersController.delete);
// routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// Admin
// routes.get('/admin', accessControl('admin'), MetaController.index);
routes.get('/track/list', TrackController.list);
routes.post('/track/start', TrackController.start);
routes.post('/track/:id/stop', TrackController.stop);
// routes.get('/track/search', TrackController.search);
routes.delete('/track/:id', TrackController.delete)
// routes.get('/history');

routes.use(errorHandler);

export default routes;
