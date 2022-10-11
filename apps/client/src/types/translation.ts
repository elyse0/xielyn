const OLanguage = {
  English: 'english',
  French: 'french',
  Spanish: 'spanish',
} as const;

type Language = typeof OLanguage[keyof typeof OLanguage];

interface TranslationItem {
  language: Language;
  text: string;
}

export {
  OLanguage,
  Language,
  TranslationItem
};
