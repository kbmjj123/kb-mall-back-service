import dotenv from 'dotenv';
import fs from 'fs';
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}
// 加载 .env.test 并覆盖已有的变量
if (fs.existsSync('.env.test')) {
  dotenv.config({ path: '.env.test', override: true });
}
