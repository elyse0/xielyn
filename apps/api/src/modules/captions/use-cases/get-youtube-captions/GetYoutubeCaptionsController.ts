import express from "express";
import { YoutubeDlService } from "@xielyng/youtube-dl-service"

import AbstractController from "@/modules/abstract/AbstractController.js";

import { isString } from '@/utils/validation.js'

class GetYoutubeCaptionsController extends AbstractController {

    protected async executeImpl(req: express.Request, res: express.Response): Promise<express.Response> {
        try {
            const {videoId, languageId} = req.params

            if (!isString(videoId)) {
                return this.clientError(res, "'videoId' must be provided in query string")
            }

            const captionListResult = await YoutubeDlService.getCaptionList(videoId)
            if (captionListResult.err) {
                return this.fail(res, captionListResult.val.message)
            }

            const captionList = captionListResult.val

            if (!isString(languageId)) {
                return res.status(200).send({
                    videoId,
                    languages: captionList,
                })
            }

            if (!captionList.includes(languageId)) {
                return this.clientError(res, "The 'languageId' is not available for the video provided")
            }

            const captionsResult = await YoutubeDlService.getCaptions(videoId, languageId)
            if (captionsResult.err) {
                return this.fail(res, captionsResult.val.message)
            }

            return this.ok(res, {
                videoId,
                languageId,
                captions: captionsResult.val,
            })
        } catch (err) {
            return this.fail(res, err);
        }
    }
}

export default GetYoutubeCaptionsController;
