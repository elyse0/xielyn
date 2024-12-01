import { cut } from '@sophire/jieba-wasm-esm';

const getHanziSegments = (text: string): string[] => {
    return cut(text);
}

export { getHanziSegments }
