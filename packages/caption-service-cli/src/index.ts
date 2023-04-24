import { writeJsonFile } from '@/util/json.js'
import enquirer from 'enquirer'

import { CaptionService } from '@sophire/caption-service'

const main = async () => {
    const videoIdPrompt = await enquirer.prompt({
        type: 'input',
        name: 'videoId',
        message: 'Enter youtube video id',
    }) as { videoId: string }

    const videoId = videoIdPrompt.videoId

    const availableCaptions = await CaptionService.getAvailableYoutubeCaptions(videoId)
    if (availableCaptions.err) {
        console.log(`There are no available captions`)
        return
    }

    const multiSelectPrompt = await enquirer.prompt({
        type: 'multiselect',
        name: 'selectedIds',
        message: 'Select desired captions to download',
        choices: availableCaptions.val,
    }) as { selectedIds: string[] }

    for await (const captionId of multiSelectPrompt.selectedIds) {
        console.log(`Downloading caption ${captionId}`)

        const captions = await CaptionService.getYoutubeCaptions(videoId, captionId)
        if (captions.err) {
            console.log(`Error downloading caption ${captionId} - ${captions.val.status}`)
            continue
        }

        writeJsonFile(captions.val, `captions-${videoId}-${captionId}.json`)
    }

}

main().then(() => {
})
