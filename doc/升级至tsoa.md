## 项目背景
---
> 目前项目的基本框架已经满足日常的开发，但是，目前遇到一个更加棘手的问题，就是如何维护项目的swagger接口文档，目前可以有两种方式：
1. 手写`swagger.json`或者`swagger.yaml`，在这个文档中一个个去维护每个接口协议；
2. 借助于`swagger-ui`以及`swagger-doc`，自动根据编写的注释来生成接口文档

:face_exhaling: 但是，上述的两种方式，基本上都是手写协议，跟代码无法建立联系(意思是代码与这个协议之间没有必然的联系，一旦修改了代码，还要手动地去修改协议)，这无疑会增加协议的维护成本。

:thinking: 那么是否可以拥有那么一种方式，可以从我们的代码中自动生成接口协议文档，当我们修改了接口协议代码时，相应地更新为最新的接口文档这样子！

### tsoa
> 目前的项目采用的是`typescript` + `express` + `mongoose`的简单架构方式，不能够满足于上述的要求！
> 因此，这边引入了新的库[tsoa](https://tsoa-community.github.io/docs/)
> 关于这个`tsoa`的官方介绍描述如下：
> `tsoa` 是一个集成了 `OpenAPI` 编译器的框架，可使用 `TypeScript` 构建 `Node.js` 服务端应用程序。它可以在运行时定位 express、hapi、koa 和更多框架。tsoa 应用程序默认是类型安全的，并且可以无缝处理运行时验证。

#### 在现有项目中集成`tsoa`库
1. 安装`tsoa`库
```shell
	pnpm i tsoa 
```
2. 创建`tsoa.json`配置文件
```json
{
	"entryFile": "index.ts",
	"noImlicitAdditionalProperties": "throw-on-extras",
	"controllerPathGlobs": ["/**/*Controller.ts"],
	"spec": {
		"outputDirectory": "build",
		"specVersion": 3
	},
	"routes": {
		"routesDir": "build"
	}
}
```
:thinking: 这里我们指定`index.ts`作为应用程序的入口文件，所引用的`Controller`为`controller`目录中的`*Controller.ts`文件，然后生成的`swagger.json`配置文件，将使用的版本是3系列的openAPI，目录为`build`目录，接着定义即将生成的路由配置文件`routes`将位于`build`目录中！
:point_right: 关于这个`tsoa.json`配置文件中的其他参数描述，具体见[官方tsoa配置说明](https://tsoa-community.github.io/reference/interfaces/_tsoa_cli.Config.html)
3. 