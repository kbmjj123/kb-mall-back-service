import asyncHandler from 'express-async-handler'
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import { getFilePathFromReq, RESOURCES_DIR } from '../config/uploader-generator';  // 获取文件上传的基础目录 

// 计算文件hash的函数
function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);
      stream.on('error', err => reject(err));
      stream.on('data', chunk => hash.update(chunk));
      stream.on('end', () => resolve(hash.digest('hex')));
  });
}

export default {
  // 拿到文件后，对响应结果进行包装后返回
  wrapFile: asyncHandler(async (req, res) => {
    const uploadedFilePath = path.join(getFilePathFromReq(req), req.file.filename);  // 获取已上传的文件路径
    console.info('刚上传的本地文件路径：' + uploadedFilePath)
    if(!fs.existsSync(path.join(RESOURCES_DIR, req.query.path))){
      fs.mkdirSync(path.join(RESOURCES_DIR, req.query.path))
    }
    const targetFilePath = path.join(RESOURCES_DIR, req.query.path, req.file.originalname); // 本地最终文件存储路径

    if (fs.existsSync(targetFilePath)) {
      // 文件同名，则计算现有文件和上传文件的hash值
      const [existingFileHash, uploadedFileHash] = await Promise.all([
        calculateFileHash(targetFilePath),
        calculateFileHash(uploadedFilePath)
      ]);
      if (existingFileHash === uploadedFileHash) {
        // 文件内容一致，删除上传的文件，返回现有文件路径
        fs.unlinkSync(uploadedFilePath);
        return res.success(targetFilePath, '文件已存在！');
      } else {
        // 文件内容不一致，替换旧文件，返回更新后的文件路径
        fs.unlinkSync(targetFilePath);
        fs.renameSync(uploadedFilePath, targetFilePath);
        return res.success(targetFilePath, '文件不一致，已替换完成')
      }
    } else {
      // 文件不存在，则直接上传
      fs.renameSync(uploadedFilePath, targetFilePath);
      return res.success(targetFilePath, '文件已上传成功！');
    }
  }),
  // 多文件上传处理器
  wrapFiles: asyncHandler(async (req, res) => {
    console.info(req)
  })
}