import express from "express";

import generateHanziPinyinCaptionsController from '@/modules/captions/use-cases/generate-hanzi-pinyin-captions/index.js'

const router = express.Router() as express.Router;

router.post("/generate-hanzi-pinyin", (req: express.Request, res: express.Response) => {
    return generateHanziPinyinCaptionsController.execute(req, res)
});

export default router
