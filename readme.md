### 简介

alphatr-stat 是一个使用 ThinkJS 搭建的 Google Analytics 服务端调用服务；

具体参照我博客的文章：[服务端使用 Google Analytics](https://blog.alphatr.com/google-analytics-on-server.html)

### 怎么使用

#### 1. 克隆项目代码

```bash
git clone https://github.com/AlphaTr/alphatr-stat
```

#### 2. 安装依赖

进入到项目目录 `alphatr-stat` 中，使用 npm 安装依赖（推荐使用 npm.taobao.org 安装源来安装）

```bash
npm install
```

#### 3. 建立软链

开发环境下，在 `www` 目录下建立指向 `develop.js` 的 `index.js` 链接，线上环境建立指向 `online.js` 的链接

```bash
ln -s develop.js index.js
```

#### 4. 修改 nginx 配置并添加到 nginx 配置文件中

修改 `config` 目录下 `develop.conf` 和 `online.conf` 文件中的域名信息，并根据不同的环境将 nginx 配置文件 include 到 nginx 的主配置文件中，重启 nginx 使配置文件生效；

#### 5. 启动 node 服务

在项目目录下执行 `node www/index.js` 启动服务，线上环境建议使用 pm2 来进行管理，在项目目录下执行 `pm2 start ./pm2.json` 调用 pm2 启动服务。
