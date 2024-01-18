const express = require('express');
const multer = require('multer');
const fileUploadRouter = express.Router();
const { isLogin } = require('../middleware/auth-middleware');
const fileCtrl = require('../control/file-controller');
const upload = multer({ dest: 'uploads/' })

fileUploadRouter.use(isLogin);

fileUploadRouter.post('/uploadFile', upload.single('file'), fileCtrl.wrapFile);

fileUploadRouter.post('/uploadFiles', upload.array('photoes', 12), fileCtrl.wrapFiles);

module.exports = fileUploadRouter;