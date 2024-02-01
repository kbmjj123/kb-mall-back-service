const express = require('express');

const fileUploadRouter = express.Router();
const authWM = require('../middleware/auth-middleware');
const fileCtrl = require('../control/file-controller');
const { upload } = require('../config/uploader-generator');

fileUploadRouter.use(authWM.isLogin);

fileUploadRouter.post('/uploadFile', upload.single('file'), fileCtrl.wrapFile);

fileUploadRouter.post('/uploadFiles', upload.array('photoes', 12), fileCtrl.wrapFiles);

module.exports = fileUploadRouter;