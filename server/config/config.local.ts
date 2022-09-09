import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
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
        user: '',
        // 密码
        password: '',
        // 数据库名
        database: 'homepage',
      },
    },
  };
  return config;
};
