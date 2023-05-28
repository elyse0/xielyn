import enquirer from 'enquirer'

import { readFileSync } from 'fs'

import { getHanziPinyinCaptions } from '@sophire/hanzi-pinyin-captions'
import { getMergedVideoCaptions } from '@sophire/caption-merger'
import { vttToJson } from '@sophire/vtt-to-json'

import { writeJsonFile } from '@/util/json.js'

import { VideoCaptions } from "@sophire/youtube-api";

const main = async () => {
    const englishVttPrompt = await enquirer.prompt({
        type: 'text',
        name: 'filepath',
        message: 'Enter the english vtt filepath',
    }) as { filepath: string }

    const hanziVttPrompt = await enquirer.prompt({
        type: 'text',
        name: 'filepath',
        message: 'Enter the hanzi vtt filepath',
    }) as { filepath: string }

    const englishVtt = readFileSync(englishVttPrompt.filepath, 'utf-8')
    const hanziVtt = readFileSync(hanziVttPrompt.filepath, 'utf-8')

    const englishJsonResult = vttToJson(englishVtt)
    if (englishJsonResult.err) {
        throw Error(englishJsonResult.val.message)
    }

    const hanziJsonResult = vttToJson(hanziVtt)
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
