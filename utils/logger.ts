import Log4js from "log4js";
Log4js.configure({
	appenders: { cheese: { type: "file", filename: "cheese.log" } },
	categories: { default: { appenders: ["cheese"], level: "error" } },
})
const logger = Log4js.getLogger()
logger.level = 'debug'

export default logger