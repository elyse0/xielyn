import jieba from '@node-rs/jieba'

const getHanziSegments = (text: string): string[] => {
    return jieba.cut(text)
}

export { getHanziSegments }
