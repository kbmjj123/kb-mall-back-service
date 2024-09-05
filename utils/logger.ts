import Log4js from "log4js";
Log4js.configure({
	appenders: {
    out: { type: 'console' },
    app: { type: 'file', filename: 'application.log' },
    errorFile: { type: 'file', filename: 'errors.log' }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' },
    error: { appenders: ['out', 'errorFile'], level: 'error' }
  }
})
const Logger = Log4js.getLogger()
Logger.level = 'debug'

export default Logger