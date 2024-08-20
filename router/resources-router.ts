import express from 'express'
const resourceRouter = express.Router();
import resourceController from '@/control/resource-controller';

/**
 * 获取全球国家数据
*/
resourceRouter.get('/countries', resourceController.getCountries)

export default resourceRouter