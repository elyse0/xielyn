const ToneMarks = [
    [ 'ā', 'ē', 'ī', 'ō', 'ū', 'ǖ', 'Ā', 'Ē', 'Ī', 'Ō', 'Ū', 'Ǖ' ],
    [ 'á', 'é', 'í', 'ó', 'ú', 'ǘ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ǘ' ],
    [ 'ǎ', 'ě', 'ǐ', 'ǒ', 'ǔ', 'ǚ', 'Ǎ', 'Ě', 'Ǐ', 'Ǒ', 'Ǔ', 'Ǚ' ],
    [ 'à', 'è', 'ì', 'ò', 'ù', 'ǜ', 'À', 'È', 'Ì', 'Ò', 'Ù', 'Ǜ' ],
    [ 'a', 'e', 'i', 'o', 'u', 'ü', 'A', 'E', 'I', 'O', 'U', 'Ü' ],
];

const getTone = (pinyin: string): number => {
    const pinyinCharacters = Array.from(pinyin);

    // Going through the four tones and checking if there is a match
    for (let i = 0; i < 4; i += 1) {
        if (ToneMarks[ i ].some((toneCharacter) => pinyinCharacters.includes(toneCharacter))) {
            return i + 1;
        }
    }
    return 5;
};

export { getTone }
