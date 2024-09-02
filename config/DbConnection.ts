import mongoose from 'mongoose'
import { TrimValuePlugin } from '../plugins/global/TrimValuePlugin'

//! 开启数据库日志调试
mongoose.set({
  debug: true
})

export default async () => {
  try{
    // 在mongoose连接之前注册全局插件
    mongoose.plugin(TrimValuePlugin);
		const MONGODB_URL = process.env.MONGODB_URL as string
		if(MONGODB_URL){
			const conn = await mongoose.connect(MONGODB_URL);
			mongoose.connection.on('connected', () => console.info('数据库连接成功～～'));
		}
  }catch(error){
    console.error(error)
  }
}