import { OLanguage } from '@/types/translation';
import { VocabularyItem } from '@/types/vocabulary';

const verbs: VocabularyItem[] = [
  {
    category: 'verbs',
    hanzi: '吃',
    pinyin: 'chī',
    translations: [
      { language: OLanguage.English, text: 'to eat' },
      { language: OLanguage.French, text: 'manger' },
      { language: OLanguage.Spanish, text: 'comer' },
    ],
    audioUrl: 'https://xielyng.s3.fr-par.scw.cloud/audios/chi1.mp3',
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-eat.png',
  },
  {
    category: 'verbs',
    hanzi: '睡觉',
    pinyin: 'shuì​jiào',
    translations: [
      { language: OLanguage.English, text: 'to sleep' },
      { language: OLanguage.French, text: 'dormir' },
      { language: OLanguage.Spanish, text: 'dormir' },
    ],
    audioUrl: 'https://xielyng.s3.fr-par.scw.cloud/audios/chi1.mp3',
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-sleep.png',
  },
  {
    category: 'verbs',
    hanzi: '吐',
    pinyin: 'tǔ',
    translations: [
      { language: OLanguage.English, text: 'to throw up' },
      { language: OLanguage.French, text: 'vomir' },
      { language: OLanguage.Spanish, text: 'vomitar' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-throw-up.png',
  },
  {
    category: 'verbs',
    hanzi: '去',
    pinyin: 'qù',
    translations: [
      { language: OLanguage.English, text: 'to go' },
      { language: OLanguage.French, text: 'aller' },
      { language: OLanguage.Spanish, text: 'go' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-go.png',
  },
  {
    category: 'verbs',
    hanzi: '追踪',
    pinyin: 'zhuī​zōng',
    translations: [
      { language: OLanguage.English, text: 'to follow' },
      { language: OLanguage.French, text: 'suivre' },
      { language: OLanguage.Spanish, text: 'seguir' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-follow.png',
  },
  {
    category: 'verbs',
    hanzi: '知道',
    pinyin: 'zhī​dào',
    translations: [
      { language: OLanguage.English, text: 'to know' },
      { language: OLanguage.French, text: 'savoir' },
      { language: OLanguage.Spanish, text: 'saber' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-know.png',
  },
  {
    category: 'verbs',
    hanzi: '报名',
    pinyin: 'bào​míng',
    translations: [
      { language: OLanguage.English, text: 'to sign up' },
      { language: OLanguage.French, text: "s'inscrire" },
      { language: OLanguage.Spanish, text: 'registrarse' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-signup.png',
  },
  {
    category: 'verbs',
    hanzi: '觉得',
    pinyin: 'jué​de',
    translations: [
      { language: OLanguage.English, text: 'to think of' },
      { language: OLanguage.French, text: 'en penser' },
      { language: OLanguage.Spanish, text: 'pensar algo' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-think.png',
  },
  {
    category: 'verbs',
    hanzi: '问',
    pinyin: 'wèn',
    translations: [
      { language: OLanguage.English, text: 'to ask' },
      { language: OLanguage.French, text: 'demander' },
      { language: OLanguage.Spanish, text: 'preguntar' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/to-ask.png',
  },
];

export default verbs;
