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
##### 1. 安装`tsoa`库
```shell
	pnpm i tsoa 
```
##### 2. 创建`tsoa.json`配置文件
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

##### 3. 维护`tsoa`的相关脚本到项目中
在项目中中`package.json`中维护相关的`tsoa`脚本命令
```json
{
	"script": {
		"build-openapi": "tsoa spec",
    "build-routes": "tsoa routes --verbose",
    "build-doc": "tsoa spec-and-routes",
		"serve": "pnpm build-doc && nodemon --exec ts-node -r tsconfig-paths/register index.ts"
	}
}
```
上述我们创建了3个脚本，`tsoa spec` 用来根据当前配置的`*Controller.ts`中维护的配置来生成`swagger.json`文件，`tsoa routes --verbose`则用来根据这个`*Controller.ts`来生成对应的`routes.ts`项目中的路由，这个`tsoa spec-and-routes`则用来同时生成这两个文件！

##### 4. 浏览路由配置文件，安装`@tsoa/runtime`依赖
```typescript
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
export function RegisterRoutes(app: Router) {
	// ... 路由的注册相关代码逻辑
}
```
:point_right: 由于生成的路由配置文件依赖于`@tsoa/runtime`，因此，需要安装对应的依赖到项目中！

##### 5. 在应用的入口文件`index.ts`中导入`RegisterRoutes`，配置路由对应的中间件
```typescript
import express from 'express'
import { RegisterRoutes } from './build/routes';
RegisterRoutes(app)
const app = express();
```
通过上述的代码，将`*Controller.ts`中定义的动作与路由给捆绑到一起，使得我们编写的Controller的方法能够响应对应的路由

##### 6. 根据生成的`swagger.json`来生成服务的openAPI文档
```typescript
// swagger-doc-middleware.ts
import swaggerUI from 'swagger-ui-express'
import { Express, Request, Response } from 'express'

export function setupSwagger(app: Express){
	app.use('/api-docs', swaggerUI.serve, async (req: Request, res: Response) => {
		return res.send(swaggerUI.generateHTML(await import('../build/swagger.json')))
	})
}
// index.ts
import express from 'express'
const app = express();
setupSwagger(app);
```
将`tsoa spec`生成的`/build/swagger.json`配置文件采用`swagger-ui-express`进行加载并渲染对应的内容(也就是使用swaggerUI来生成静态站点资源)，并挂载到路径`api-docs`上，于是，我们可以通过访问`http://localhost:3000/api-docs`来访问到对应的接口站点文档信息，如下图所示：
![swagger接口文档站点.png](../assets/tsoa/swagger接口文档站点.png)

##### 7. 反向使用mongoost与tsoa，实现两者的关联
> 创建一`DTO`接口，在该接口中定义了所有`mongoose.model`所需要的参数，然后将其被`mongoose.model`所依赖导入，然后作为这个`mongoose.model`的类型参数来直接使用，如下所示：
```typescript
	import { UserDTO } from '/dto/UserDTO.ts'
	import mongoose from 'mongoose'
	const UserSchema = new mongoose.schema<UserDTO>({
		// ... 这里是mongoose数据库层面的字段校验
	})
	export const UserModel = mongoose.model('userModal', userSchema, "users")
```
:trollface: 这样子之后，这个`UserDTO`便与`UserModel`之间建立了一个联系！ :point_right: 我们就可以在对应的`*Controller.ts`中来指明这个响应的返回值，明确告知`tsoa`这个方法将返回的怎样的一个类型，让其能够自动生成对应的openAPI接口文档！

### 实践过程中的踩坑
> 本章节将记录在集成`tsoa`库的过程的坑，防止后续犯同样的错误！

#### 1. ts版本要求以及注解支持
> 根据`tsoa`的官方文档所描述的，由于是采用注解的方式的来编写的`Controller`，因此，需要保证这个ts版本是在5.0以上，而且，需要在这个`tsconfig.json`配置中加入以下的配置：
```json
{
	"experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```
否则将会出现以下的错误：
![识别不到方法中的注解.png](../assets/tsoa/识别不到方法中的注解.png)

#### 2. 追加对json文件的导入支持
> `typescript`原本不支持对`*.json`文件的支持的，需要在对应的`tsconfig.json`配置文件中加入以下的配置：
```json
{
	"resolveJsonModule": true
}
```

#### 3. 由于项目原本在`tsconfig.json`加入了别名配置，需要将其同步至`tsoa.json`中
```json
{
	"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/enum": ["./enum"],
      "@/entity": ["./entity"],
      "@/config": ["./config"],
      "@/control": ["./control"],
      "@/middleware": ["./middleware"],
      "@/model": ["./model"],
      "@/utils": ["./utils"]
    }
  }
}
```
只有将对应的别名同步到`tsoa.json`中，才能够使得`@/*`得以正常导入引用！否则将会爆找不到对应的依赖模块！

#### 4. 由于项目的别名机制，需要将`tsoa`也加入到别名的名单中
由于项目采用这个启动命令来加载(主要是为了能够让ts能够加载到别名文件)，具体见[官方描述](https://github.com/dividab/tsconfig-paths)
`nodemon --exec ts-node -r tsconfig-paths/register index.ts`
:point_right: 因此，需要在`tsconfig.json`中加入这个`tsoa`，使得程序能够识别到(否则就会报`tsoa TypeError: Class extends value undefined is not a constructor or null`)：
```json
{
	"compilerOptions": {
    "baseUrl": "./",
    "paths": {
      //... 此处隐藏其他的配置
      "tsoa": ["node_modules/tsoa"]
    },
	}
}
```

#### 5. `tsoa`中的所需要的model类型必须是静态类型的，而非动态类型的
原本想着当前的项目采用的是`express` + `mongoose` + `tsoa`的，可以通过`mongoose.InferSchemaType`从`mongoose.schema`中获取到对应的类型，然后将这个类型直接丢给`Controller`来生成目标`schema`，可以节省一次同样代码的编写过程，结果被自己的小聪明给整了，因为这样子做的话，将提示：
`tsoa No matching model found for referenced type userSchema.`，这个问题与[网上别人提供的issue类似](https://github.com/lukeautry/tsoa/issues/1256)

:point_right: 最后只能是手写这个静态类型的DTO，这里我们编写是一个class，采用从`mogoose.schema`中导出来的`interface`来进行实现，免去了一个个属性的编写过程
```typescript
export class UserDTO implements IUser{
	// 然后自动fix相关的属性，然后在将这个IUser给删掉
}
```
```typescript
export class UserDTO {
	password!: string;
	/**
	 * 用户邮箱
	 * @example "kbmjj123@gmail.com"
	*/
	email!: string;
	/**
	 * 用户角色
	*/
	role!: "user" | "admin";
	refreshToken?: string | null | undefined;
	accessToken?: string | null | undefined;
	nickName?: string | null | undefined;
	avatar?: string | null | undefined;
	address?: Types.ObjectId | null | undefined;
	loginTime?: Date | null | undefined;
	logoutTime?: Date | null | undefined;
	account?: string | null | undefined;
}
```

#### 6. `tsoa`结合`express-validator`进行字段精细化校验
> 在进行请求参数的校验的时候，原本`tsoa`本身已经提供基于数据类型的校验了，但是，我们可以借助于`express-validator`进行颗粒度更细的校验规则，我们所需要的仅仅是通过这个库，来创建对应的一个数组即可，然后在数组的最后一个阶段进行参数的校验结果输出即可！
```typescript
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
// 创建一个参数校验数组
const validateProductMW = [
	body('cates').notEmpty().isArray(),
  body('productName', '请维护商品名称').notEmpty().trim().isLength({ max: 60 }),
	(req: Request, res: Response, next: NextFunction) => {
		const errorResult = validationResult(req);  // 统一从req中获取校验执行结果
		if (errorResult && errorResult.array().length > 0) {
			//? 有存在校验不通过的情况，将不通过的情况进行统一的格式化输出
			res.failed(LogicResult.PARAMS_ERROR, {
				errors: errorResult.array()
			}, req.t('tip.paramsError'))
		} else {
			next()
		}
	}
]
export class ProductController extends Controller {
	@Put('publish')
	@Middlewares(validateProductMW)
	public async createProduct(@Request() req: ExpressRequest, @Body() params: any): Promise<BaseObjectEntity<string>> {}
}
```
:trollface: 这里通过对某个请求进行中间件拦截，而无需在每一个路由中去进行配置，可大大地减少手动更改路由的情况，而且，本来这个`tsoa`每次都会根据当前的代码来生成新的路由的，因此更加将代码与文档自动化紧密结合到了一起了！

### `tsoa`最佳实践

#### 1. 同一个`*DTO`多子类型的响应/参数控制
> 在实际的coding过程中，针对统一个业务模块，不同的接口所需的参数一般是不一样的，比如我们用户登录，一般需要账号以及密码来进行登录，但是获取去用户信息的时候，则需要用户的id或获取对应的用户详细信息，如果一个个的类型去复制粘贴的话，一旦调整某个字段，则都要去批量修改一系列文件中同名的字段，这样子不够友好，维护成本较大，因此这边采用了另外一种机制类进行同一模块下的参数/响应数据的类型管理机制！
> :point_right: 借助于`typescript`的`Pick`以及`Omit`(当然还有其他)等类型工具，实现从一个基础类中进行“新类”的创建与合成。
> 一般的，我们可定义这样子的一个基础类型：
```typescript
export interface UserDTO {
	/**
	 * 用户id
	*/
	id: string;
	/**
	 * 用户昵称
	*/
	name: string;
	/**
	 * 用户密码
	*/
	password: string;
	/**
	 * 用户头像
	*/
	avatar: string;
	/**
	 * 用户邮箱
	*/
	email: string;
	/**
	 * 用户账号
	*/
	account: string
}
```
:+1: 然后根据实际业务应用场景，从这个`UserDTO`中“衍生”出新的类型，就算是后续新增的属性字段，也是将该字段维护到基础的类型中，然后在此基础上，借助于`Pick`或者`Omit`以及其他的类型来辅助输出新的类型
```typescript
	export type UserWithoutIdDTO = Omit<UserDTO, 'id'>
	export type UserAccountDTO = Pick<UserDTO, 'account' | 'email' | 'password'>
```
然后将导出的类型直接在对应的`*Controller.ts`中使用，来实现注释的同一套引用的目的！

#### 2. 生成的`swagger`接口文档支持在线调用，且配置上对应的请求头等基础配置
> 我们在调试接口的时候，一般情况下，都会使用这个自定义的请求头来满足实际业务的开发需要，既然我们生成了自己服务的接口文档，那么 :thinking: 是否可以在这个运行的接口文档中来直接调试接口文档呢？如果业务有需要追加的公共的请求头，比如在header中追加`platform=web`的请求头，但又不想在这个`swagger`中去一个接口手动追加，而且这个文档每次都是动态生成的！
> :thinking: 这里我们可以借助于`express-swagger-ui`在根据生成的`swagger.json`文档来渲染对应的站点信息的时候，追加多一个自定义的请求拦截器，如下代码所示(下述代码将对比两种不一样的渲染方式)：
```typescript
import { Express, Request, Response } from 'express'
import swaggerUI from 'swagger-ui-express'
export function setupSwagger(app: Express)
// 方式一： 直接从`swagger.json`中加载然后直接渲染
	app.use('/api-docs', swaggerUI.serve, async (req: Request, res: Response) => {
		return res.send(swaggerUI.generateHTML(await import('../build/swagger.json')))
	})
// 方式二: 采用函数式的方式来从文件中加载，提供更多的控制
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(undefined, {
		swaggerUrl: '../swagger.json',
		swaggerOptions: {
			requestInterceptor: (req: Request) => {
				req.headers['platform'] = 'web'
				return req
			}
		}
	}))
	// 这里需要制定使用的静态文件目录，使得程序能够访问到生成的静态资源swagger.json
	app.use(express.static('build'))
```
:stars: 通过上述的方式，我们可以实现在生成的`swagger`文档中调试自动追加自己所需的逻辑

## tsoa的相关知识补充
> TSOA 是一个用于在 TypeScript 中自动生成 `Swagger` 文档和 `API` 路由的开源库。它简化了构建 `RESTful API` 的过程，并确保 `API` 的类型安全。`TSOA` 的全称是 `TypeScript OpenAPI`，它是基于 `TypeScript` 和 `Express`（或 `Koa` 等其他框架）构建的。
> 它一般有如下几个方面的功能：
1. 自动生成 `Swagger` 文档: `TSOA` 会根据在 `TypeScript` 中定义的控制器和路由，自动生成符合 `OpenAPI（Swagger）`规范的文档，使得我们的 `API` 文档总是与实际代码同步，并且可以直接在`Swagger UI` 中展示和测试；
2. 类型安全：`TSOA` 利用 `TypeScript` 的类型系统来确保路由、请求参数、响应数据等都符合预期的类型，这减少了运行时错误并提高了开发效率；
3. 自动生成路由：`TSOA` 可以自动生成与控制器方法对应的 `Express` 或 `Koa` 路由，这减少了手动配置路由的工作量，并避免了潜在的配置错误；
4. 中间件支持：`TSOA` 支持使用自定义的中间件，如*认证、验证*等，确保 `API` 的安全性和数据的正确性

