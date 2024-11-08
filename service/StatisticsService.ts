import mockjs from "mockjs";
import { BaseService } from "./base/BaseService";
import { ProductService } from "./ProductService";
import { StatisticsDTO } from "../dto/StatisticsDTO";


export class StatisticsService {

	private productService: ProductService;

	constructor() {
		this.productService = new ProductService()
	}

	/**
	 * 获取的首页统计数据的动作
	*/
	public getTotalStatisticsInfo(){
		const results = [
			{
				key: 'visits',
				values: {
					total: mockjs.Random.natural(10000, 9999999),
					dayPercentage: `${mockjs.Random.natural(0, 100)}%`,
					dayLiftingType: 1,
					weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
					weekLiftingType: 0,
					statisticalDimensions: '日',
					todayValue: mockjs.Random.natural(100, 9999)
				}
			},
			{
				key: 'sales',
				values: {
					total: mockjs.Random.natural(10000, 99999999),
					statisticalDimensions: '周',
					monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
					monthLiftingType: 1,
					weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
					weekLiftingType: 0,
					todayValue: mockjs.Random.float(100, 9999)
				}
			},
			{
				key: 'orders',
				values: {
					total: mockjs.Random.natural(10000, 99999999),
					statisticalDimensions: '周',
					monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
					monthLiftingType: 1,
					weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
					weekLiftingType: 0,
					todayValue: mockjs.Random.natural(100, 9999)
				}
			},
			{
				key: 'deals',
				values: {
					total: mockjs.Random.natural(10000, 99999999),
					statisticalDimensions: '月',
					monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
					monthLiftingType: 1,
					quarterPercentage: `${mockjs.Random.natural(0, 100)}%`,
					quarterLiftingType: 0,
					todayValue: mockjs.Random.natural(100, 9999)
				}
			},
		] as unknown as StatisticsDTO[]
		return Promise.resolve(results)
	}
}