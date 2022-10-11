import express from "express";

import { logger } from "@/utils/logger.js";

abstract class BaseController {
    protected abstract executeImpl(req: express.Request, res: express.Response): Promise<express.Response>;

    public async execute(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            return await this.executeImpl(req, res);
        } catch (err) {
            logger.debug("[BaseController]: Uncaught controller error");
            logger.debug(err);
            return this.fail(res, "An unexpected error occurred");
        }
    }

    public static jsonResponse(res: express.Response, code: number, message: string): express.Response {
        return res.status(code).json({ message });
    }

    public ok<T>(res: express.Response, data?: T): express.Response {
        if (data) {
            res.type("application/json");
            return res.status(200).json(data);
        }
        return res.sendStatus(200);
    }

    public created(res: express.Response): express.Response {
        return res.sendStatus(201);
    }

    public clientError(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 400, message || "Unauthorized");
    }

    public unauthorized(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 401, message || "Unauthorized");
    }

    public forbidden(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 403, message || "Forbidden");
    }

    public notFound(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 404, message || "Not found");
    }

    public conflict(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 409, message || "Conflict");
    }

    public tooMany(res: express.Response, message?: string): express.Response {
        return BaseController.jsonResponse(res, 429, message || "Too many requests");
    }

    public fail(res: express.Response, error: Error | string | unknown): express.Response {
        logger.error(error);
        return res.status(500).json({
            message: error,
        });
    }

    public send(res: express.Response, content: unknown): express.Response {
        return res.status(200).send(content);
    }
}

export default BaseController;
