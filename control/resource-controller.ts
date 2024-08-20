import countries from '@/config/json/country-code'
import expressAsyncHandler from 'express-async-handler'

export default {
	/**
	 * 直接从本地存储数据中捞对应的数据
	*/
	getCountries: expressAsyncHandler(async (req, res) => {
		res.success(countries)
	})
}