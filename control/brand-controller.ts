import asyncHandler from 'express-async-handler'
import brandModel from '../model/brand-model'

export default {
	// 获取品牌列表
	getBrandList: asyncHandler(async (req, res) => {
		let { keyword, pageIndex = 1, pageSize = 20 } = req.query;
		pageIndex = pageIndex as number - 1;
		pageSize = Number(pageSize)
		let searchList = [];
		let total = 0;
		if (keyword) {
			const regex = new RegExp(keyword as string, 'i');
			total = await brandModel.countDocuments({ name: { $regex: regex } });
			searchList = await brandModel.find({ name: { $regex: regex } }).skip(pageIndex * Number(pageSize)).limit(Number(pageSize));
		} else {
			total = await brandModel.estimatedDocumentCount();
			searchList = await brandModel.find().skip(pageIndex * pageSize).limit(pageSize);
		}
		const pages = Math.ceil(total / pageSize);
		res.success({
			list: searchList,
			total: total,
			pageSize: Number(pageSize),
			pageIndex: pageIndex + 1,
			pages: pages
		})
	}),
	// 新增一品牌
	addABrand: asyncHandler(async (req, res) => {
		const { name } = req.body;
		if (name) {
			const findABrand = await brandModel.findOne({ name });
			if (findABrand) {
				res.failed(-3, null, `品牌名：(${name})已存在，请勿重复创建`);
			} else {
				const createABrand = await brandModel.create({ name });
				res.success(createABrand);
			}
		} else {
			res.failed(-2, null, '请输入品牌名称');
		}
	}),
	// 编辑一品牌
	editABrand: asyncHandler(async (req, res) => {
		const { id } = req.params;
		console.info(id)
		const { name } = req.body;
		if (name) {
			const updateABrand = await brandModel.findByIdAndUpdate(id, { $set: { name } });
			res.success(updateABrand);
		} else {
			res.failed(-2, null, '请输入品牌名称');
		}
	}),
	// 删除一品牌
	removeABrand: asyncHandler(async (req, res) => {
		const { id } = req.params;
		if (id) {
			const result = await brandModel.findByIdAndDelete(id);
			if (result && result._id) {
				res.success('');
			} else {
				res.failed(-2, null, '操作失败');
			}
		} else {
			res.failed(-1, null, '请传递品牌id')
		}
	})
};