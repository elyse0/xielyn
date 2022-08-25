import { isChineseText } from '@/utils/characters'
import { PinyinDict } from '@/utils/pinyin-dict'

import { getPinyinCharacter, shouldPutSpaceBetween } from '@/utils/pinyin-character'
import { getNormalizedEnglishText } from '@/utils/punctuation'
import { getHanziSegments } from '@/utils/segmentation'

interface Segments {
    hanzi: string[]
    pinyin: string[]
}

const getSegments = (hanzi: string): Segments => {
    const hanziSegments = getHanziSegments(hanzi)

    const pinyinSegments: string[] = [];
    hanziSegments.forEach((hanziSegment, index) => {
        if (hanziSegment.length === 1) {
            pinyinSegments.push(getPinyinCharacter(hanziSegment, hanziSegments, index));
        } else {
            const pinyinDictItem = PinyinDict[ hanziSegment ]
            if (pinyinDictItem) {
                pinyinSegments.push(pinyinDictItem)
            } else if (!isChineseText(hanziSegment)) {
                pinyinSegments.push(hanziSegment)
            } else {
                const forcedPinyin = Array.from(hanziSegment).map((segment) => {
                    return PinyinDict[ segment ] ?? segment
                }).join(' ')

                pinyinSegments.push(forcedPinyin)
            }
        }
    });

    const normalizedPinyinSegments = pinyinSegments.map(getNormalizedEnglishText)

    return {
        hanzi: hanziSegments,
        pinyin: normalizedPinyinSegments,
    }
}

const getPinyin = (hanzi: string): string => {
    const segments = getSegments(hanzi)

    const pinyinSegments: string[] = [];
    segments.pinyin.forEach((hanziSegment, index) => {
        if (shouldPutSpaceBetween(segments.hanzi[ index ], segments.hanzi[ index + 1 ])) {
            pinyinSegments.push(`${hanziSegment} `);
        } else {
            pinyinSegments.push(hanziSegment);
        }
    });

    return pinyinSegments.join('').trim()
}

export { getPinyin, getSegments }
