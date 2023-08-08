import enquirer from 'enquirer'

import { readFileSync } from 'fs'

import { getHanziPinyinCaptions } from '@sophire/hanzi-pinyin-captions'
import { getMergedVideoCaptions } from '@sophire/caption-merger'
import { subtitlesToJson } from '@sophire/subtitles-to-json'

import { writeJsonFile } from '@/util/json.js'

import { VideoCaptions } from "@sophire/youtube-api";

const main = async () => {
    const englishSubtitlesPrompt = await enquirer.prompt({
        type: 'text',
        name: 'filepath',
        message: 'Enter the english subtitles filepath',
    }) as { filepath: string }

    const hanziSubtitlesPrompt = await enquirer.prompt({
        type: 'text',
        name: 'filepath',
        message: 'Enter the hanzi subtitles filepath',
    }) as { filepath: string }

    let englishSubtitles = readFileSync(englishSubtitlesPrompt.filepath, 'utf-8')
    let hanziSubtitles = readFileSync(hanziSubtitlesPrompt.filepath, 'utf-8')

    const englishJsonResult = subtitlesToJson(englishSubtitles)
    if (englishJsonResult.err) {
        throw Error(englishJsonResult.val.message)
    }

    const hanziJsonResult = subtitlesToJson(hanziSubtitles)
    if (hanziJsonResult.err) {
        throw Error(hanziJsonResult.val.message)
    }

    const hanziPinyinCaptions = getHanziPinyinCaptions({
        languageId: 'zh-Hans',
        captions: hanziJsonResult.val,
    })

    const videoCaptions: VideoCaptions[] = [ ...hanziPinyinCaptions, {
        languageId: 'en',
        captions: englishJsonResult.val,
    }]

    console.log('Merging video captions!')
    writeJsonFile(getMergedVideoCaptions(videoCaptions), 'merged-captions.json')
}

main().then(() => {
})
