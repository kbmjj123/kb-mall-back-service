export const BASE_FILE_DIR = 'uploads'; // 上传文件基础目录
export const RESOURCES_DIR = 'resources'; // 最终文件存储目录

import { Request } from 'express'
import multer from "multer";
import fs from 'fs'

export const getFilePathFromReq = (req: Request) => {
  return `${BASE_FILE_DIR}/${req.query.path}/`
}
// 生成的统一的文件存储位置以及文件命名规则
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    //! 通过传入的链接中的参数，来确定图片需要存放的位置
    const targetFilePath = getFilePathFromReq(req);
    if(!fs.existsSync(targetFilePath)){
      fs.mkdirSync(targetFilePath)
    }
    cb(null, targetFilePath)
  },
  filename: async function (req, file, cb) {
    //? 以上传的文件名自身来命名
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })

export default {
  upload, BASE_FILE_DIR, RESOURCES_DIR, getFilePathFromReq
}