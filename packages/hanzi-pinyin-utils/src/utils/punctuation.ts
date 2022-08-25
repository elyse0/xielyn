const EnglishReplacements: Record<string, string> = {
    '！': '!',
    '？': '?',
    '。': '.',
    '，': ',',
    '：': ':',
    '；': ';',
    '‘': '`',
    '’': "'",
    '“': '``',
    '”': '"',
    '（': '(',
    '）': ')',
    '【': '[',
    '】': ']',
};

const ChineseReplacements: Record<string, string> = {};
for (const key in EnglishReplacements) {
    ChineseReplacements[EnglishReplacements[key]] = key;
}

const getNormalizedText = (text: string, replacements: Record<string, string>): string => {
    const normalizedCharacters = Array.from(text).map((character) => {
        if (character in replacements) {
            return replacements[character];
        }
        return character;
    });

    return normalizedCharacters.join('');
};

const getNormalizedEnglishText = (text: string): string => {
    return getNormalizedText(text, EnglishReplacements);
};

const getNormalizedChineseText = (text: string): string => {
    return getNormalizedText(text, ChineseReplacements);
};

export { getNormalizedEnglishText, getNormalizedChineseText };
