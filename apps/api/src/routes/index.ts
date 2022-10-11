import express from "express";

import captionsRouter from '@/modules/captions/captions-router.js'

const router = express.Router({ mergeParams: true }) as express.Router;

router.use('/captions', captionsRouter)

export default router
