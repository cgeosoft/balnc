import pkg from '../package.json'
import { build } from './build'

var _whitelist = ['http://localhost:4200', 'http://localhost:8000', 'https://balnc.cgeosoft.com']

export const config = {
    build,
    version: pkg.version,
    sentry: {
        dsn: 'https://266ec9ccd83c4d3d9df754ed120bf33c@o73184.ingest.sentry.io/5207756',
    },
}

export const pouchdbCorsParams = {
    credentials: true,
    origin: (requestOrigin: any, callback: any) => {
        if (_whitelist.indexOf(requestOrigin) !== -1 || !requestOrigin) {
            callback(null, true)
        } else {
            callback(new Error(`Not allowed by CORS [${requestOrigin}]`))
        }
    },
    allowedHeaders: "accept, authorization, content-type, origin, referer",
    methods: "GET, PUT, POST, HEAD, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}