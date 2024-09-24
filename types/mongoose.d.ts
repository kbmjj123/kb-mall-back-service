import { Document } from 'mongoose';

declare module 'mongoose' {
	interface Document {
    softDelete(): Promise<this>;
  }
  // 扩展 mongoose.Model 接口
  interface Model<T extends Document> {
		//? 针对所有的Model提供静态化的softDeleteMany方法
    softDeleteMany(conditions: any): Promise<any>;
  }
}
