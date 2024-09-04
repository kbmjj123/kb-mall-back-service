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
