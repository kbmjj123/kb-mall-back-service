import { ISoftDeleteDTO } from "./soft-delete-dto/ISoftDeleteDTO";

export type StatisticsType = 'visits' | 'sales' | 'orders' | 'deals'

export type StatisticsItemType = {
	total: number,
	dayPercentage: string,
	dayLifeingType: number,
	weekPercentage: string,
	weekLifeingType: number,
	statisticalDimensions: string,
	todayValue: number
}

/**
 * 统计相关的DTO
*/
export interface StatisticsDTO extends ISoftDeleteDTO{

	key: StatisticsType,
	values: StatisticsItemType

}