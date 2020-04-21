
import expressWinston from 'express-winston';
import { createLogger, format, transports } from 'winston';

const _level = 'info'
const _fileConfig = {
    zippedArchive: false,
    maxsize: 50 * 1024 * 1024,
}
const _transports = [
    new transports.File({ ..._fileConfig, ...{ filename: './logs/error.log', level: 'error' } }),
    new transports.File({ ..._fileConfig, ...{ filename: './logs/combined.log' } }),
    new transports.Console({
        format: format.simple()
    })
]

export const logger = createLogger({
    level: _level,
    transports: _transports,
    format: format.combine(
        format.timestamp(),
        format.json()
    )
});

export const loggerMiddleware = expressWinston.logger({
    level: _level,
    transports: _transports,
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    dynamicMeta: (req: any, res: any) => {
        const httpRequest: any = {}
        const meta: any = {}
        if (req) {
            meta.httpRequest = httpRequest
            httpRequest.requestMethod = req.method
            httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
            httpRequest.protocol = `HTTP/${req.httpVersion}`
            // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
            httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip   // just ipv4
            httpRequest.requestSize = req.socket.bytesRead
            httpRequest.userAgent = req.get('User-Agent')
            httpRequest.referrer = req.get('Referrer')
        }

        if (res) {
            meta.httpRequest = httpRequest
            httpRequest.status = res.statusCode
            httpRequest.latency = {
                seconds: Math.floor(res.responseTime / 1000),
                nanos: (res.responseTime % 1000) * 1000000
            }
            if (res.body) {
                if (typeof res.body === 'object') {
                    httpRequest.responseSize = JSON.stringify(res.body).length
                } else if (typeof res.body === 'string') {
                    httpRequest.responseSize = res.body.length
                }
            }
        }
        return meta
    }
})