import { cut } from 'jieba-wasm/web';

const getHanziSegments = (text: string): string[] => {
    return cut(text);
}

export { getHanziSegments }
