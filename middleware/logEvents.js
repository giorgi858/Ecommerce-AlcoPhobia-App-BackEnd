const path = require('path')
const { format } = require('date-fns');
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message, logFileName) => {
    const logItems = `Date & Time ${format(new Date(),'dd MM yyyy  hh:MM:ss')} req.method & req.headers.orgin & req.url ${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs' ))) {
          await  fsPromises.mkdir(path.join(__dirname, '..', 'logs' ))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItems)
    } catch (err) {
        console.log(err);
    }
}
const logger = (req,res, next) => {
    logEvents(`  ${req.method}  ${req.headers.origin}  ${req.url}`,'reqLog.txt')
    next()
}

module.exports = { logEvents,logger }