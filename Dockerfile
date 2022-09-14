FROM nginx:1.18.0-alpine
FROM node:alpine

# 前台
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY client/dist /usr/share/nginx/html/

# 后台
WORKDIR /usr/www/egg

# 先拷贝package.json文件到工作目录
COPY package.json /usr/www/egg/package.json
# 安装npm依赖(使用淘宝的镜像源)
RUN npm i --production --registry=https://registry.npmmirror.com

# 拷贝所有源代码到工作目
COPY server/app /usr/www/egg/app
COPY server/config /usr/www/egg/config
COPY server/typings /usr/www/egg/typings

# 创建容器时运行
CMD npm run start
