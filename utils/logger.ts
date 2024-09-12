import Log4js from "log4js";
Log4js.configure({
	appenders: {
    out: { type: 'stdout' },
    app: { type: 'dateFile', filename: 'logs/application.log', pattern: '.yyyy-MM-dd', keepFileExt: true },
    errorFile: { type: 'dateFile', filename: 'logs/errors.log', pattern: '.yyyy-MM-dd', keepFileExt: true }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'info' },
    error: { appenders: ['out', 'errorFile'], level: 'error' }
  }
})
export const infoLogger = Log4js.getLogger('default')
export const errorLogger = Log4js.getLogger('error')

