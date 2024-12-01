import init from '@sophire/jieba-wasm-esm';
//@ts-ignore
await init();

import { getHanziSegments } from '@/utils/segmentation.js'
import { getPinyin, getSegments } from '@/utils/pinyin.js'

export {
    getHanziSegments,
    getPinyin,
    getSegments,
}
