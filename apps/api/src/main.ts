import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser"

import indexRouter from '@/routes/index.js'
import { logger, loggerMiddleware } from '@/utils/logger.js'

const app = express()

app.use(cors({ origin: "*" }))
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT ?? 3000

app.listen(port, () => console.log(`Server running on port ${port}`))

// Router
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({
        error: { code: 404, message: "Resource not found", status: "Not found" }
    });
});

// Error handler
app.use((err: { message: string, status: number }, req: express.Request, res: express.Response) => {
    logger.log({ level: "error", message: err.message });

    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    return res.status(err.status || 500).json({ error: err.message });
});
