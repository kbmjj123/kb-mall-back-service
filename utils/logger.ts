import Log4js from "log4js";
Log4js.configure({
	appenders: { cheese: { type: "file", filename: "cheese.log" } },
	categories: { default: { appenders: ["cheese"], level: "error" } },
})
const Logger = Log4js.getLogger()
Logger.level = 'debug'

export default Logger