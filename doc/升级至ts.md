## 项目由js升级至ts
---
> 由于客户端以及后台管理站点都是ts维护的，借此机会，顺便讲当前项目也升级至ts，提升项目的自我检测内容，更早地发现和解决问题！以下是整个升级的完整过程：

#### 1. 初始化TypeScript配置
> 在项目根目录运行以下命令来生成`ts.config.json`文件
```bash
	npx tsc --init
```

#### 2. 安装必要的依赖
> 安装`TypeScript`以及类型定义文件
```bash
	pnpm i --save-dev typescript @types/node @types/express
```

#### 3. 重命名文件扩展名
> 将所有的`*.js`文件重命名为`*.ts`

#### 4. 处理`TypeScript`的类型检查
1. 为变量、函数参数和返回值添加类型注解；
2. 将所有的`require`语句改为`import`语句；
3. 确保所有的模块导入和导出符合`ES6`的模块规范；
```typescript
	import express, { Request, Response } from 'express';
```

#### 5. 修复类型错误
> `TypeScript`一般会报告一些类型错误，我们需要逐个处理这些错误，并确保代码通过类型检查
> 比如，我们在中间件中的`Response`中加入我们自定义的`success`以及`fail`方法，用来作为业务成功/失败的统一方法，在开始转换之后，会提示：`Property 'failed' does not exist on type 'Response<any, Record<string, any>>'.`这样子的错误，而且这个是针对于全局的中间件而言的，因此我们需要针对这种情况，加入一个全局类型支撑的配置

1. 在项目中新增一文件夹`types`，作为项目的类型声明文件目录；
2. 然后在该目录中添加`types/express/index.d.ts`，在这个文件中进行`Response`接口的扩展，内容如下：
```typescript
import express from "express";
declare global {
	namespace Express {
		export interface Response {
			success: (payload: any, msg?: string) => void,
			failed: (status: number, payload: any, msg: string) => {}
		}
		export interface Request {
			user?: any
		}
	}
}
```
3. 确保`TypeScript`能够识别到这个文件，在`ts.config.json`中进行声明：
```json
{
	"compilerOptions": {
		"typeRoots": ["./types/express/index.d.ts", "./node_modules/@types"]
	}
}
```
:trollface: 这样子之后，就再也不会出现在`Response`中找不到这个`success`以及`failed`方法了

#### 6. 更新运行脚本
> 修改`package.json`中的脚本，将`tsc`命令集成进去
```json
{
	"script": {
		"serve": "nodemon --exec ts-node index.ts",
	}
}
```