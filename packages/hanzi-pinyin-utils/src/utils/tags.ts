import jieba, { TaggedWord } from '@node-rs/jieba';

const getHanziTags = (hanzi: string): TaggedWord[] => {
    const tags = jieba.tag(hanzi);

    const hanziTags = tags.map(({ word, tag }) => {
        if (word.length > 1 && (tag === 'x' || (tag === 'n' && word.includes('吗')))) {
            return Array.from(word).map((char) => jieba.tag(char)[0]);
        }

        return { word, tag };
    });

    return hanziTags.flat();
};

export { getHanziTags };
