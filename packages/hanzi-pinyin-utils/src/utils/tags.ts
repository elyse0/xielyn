import { tag as jiebaTag } from '@sophire/jieba-wasm-esm';

interface TaggedWord {
    tag: string
    word: string
}

const getHanziTags = (hanzi: string): TaggedWord[] => {
    const tags = jiebaTag(hanzi) as { word: string, tag: string }[];

    const hanziTags = tags.map(({ word, tag }) => {
        if (word.length > 1 && (tag === 'x' || (tag === 'n' && word.includes('吗')))) {
            return Array.from(word).map((char) => jiebaTag(char)[0]);
        }

        return { word, tag };
    });

    return hanziTags.flat();
};

export { getHanziTags };
