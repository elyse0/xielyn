import { getPinyin } from '@/utils/pinyin'

describe('hanzi to pinyin', () => {

    it('should convert simple hanzi', () => {
        const hanzi = '我说过我不会卖那块地的！'

        const pinyin = getPinyin(hanzi)
        const expectedPinyin = 'wǒ shuō guò wǒ bù​huì mài nà kuài dì de!'

        expect(pinyin).toEqual(expectedPinyin)
    })

    it('should convert english-chinese hanzi', () => {
        const hanzi = '这是我在Amazon上面买的灯'

        const pinyin = getPinyin(hanzi)
        const expectedPinyin = 'zhè shì wǒ zài Amazon shàng​miàn mǎi de dēng'

        expect(pinyin).toEqual(expectedPinyin)
    })

    it('should handle numbers and chinese hanzi', () => {
        const hanzi = '我有2个。他有540！50%的意思是百分之五十。'

        const pinyin = getPinyin(hanzi)
        const expectedPinyin = 'wǒ yǒu 2 gè. tā yǒu 540! 50% de yì​si shì bǎi fēn zhī wǔ shí.'

        expect(pinyin).toEqual(expectedPinyin)
    })
})
