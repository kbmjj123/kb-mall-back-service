## mongoose知识补充
---

### mongoose中间件
> 在`mongoose`中，中间件(middleware)允许我们在某些*事件*发生之前或者之后执行特定的代码(即一个函数，是在异步函数执行期间传递控制的函数)，一般在编写mongoose插件很有用！

#### 中间件的类型
> 在`mongoose`中有4种类型的中间件
1. 文档中间件：与文档实例相关联，通常在处理单个文档时有效，可以绑定到的动作有：`validate`、`save`、`remove`、`updateOne`、`deleteOne`、`init`
2. 模型中间件：与整个模型(model)有关，通常在批量操作时使用，可以绑定到的动作有：`bulkWrite`、`createCollection`、`insertMany`
3. 聚合中间件：用于在执行`aggragate`操作前后执行的操作，一般用于处理复杂的数据库聚合操作，可以绑定到的动作有：`aggregate`
4. 查询中间件：在查询执行前后执行的操作，适用于各种查询操作，可以绑定到的动作有：`count`、`countDocuments`、`deleteMany`、`deleteOne`、`estimatedDocumentCount`、`find`、`findOne`、`findOneAndDelete`、`findoneAndReplace`、`findOneAndUpdate`、`remove`、`replaceOne`、`updateOne`、`updateMany`、`validate`

:thinking: 为什么要划分不同类型中间件呢？
:point_right: 原因是关于this上下文的指向问题，来看下面的一个例子：
```typescript
	// TranslatePlugin.ts
	import { Schema } from 'mongoose'
	export const TranslatePlugin = (schema: Schema, options: any) => {
		schema.pre('save', function(next) {
			// 这里是在文档发生保存动作之前的逻辑
			console.info(this)
			next()
		})
		schema.post('find', function(docs, next) {
			// 这里是在文档发生查询动作之后的逻辑
			console.info(this)
			next()
		})
	}
```
:star: 这里我们可以发现在使用`mongoose`的两个关键所在：
1. 定义的中间件回调函数必须是普通的函数来定义，而不能使用箭头函数，因为如果使用了箭头函数的时候，将会“挟持”上下文，使得this上下文发生紊乱，程序不能正常地运行；
2. 在不同类型的中间件中(比如上述的`find`与`save`)，`this`关键词所指向的对象是不同的，**在文档类型的中间件中，`this`指向的是文档对象，而在查询类型的中间件中，`this`指向的是`Query`查询动作本身**，区分这个`this`关键词的不同，将导致我们所编写的程度代码的逻辑不一样，比如这个取值！

:warning: 从上述我们可以发现在文档类型中间件以及查询类型中间件中有重复的可注册的动作，比如这个`updateOne`，或者是`deleteOne`，那么当我们通过`schema.pre('updateOne')`的时候，官方将默认注册的是查询类型的中间件， :point_right: 也就是在回调函数上下文中，`this`指向`Query`查询对象！
:thinking: 假如我们想要注册的是文档类型的中间件的话，可以在注册的时候，追加自定义参数对象，如下所示：
```typescript
	export const Plugin = (schema: Schema) => {
		schema.pre('updateOne', {
			document: true,
			query: false
		}, function(doc, next){
			next()
		})
	}
```

:warning: 关于这个模型中间件与文档中间件的区别，模型中间件挂接到`Model`类上的**静态函数**，文档中间件挂接到`Model`类上的**实例方法**，在模型中间件功能中，`this`指的是`Model`模型

### 自定义抽象封装
> 为统一管理db的相关操作，并结合当前项目多语言的特性，需要将db的相关操作进行统一管理，因此 :point_right: 引入后端开发中常用的`service`，讲目前在`*Controller`中直接操作`*Model`的相关逻辑，迁移至service层中的相关`*Service`文件中。

#### 统一公共的db操作:`IService.ts`
> :thinking: 但是，我又不想对不同的表编写相似度超过90%以上的相关的代码， :trollface: 所以，我还想顺便进行进一步的封装
> 自定义一`IService.ts`接口，将项目中可能遇见到的相关操作给定义出来(主要是一些增删查改操作)，如下代码所示：
```typescript
import { PageDTO, PageResultDTO } from '@/dto/PageDTO';
import { Request as ExpressRequest } from 'express'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export interface IService<T> {
	create(data: Partial<T>, req: ExpressRequest): Promise<T>;
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null>;
	findById(id: string, req: ExpressRequest): Promise<T | null>;
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T | null>;
	findListInPage(nameInCollection: string, pageInfo: PageDTO): Promise<PageResultDTO<T>>
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null>;
}
```

#### 实现公共的数据库操作: `BaseService.ts`
> 自定义公共的基础数据库服务，实现`IService.ts`接口中的所有方法，可免于在具体的业务`*Service`中去重复编写，如下代码所示(以下是一部分代码)：
```typescript
import { IService } from "./IService";
import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { Request as ExpressRequest } from "express";
import { PageDTO, PageResultDTO } from "@/dto/PageDTO";
import { PAGE_SIZE } from "@/config/ConstantValues";

/**
 * 数据库层面的基础服务，根据传递的参数，封装相关的数据库基本操作
*/
export class BaseService<T> implements IService<T> {
	private model: Model<T>;
	constructor(model: Model<T>) {
		this.model = model
	}
	/**
	 * 根据每次请求获取对应的语言信息配置
	 * @param req 发起的请求
	 * @param options db操作的相关配置
	 */
	protected getLanguageOptions(req: ExpressRequest, options: any = {}) {
		options['language'] = req.language
		return options
	}

	/**
	 * 往文档中追加语言信息
	 * @param req 客户端发起的请求
	 * @param doc 待操作的文档
	 */
	protected appendLanguageToDoc(req: ExpressRequest, doc: any) {
		doc['language'] = req.language
		return doc
	}

	create(data: Partial<T>, req: ExpressRequest): Promise<T> {
		this.appendLanguageToDoc(req, data)
		return this.model.create(data)
	}
	update(id: string, data: Partial<T>, req: ExpressRequest): Promise<T | null> {
		const options = this.getLanguageOptions(req, {})
		return this.model.findByIdAndUpdate(id, data).setOptions(options)
	}
	findById(id: string, req: ExpressRequest): Promise<T | null> {
		return this.model.findById(id).setOptions(this.getLanguageOptions(req, {}))
	}
	findOne(filter: FilterQuery<T> | undefined, req: ExpressRequest): Promise<T | null> {
		return this.model.findOne(filter).setOptions(this.getLanguageOptions(req))
	}
	/**
	 * 公共的分页查询方法
	 * @param nameInCollection 在collection中name的名称
	 * @param pageInfo 分页信息
	 * @returns 
	 */
	async findListInPage(nameInCollection: string, pageInfo: PageDTO): Promise<PageResultDTO<T>> {
		let { keyword, pageIndex = 1, pageSize = PAGE_SIZE } = pageInfo
		let resultArrayPromise = []
		if (keyword) {
			const regex = new RegExp(keyword as string, 'i')
			const query = {
				[nameInCollection]: { $regex: regex }
			} as FilterQuery<T>
			resultArrayPromise.push(this.model.countDocuments())
			resultArrayPromise.push(this.model.find(query).skip((Number(pageIndex - 1)) * Number(pageSize)).limit(Number(pageSize)))
		}else{
			resultArrayPromise.push(this.model.estimatedDocumentCount())
			resultArrayPromise.push(this.model.find().skip(pageIndex * pageSize).limit(pageSize))
		}
		let [total = 0, searchList = []] = await Promise.all(resultArrayPromise)
		const result = {
			list: searchList,
			total: total as number,
			pageSize,
			pageIndex,
			pages: Math.ceil(total as number / pageSize)
		} as PageResultDTO<T>
		return Promise.resolve(result)
	}
	findOneAndUpdate(req: ExpressRequest, filter?: FilterQuery<T> | undefined, update?: UpdateQuery<T> | undefined, options?: QueryOptions<T> | null | undefined): Promise<T | null> {
		return this.model.findOneAndUpdate(filter, update, options).setOptions(this.getLanguageOptions(req))
	}
}
```
:star2: 通过上述这种方式我们已经将db的相关操作，都集成到`BaseService.ts`中了，而我们所需要做的仅仅就是简单继承于这个`BaseService`就可以了

#### 具体的业务简单的继承
> 这里我们已一个`BrandService`为例：
```typescript
import { BrandDTO } from "@/dto/BrandDTO";
import { BaseService } from "./base/BaseService";
import { Request } from "express";
import { BrandModel } from "@/models/BrandModel";
/**
 * 品牌的db操作服务
 */
export class BrandService extends BaseService<BrandDTO> {
	private req: Request
	constructor(req: Request) {
		super(BrandModel)
		this.req = req
	}
}
```
:100: 通过上述的继承动作，我们可以在对应的`BrandController`直接初始化这个`BrandService`即可，然后直接就可以调用到在`BaseService`中所定义的所有相关方法，如下代码所示：
```typescript
/**
	 * 获取品牌列表
	*/
	@Get('list')
	public async getBrandList(@Request() req: ExpressRequest, @Queries() query: PageDTO): Promise<BasePageListEntity<BrandDTO>> {
		const brandService = new BrandService(req)
		const result = await brandService.findListInPage('name', query)
		return this.successListResponse(req, result)
	}
```

### 最佳实践
> 本章将记录关于在项目过程中比较实用的相关技巧

#### mongoose中对于collection中的动态key关键词的使用
> 当我们在使用mongoose的时候，有时需要封装一个统一的api，针对不同的key来执行同等逻辑的操作，需要需要采用js中的[]属性方式来代表动态的属性，然后typescript却不买单，因为它认为这个在FilterQuery中并不存在，因此，程序需要“告知”ts编译器，我所创建出来的query{}它是一个FilterQuery对象，因此有下述的定义：
```typescript
const query = {
	[我是动态的名称变量]: value
}  as FilterQuery<T>
```
