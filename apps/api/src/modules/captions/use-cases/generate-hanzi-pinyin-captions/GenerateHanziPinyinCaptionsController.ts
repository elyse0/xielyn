import express from "express";

import AbstractController from "@/modules/abstract/AbstractController.js";

import { getHanziPinyinCaptions } from '@xielyng/hanzi-pinyin-captions'

class GenerateHanziPinyinCaptionsController extends AbstractController {

    protected async executeImpl(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            if (!req.body || !Object.keys(req.body).length) {
                return this.clientError(res, 'Please provide video captions inside body request')
            }

            return this.ok(res, getHanziPinyinCaptions(req.body))
        } catch (err) {
            return this.fail(res, err);
        }
    }
}

export default GenerateHanziPinyinCaptionsController;
