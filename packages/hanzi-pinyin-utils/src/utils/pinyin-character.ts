import { PinyinDict } from '@/utils/pinyin-dict'

import { isChineseText } from '@/utils/characters'
import { getHanziTags } from '@/utils/tags'
import { getTone } from '@/utils/tones'

const getUnambiguousCharacter = (character: string, allSegments: string[], index: number): string | null => {
    const priorSegments = allSegments.slice(Math.max(0, index - 10), index);
    const subsequentSegments = allSegments.slice(index + 1, index + 10);

    const priorTags = getHanziTags(priorSegments.join(''));
    const subsequentTags = getHanziTags(subsequentSegments.join(''));

    switch (character) {
        case '觉':
        case '覺':
            if (priorSegments.join('').includes('睡')) {
                return 'jiào';
            }
            return 'jué';
        case '长':
        case '長':
            const nextTag = subsequentTags && subsequentTags.length && subsequentTags[ 0 ].tag;
            if (nextTag === 'uz') {
                return 'zhǎng';
            }
            const prevTag = priorTags && priorTags.length && priorTags[ priorTags.length - 1 ].tag;
            if (prevTag === 'n') {
                return 'zhǎng';
            }
            if (prevTag !== 'd' && nextTag === 'ul') {
                return 'zhǎng';
            }
            // zhǎng has higher frequency due to compound words,
            // but cháng is more common as an individual character.
            return 'cháng';
        case '得':
            if (subsequentTags && subsequentTags.length) {
                const afterTag = subsequentTags[ 0 ].tag;
                const prevTag = priorTags.length && priorTags[ priorTags.length - 1 ].tag;
                if (prevTag === 'v') {
                    break;
                }
                if (prevTag === 'a' || prevTag === 'b' || prevTag === 'nr') {
                    break;
                }
                if (afterTag === 'ul') {
                    return 'dé';
                }
                if (prevTag === 'd' || prevTag === 'r') {
                    return 'děi';
                }

                if (subsequentTags[ 0 ].word === '还' || subsequentTags[ 0 ].word === '還') {
                    if ((subsequentTags[ 1 ] && subsequentTags[ 1 ].tag[ 0 ] === 'r') || subsequentTags[ 1 ].tag[ 0 ] === 'n') {
                        return 'děi';
                    }
                }
                if (afterTag[ 0 ] === 't' || afterTag[ 0 ] === 'v' || afterTag[ 0 ] === 'p' || afterTag[ 0 ] === 'l' || afterTag[ 0 ] === 'n') {
                    return 'děi';
                }
            }
            break;
        case '还':
        case '還':
            if (priorSegments.join('').includes('把')) {
                return 'huán';
            }
            if (subsequentTags && subsequentTags.length) {
                const afterTag = subsequentTags[ 0 ].tag;
                if (subsequentSegments[ 0 ][ 0 ] === '有') {
                    break;
                }
                if (afterTag[ 0 ] === 'r' || afterTag[ 0 ] === 'n') {
                    return 'huán';
                }
            }
            break;
        case '行':
            if (priorTags.length && priorTags[ priorTags.length - 1 ].tag === 'm') {
                return 'háng';
            }
            break;
        case '只':
            const prev = getHanziTags(priorSegments.join('')).slice(-1)[ 0 ];
            const after = getHanziTags(subsequentSegments.join(''))[ 0 ];
            if (prev && prev.tag === 'm') {
                return 'zhī';
            }
            if (after && after.tag === 'n') {
                return 'zhī';
            }
            return 'zhǐ';
        case '系':
            if (subsequentTags && subsequentTags.length) {
                const afterTag = subsequentTags[ 0 ].tag;
                if (afterTag === 'f' || afterTag[ 0 ] === 'u') {
                    return 'jì';
                }
            }
            return 'xì';
        case '地':
            if (priorTags.length && priorTags[ priorTags.length - 1 ].tag === 'r') {
                return 'dì';
            }
            break;
        case '弹':
            if (subsequentSegments.includes('吉他')) {
                return 'tán';
            }
            if (subsequentTags && subsequentTags.length) {
                const afterTag = subsequentTags[ 0 ].tag;
                if (afterTag[ 0 ] === 'n') {
                    return 'tán';
                }
            }
            break;
        case '重':
            if (subsequentTags && subsequentTags.length) {
                const afterTag = subsequentTags[ 0 ].tag;
                if (afterTag[ 0 ] === 'v') {
                    return 'chóng';
                }
            }
            break;
        case '不':
            if (subsequentSegments.length > 0) {
                const nextTone = getTone(subsequentSegments[ 0 ].charAt(0));
                if (nextTone === 4) {
                    return 'bú';
                }
            }
            break;
        case '一':
            if (subsequentSegments.length > 0) {
                const nextTone = getTone(subsequentSegments[ 0 ].charAt(0));
                if (nextTone === 1 || nextTone === 2 || nextTone === 3) {
                    return 'yì';
                }
                if (nextTone === 4) {
                    return 'yí';
                }
            }
            break;
        default:
    }

    return null;
};

const getPinyinCharacter = (character: string, allSegments: string[], index: number): string => {
    const unambiguousCharacter = getUnambiguousCharacter(character, allSegments, index);
    if (unambiguousCharacter) {
        return unambiguousCharacter;
    }
    const pinyinDictElement = PinyinDict[ character ];
    if (pinyinDictElement) {
        return pinyinDictElement;
    }

    return character

    /*
    const arr = pinyin(character, {
        heteronym: true,
        segment: true,
    });
    const syllables = arr.map((x) => x[ 0 ]);
    return syllables.join('\u200B');
    */
}

const shouldPutSpaceBetween = (word1: string, word2: string): boolean => {
    if (!word2) {
        return false;
    }
    if (word2 === ' ') {
        return false;
    }
    if (isChineseText(word1) && isChineseText(word2)) {
        return true;
    }
    if (isChineseText(word1) && /[ `"'“‘([（【0-9]/.test(word2)) {
        return true;
    }
    if (/[`"'“‘([（【]/.test(word1)) {
        return false;
    }

    const punctuationPattern = /[0-9.?!)\]}！？，。：；’”）%~@#^&*]/;
    const numberPattern = /[0-9]/;

    if (numberPattern.test(word1) && numberPattern.test(word2)) {
        return false;
    }
    if (punctuationPattern.test(word1) && !punctuationPattern.test(word2)) {
        return true;
    }
    if (punctuationPattern.test(word1) && numberPattern.test(word2)) {
        return true;
    }
    if (isChineseText(word1) && punctuationPattern.test(word2)) {
        return false;
    }
    return isChineseText(word1) !== isChineseText(word2);
};


export { getPinyinCharacter, shouldPutSpaceBetween }
