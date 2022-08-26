import { getSegments } from '@xielyng/hanzi-pinyin-utils'

import { Caption, VideoCaptions } from '@xielyng/youtube-api'

const getHanziPinyinCaptions = (videoCaptions: VideoCaptions): VideoCaptions[] => {
    const hanziCaptions: Caption[] = []
    const pinyinCaptions: Caption[] = []
    for (const caption of videoCaptions.captions) {
        if (typeof caption.text !== 'string') {
            continue
        }

        const segments = getSegments(caption.text)

        hanziCaptions.push({
            text: segments.hanzi,
            start: caption.start,
            end: caption.end,
        })

        pinyinCaptions.push({
            text: segments.pinyin,
            start: caption.start,
            end: caption.end,
        })
    }

    return [
        {
            languageId: 'hanzi',
            captions: hanziCaptions,
        },
        {
            languageId: 'pinyin',
            captions: pinyinCaptions,
        },
    ]
}

export { getHanziPinyinCaptions }
