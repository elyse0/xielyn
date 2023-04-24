import enquirer from 'enquirer'

import { readFileSync } from 'fs'

import { getMergedVideoCaptions } from '@sophire/caption-merger'
import { writeJsonFile } from '@/util/json.js'

const main = async () => {
    const filePathsPrompt = await enquirer.prompt({
        type: 'list',
        name: 'filePaths',
        message: 'Enter comma-separated paths',
    }) as { filePaths: string[] }

    const filePaths = filePathsPrompt.filePaths

    const videoCaptions = filePaths.map((filePath) => {
        return JSON.parse(readFileSync(filePath, 'utf-8'))
    })

    console.log('Merging video captions!')
    writeJsonFile(getMergedVideoCaptions(videoCaptions), 'merged-captions.json')
}

main().then(() => {
})
