import { Post, Route, Request, Middlewares, Tags } from "tsoa";
import { BaseController } from "./BaseController";
import { Request as ExpressRequest } from 'express'
import { getFilePathFromReq, RESOURCES_DIR, upload } from '../config/UploaderGenerator';  // 获取文件上传的基础目录 
import fs from 'fs'
import crypto from 'crypto'
import path from 'path'
import { infoLogger } from "@/utils/Logger";

// 计算文件hash的函数
function calculateFileHash(filePath: string) {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('sha256');
		const stream = fs.createReadStream(filePath);
		stream.on('error', err => reject(err));
		stream.on('data', chunk => hash.update(chunk));
		stream.on('end', () => resolve(hash.digest('hex')));
	});
}

@Route('file')
@Tags('文件模块')
export class FileController extends BaseController {

	/**
	 * 上传单个文件
	*/
	@Post('uploadFile')
	@Middlewares([upload.single('file')])
	public async wrapFile(@Request() req: ExpressRequest) {
		const uploadedFilePath = path.join(getFilePathFromReq(req), req.file?.filename as string);  // 获取已上传的文件路径
		infoLogger.info('刚上传的本地文件路径：' + uploadedFilePath)
		if (!fs.existsSync(path.join(RESOURCES_DIR, req.query.path as string))) {
			fs.mkdirSync(path.join(RESOURCES_DIR, req.query.path as string))
		}
		const targetFilePath = path.join(RESOURCES_DIR, req.query.path as string, req.file?.originalname as string); // 本地最终文件存储路径

		if (fs.existsSync(targetFilePath)) {
			// 文件同名，则计算现有文件和上传文件的hash值
			const [existingFileHash, uploadedFileHash] = await Promise.all([
				calculateFileHash(targetFilePath),
				calculateFileHash(uploadedFilePath)
			]);
			if (existingFileHash === uploadedFileHash) {
				// 文件内容一致，删除上传的文件，返回现有文件路径
				fs.unlinkSync(uploadedFilePath);
				return this.successResponse(req, targetFilePath, req.t('file.exist'))
			} else {
				// 文件内容不一致，替换旧文件，返回更新后的文件路径
				fs.unlinkSync(targetFilePath);
				fs.renameSync(uploadedFilePath, targetFilePath);
				return this.successResponse(req, targetFilePath, req.t('file.replace'))
			}
		} else {
			// 文件不存在，则直接上传
			fs.renameSync(uploadedFilePath, targetFilePath);
			return this.successResponse(req, targetFilePath, req.t('file.success'))
		}
	}

	/**
	 * 上传多个文件
	*/
	@Post('uploadFiles')
	public async wrapFiles(@Request() req: ExpressRequest) { }
}