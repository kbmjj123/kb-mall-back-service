import jwt from 'jsonwebtoken'

//* 将与jwt加密生成的token相关的，合并为一对象，并对外暴露该对象
export default {
    // 生成资源访问的token
    generateAccessToken: id => {
        return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN_TIME) })
    },
    // 生成刷新的token
    generateRefreshToken: id => {
        return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN_TIME) });
    }
}