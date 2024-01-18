const multer = require('multer');
const BASE_FILE_DIR = 'uploads';
const fs = require('fs');
const crypto = require('crypto');
const { readFile } = require('node:fs/promises');
const { resolve } = require('node:path');

// 计算缓冲区数据的哈希值的函数
const calculateBufferHash = (buffer, algorithm = 'sha256') => {
  const hash = crypto.createHash(algorithm);
  hash.update(buffer);
  return hash.digest('hex');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //! 通过传入的链接中的参数，来确定图片需要存放的位置
    if(!fs.existsSync(`${BASE_FILE_DIR}/${req.query.path}/`)){
      fs.mkdirSync(`${BASE_FILE_DIR}/${req.query.path}/`)
    }
    cb(null, `${BASE_FILE_DIR}/${req.query.path}/`)
  },
  filename: async function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload