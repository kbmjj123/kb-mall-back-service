import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserModel } from '@/models/UserModel'
import { Request, Response, NextFunction } from 'express'
import { LogicResult } from '@/enum/http'

export default {
  // 只是单纯判断是否已登录
  isLogin: async (req: Request, res: Response, next: NextFunction) => {
    // 获取客户端携带的token信息
    let token = req?.headers?.authorization;
    if (token) {
      token = token.split(' ')[1];
      try {
        const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
        // decode.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
        const findUser = await UserModel.findById(decode.id);
        if (findUser?.account) {
          // 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
          req.user = findUser
          // 直接在中间件这里做一个拦截
          next();
        } else {
          res.failed(LogicResult.LOGIN_TIMEOUT, null, req.t('tip.failed'))
        }
      } catch (error) {
        res.failed(LogicResult.FORBIT, '', req.t('user.permissionLimitTip'))
      }
    }else{
      res.failed(LogicResult.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
    }
  },
  // 默认的全局拦截判断逻辑
  checkRole: async (req: Request, res: Response, next: NextFunction) => {
    // 获取客户端携带的token信息
    let token = req?.headers?.authorization;
    token = token?.split(' ')[1] as string;
    try {
      const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
      // decode.id 存在，则是一个有效的用户id，说明是一个正常的登录状态
      const findUser = await UserModel.findById(decode.id);
      if (findUser?.account) {
        // 将已经验证通过的账号信息追加到req.user中，并传递给下一个中间件
        req.user = findUser
        // 直接在中间件这里做一个拦截
        if ('user' === findUser.role) {
          res.failed(LogicResult.FORBIT, '', req.t('user.permissionLimitTip'))
        } else {
          next();
        }
      } else {
        res.failed(LogicResult.LOGIN_TIMEOUT, null, req.t('user.loginTimeOut'))
      }
    } catch (error) {
      res.failed(LogicResult.FORBIT, '', req.t('user.permissionLimitTip'))
    }
  }
}