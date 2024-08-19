import express from 'express'
const fileUploadRouter = express.Router();
import authWM from '../middleware/auth-middleware'
import fileCtrl from '../control/file-controller'
import { upload } from '../config/uploader-generator'

fileUploadRouter.use(authWM.isLogin);

fileUploadRouter.post('/uploadFile', upload.single('file'), fileCtrl.wrapFile);

fileUploadRouter.post('/uploadFiles', upload.array('photoes', 12), fileCtrl.wrapFiles);

export default fileUploadRouter;