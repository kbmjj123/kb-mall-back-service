import Log4js from "log4js";
Log4js.configure({
	appenders: {
    out: { type: 'stdout' },
    app: { type: 'dateFile', filename: 'logs/application.log', pattern: '.yyyy-MM-dd', keepFileExt: true },
    errorFile: { type: 'dateFile', filename: 'logs/errors.log', pattern: '.yyyy-MM-dd', keepFileExt: true }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' },
    error: { appenders: ['out', 'errorFile'], level: 'error' }
  }
})
const Logger = Log4js.getLogger()
Logger.level = 'debug'

export default Logger
