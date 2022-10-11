declare module 'hanzi-tools' {

    declare namespace HanziTools {
        interface PinyinDetails {
            pinyin: string
            pinyinSegments: string[]
            pinyinSegmentsSyllables: string[][]
            segments: string[]
        }
    }

    function pinyinify(text: string, isDetailed: boolean = false): string | HanziTools.PinyinDetails
}
