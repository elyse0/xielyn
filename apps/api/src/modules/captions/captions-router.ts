import express from "express";

import generateHanziPinyinCaptionsController from '@/modules/captions/use-cases/generate-hanzi-pinyin-captions/index.js'
import getYoutubeCaptionsController from '@/modules/captions/use-cases/get-youtube-captions/index.js'

const router = express.Router() as express.Router;

router.post("/generate-hanzi-pinyin", (req: express.Request, res: express.Response) => {
    return generateHanziPinyinCaptionsController.execute(req, res)
});

router.get("/youtube/:videoId/:languageId?", (req: express.Request, res: express.Response) => {
    return getYoutubeCaptionsController.execute(req, res)
});

export default router
