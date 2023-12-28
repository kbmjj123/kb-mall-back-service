# mongodb-backend-nodejs

## 前言
> 作为学习mongodb后台服务编程的demo项目，从0到1搭建相应的代码目录框架。
> 并以此来提升关于`nodejs`学习的熟悉程度

## 目录结构说明
```
mongodb-backend-nodejs
├─ LICENSE
├─ README.md
├─ assets
│  ├─ watch模式启动服务.png
│  ├─ 目录结构.png
│  └─ 访问不存在的链接异常结果.png
├─ config
├─ control
├─ index.js
├─ middleware
│  ├─ not-found-middleware.js
│  └─ service-error-middleware.js
├─ model
│  └─ userModel.js
└─ package.json
```

## 启动命令
> 一般地，我们采用`node index.js`的方式来启动一个程序，😣 但是，在实际的编码过程中，我们会经常更改相关的程序文件，每次都需要关掉旧服务，并重新开启新的服务，因此，可以借助于新的一个库：`nodemon`，关于这个库的说明，详情见 [官网](https://www.npmjs.com/package/nodemon)，通过使用这个`nodeman`命令，可以实现免重启服务实现代码的更新！
```shell
  nodeman index.js
```
这边同时将执行服务的命令，维护到`package.json`中的`script`节点中，并执行详情的命令，效果如下：
![nodemon执行结果](./assets/访问不存在的链接异常结果.png)

## 三方库依赖说明
> 👇 整理了关于本项目中在coding过程中所使用的三方依赖库说明清单：

| 依赖名称 | 描述 | 相关地址 |
|---|---|---|
| express | nodesj轻量级服务库 | ![官方地址](https://expressjs.com/) |
| mongoose | mongodb的ogm | ![官方地址](https://mongoosejs.com/) |
| bcrypt | 加密库，用于加密以及密码校验用途 | ![库地址](https://www.npmjs.com/package/bcrypt) |
| jsonwebtoken | 用于token的校验和处理工作 | ![库地址](https://www.npmjs.com/package/jsonwebtoken) |
|  |  |  |
|  |  |  |

## express官方的中间件以及自定义中间件
> 使用`express`来开发的话，一般会配套使用官方所提供的中间件， 👇 是对应的官方中间件说明清单：

| 中间件名称 | 描述 |
|---|:---|
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

### 本地自定义中间件
> 因实际业务开发需要，针对业务进行相应的本地化中间件开发，以便于满足项目的变动发展诉求， 👇 是对应的自定义本地中间件说明清单：

| 中间件名称 | 描述 |
|---|:---|
| not-found-middleware | 找不到服务，也就是404 |
| service-error-middleware | 统一的异常处理中间件 |
|  |  |
|  |  |
|  |  |


## 项目过程记录
> 此目录以及后续的内容，将记录整个项目过程中的笔记，便于后续跟踪与反查问题！！

### 根据标准的MVC理念，创建好对应的文件资源目录，如下图所示：
  ![文件资源目录](./assets/目录结构.png)

### 创建完成404以及公共的异常处理中间件(具体见两中间件的代码内容)，并做对应的测试验证：
```javascript
app.get('/login', (req, res, next) => {
  const error = new Error('自定义异常信息')
  throw error;
})
```
![404异常](./assets/访问不存在的链接异常结果.png)

### 根据业务实际场景，将项目拆分为不同的模块，同时对应于不同的路由模块，同时借鉴于前端模块化开发的方式，将所有的路由模块采用对外仅暴露一个入口的方式 
```javascript
  const userRouter = require('./userRouter')
  // 这里采用对外暴露一个接收app应用程序入口的方式，来对外隐藏注册的方式
  module.exports = app => {
    app.use('/user', userRouter);
  }
```
