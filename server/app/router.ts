import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/logout', controller.user.logout);
  router.post('/api/user/check-username', controller.user.checkUsername);
  router.post('/api/user/check-answer', controller.user.checkAnswer);
  router.post('/api/user/reset', controller.user.reset);
  // RESTful Api
  router.resources('setting', '/api/setting', controller.setting);
};
