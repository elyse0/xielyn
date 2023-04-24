import express from 'express'
import cors from 'cors'

import { isString } from '@/util/validation.js'

const app = express()

app.use(cors({ origin: "*" }))

const port = process.env.PORT ?? 3000

app.listen(3000, () => console.log(`Server running on port ${port}`))

import { YoutubeDlService } from "@sophire/youtube-dl-service"

app.get("/:videoId/:languageId?", async (req: express.Request, res: express.Response) => {
    const {videoId, languageId} = req.params

    if (!isString(videoId)) {
        return res.status(400).json({
            error: "'videoId' must be provided in query string",
        })
    }

    const captionListResult = await YoutubeDlService.getCaptionList(videoId)
    if (captionListResult.err) {
        return res.status(500).send({
            message: captionListResult.val.message,
        })
    }

    const captionList = captionListResult.val

    if (!isString(languageId)) {
        return res.status(200).send({
            videoId,
            languages: captionList,
        })
    }

    if (!captionList.includes(languageId)) {
        return res.status(400).json({
            error: "The 'languageId' is not available for the video provided",
        })
    }

    const captionsResult = await YoutubeDlService.getCaptions(videoId, languageId)
    if (captionsResult.err) {
        return res.status(500).json({
            error: captionsResult.val.message
        })
    }

    return res.status(200).send({
        videoId,
        languageId,
        captions: captionsResult.val,
    })
})

// Return 404 if route was not found
app.use((req: express.Request, res: express.Response) => {
    return res.status(404).json({
        error: {
            code: 404,
            message: "Resource not found",
            status: "Not found",
        },
    });
});
