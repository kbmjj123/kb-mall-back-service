const multer = require('multer');
const BASE_FILE_DIR = 'uploads';
const fs = require('fs');

// 生成的统一的文件存储位置以及文件命名规则
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