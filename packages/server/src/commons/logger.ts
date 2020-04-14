
import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: './config/error.log', level: 'error' }),
        new winston.transports.File({ filename: './config/combined.log' }),
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});
