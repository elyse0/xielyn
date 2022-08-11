import { getHanziSegments } from '@/segmentation'

describe('hanzi segmentation', () => {

    it('should segment hanzi text',() => {
        // This is the door to my room
        const hanzi = '这个就是我房间的门';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['这个', '就是', '我', '房间', '的', '门'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment hanzi text with punctuation',() => {
        // I told you I wouldn't sell that land!
        const hanzi = '我说过我不会卖那块地的！';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['我', '说', '过', '我', '不会', '卖', '那', '块', '地', '的', '！'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment hanzi text with in-between punctuation',() => {
        // Yes, bought it at Target
        const hanzi = '对，在Target买的';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['对', '，', '在', 'Target', '买', '的'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment chinese-english text',() => {
        // This is the light I bought on Amazon
        const hanzi = '这是我在Amazon上面买的灯';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['这', '是', '我', '在', 'Amazon', '上面', '买', '的', '灯'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment chinese-english text with punctuation',() => {
        // Seems to be at Target...
        const hanzi = '好像是在Target...';

        const segmentation = getHanziSegments(hanzi)
        // FIXME: Ideally we wouldn't want to segment every point
        const expectedSegmentation = ['好像', '是', '在', 'Target', '.', '.', '.'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment "vlog" word in chinese-english text',() => {
        // If you watched my first vlog
        const hanzi = '如果大家看了我第一个vlog';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['如果', '大家', '看', '了', '我', '第一个', 'vlog'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment date in hanzi text',() => {
        // Today is the 31st of January
        const hanzi = '今天是1月的31号';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['今天', '是', '1', '月', '的', '31', '号'];

        expect(segmentation).toEqual(expectedSegmentation);
    });

    it('should segment time in hanzi text',() => {
        // Then sleep till 10 o'clock
        const hanzi = '然后就睡到10点';

        const segmentation = getHanziSegments(hanzi)
        const expectedSegmentation = ['然后', '就', '睡', '到', '10', '点'];

        expect(segmentation).toEqual(expectedSegmentation);
    });
})
