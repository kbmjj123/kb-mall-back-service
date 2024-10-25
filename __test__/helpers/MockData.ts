/**
 * 有效的账号
*/
export const validateAccountInfo = {
	email: 'kbmjj123@gmail.com',
	password: 'abc123!@#$'
}
/**
 * 随机生成一个全新的账号，主要用于新用户注册单元测试流程
*/
export const generateNewEmailAccount = () => {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const domainList = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
  // 生成随机用户名
  const usernameLength = Math.floor(Math.random() * 10) + 5; // 用户名长度在5到15之间
  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    username += chars[Math.floor(Math.random() * chars.length)];
  }
  // 从域名列表中随机选择一个
  const domain = domainList[Math.floor(Math.random() * domainList.length)];
  return `${username}@${domain}`;
}
/**
 * 公共的新密码
*/
export const newPassword =  'abc123!@#$'
/**
 * 已被注销的账号信息
*/
export const alreadyCanceledAccountInfo = {
	email: 'ppp@gmail.com',
	password: 'abc123!@#$'
}