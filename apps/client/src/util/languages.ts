import { Language, OLanguage } from '@/types/translation';

const getLanguageDefaultCountry = (language: Language): string => {
  switch (language) {
    case OLanguage.English:
      return 'uk';
    case OLanguage.French:
      return 'france';
    case OLanguage.Spanish:
      return 'spain';
    default:
      return '';
  }
};

export { getLanguageDefaultCountry };
