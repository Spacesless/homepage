/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  const config = {
    session: {
      key: 'EGG_SESS',
      maxAge: 30 * 24 * 3600 * 1000, // 30 天
      httpOnly: true,
      encrypt: true,
    },
    mysql: {
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'homepage',
        // 密码
        password: 'jsjMjNwPkMXGiAeS',
        // 数据库名
        database: 'homepage',
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  };

  return config;
};
