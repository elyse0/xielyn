import winston from "winston";
import morgan, { StreamOptions } from "morgan";

const logConfiguration = {
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
    ),
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.cli(),
        }),
        new winston.transports.Http({
            level: "warn",
            format: winston.format.cli(),
        }),
    ],
};

const logger = winston.createLogger(logConfiguration);

const stream: StreamOptions = {
    write: (message) => logger.http(message),
};

const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

const loggerMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream,
    skip,
});

export { logger, loggerMiddleware }
