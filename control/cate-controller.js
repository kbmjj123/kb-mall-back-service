const asyncHandler = require('express-async-handler');
const cateModel = require('../model/cate-model');

module.exports = {
  // 获取分类列表数据-->以树状列表来返回
  getCateList: asyncHandler(async (req, res) => {
    //? 获取一级列表-->由于有异步嵌套，采用将一个异步查询转换为等待执行的promise
    const cateList1 = await cateModel.find({level: 0});
    const cateListPromises = await cateList1.map(async (cate1) => {
      const cateList2 = await cateModel.find({parentId: cate1._id});
      const childCateListPromise = cateList2.map(async (cate2) => {
        const cateList3 = await cateModel.find({parentId: cate2._id});
        return {
          ...cate2.toObject(),  //! 这里将对象转换为普通的js对象输出
          children: cateList3
        }
      });
      const children = await Promise.all(childCateListPromise);
      return {
        ...cate1.toObject(),
        children: children
      }
    });
    const finalCateList = await Promise.all(cateListPromises);

    res.success(finalCateList);
  }),
  // 新增分类
  addACate: asyncHandler(async (req, res) => {
    const { title, level = 0, parentId } = req.body;
    if (title) {
      const findACate = await cateModel.findOne({ title });
      if (findACate) {
        res.failed(-3, null, `分类名：(${title})已存在，请勿重复创建`);
      } else {
        const createACate = await cateModel.create({
          title,
          level,
          parentId
        });
        res.success(createACate);
      }
    } else {
      res.failed(-2, null, '请输入分类名称')
    }
  }),
  // 修改分类
  editACate: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (id) {
      if (title) {
        const updateACate = await cateModel.findByIdAndUpdate(id);
        res.success(updateACate);
      } else {
        res.failed(-2, null, '请维护待编辑的分类标题');
      }
    } else {
      res.failed(-2, null, '请维护待编辑的分类id')
    }
  }),
  // 删除分类
  removeACate: asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (id) {
      const result = await cateModel.findByIdAndDelete(id);
      if (result && result._id) {
        res.success('');
      } else {
        res.failed(-2, null, '操作失败')
      }
    } else {
      res.failed(-1, null, '请传递分类id')
    }
  })
};