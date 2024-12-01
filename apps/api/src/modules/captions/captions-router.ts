import express from "express";

import getYoutubeCaptionsController from '@/modules/captions/use-cases/get-youtube-captions/index.js'

const router = express.Router() as express.Router;

router.get("/youtube/:videoId/:languageId?", (req: express.Request, res: express.Response) => {
    return getYoutubeCaptionsController.execute(req, res)
});

export default router
