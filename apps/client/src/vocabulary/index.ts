import { OLanguage } from '@/types/translation';
import { VocabularyItem } from '@/types/vocabulary';

const vocabulary: VocabularyItem[] = [
  {
    category: 'general',
    hanzi: '梦',
    pinyin: 'mèng',
    translations: [
      { language: OLanguage.English, text: 'dream' },
      { language: OLanguage.French, text: 'rêve' },
      { language: OLanguage.Spanish, text: 'sueño' },
    ],
    audioUrl: 'https://www.purpleculture.net/mp3/meng4.mp3',
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/dream.png',
  },
  {
    category: 'house',
    hanzi: '房间',
    pinyin: 'fáng​jiān',
    translations: [
      { language: OLanguage.English, text: 'room' },
      { language: OLanguage.French, text: 'chambre' },
      { language: OLanguage.Spanish, text: 'habitación' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/room.png',
    audioUrl: 'https://www.purpleculture.net/mp3/meng4.mp3',
  },
  {
    category: 'house',
    hanzi: '门',
    pinyin: 'mén',
    translations: [
      { language: OLanguage.English, text: 'door' },
      { language: OLanguage.French, text: 'porte' },
      { language: OLanguage.Spanish, text: 'puerta' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/door.png',
  },
  {
    category: 'house',
    hanzi: '电灯',
    pinyin: 'diàn​dēng',
    translations: [
      { language: OLanguage.English, text: 'electric light' },
      { language: OLanguage.French, text: 'lumière électrique' },
      { language: OLanguage.Spanish, text: 'luz eléctrica' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/electric-light.png',
  },
  {
    category: 'house',
    hanzi: '开关',
    pinyin: 'kāi​guān',
    translations: [
      { language: OLanguage.English, text: 'switch' },
      { language: OLanguage.French, text: 'interrupteur' },
      { language: OLanguage.Spanish, text: 'interruptor' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/switch.png',
  },
  {
    category: 'beauty',
    hanzi: '镜子',
    pinyin: 'jìng​zi',
    translations: [
      { language: OLanguage.English, text: 'mirror' },
      { language: OLanguage.French, text: 'miroir' },
      { language: OLanguage.Spanish, text: 'espejo' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/mirror.png',
  },
  {
    category: 'numbers',
    hanzi: '一',
    pinyin: 'yī',
    translations: [
      { language: OLanguage.English, text: 'one' },
      { language: OLanguage.French, text: 'un' },
      { language: OLanguage.Spanish, text: 'uno' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/one.png',
  },
  {
    category: 'numbers',
    hanzi: '二',
    pinyin: 'èr',
    translations: [
      { language: OLanguage.English, text: 'two' },
      { language: OLanguage.French, text: 'deux' },
      { language: OLanguage.Spanish, text: 'dos' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/two.png',
  },
  {
    category: 'numbers',
    hanzi: '三',
    pinyin: 'sān',
    translations: [
      { language: OLanguage.English, text: 'three' },
      { language: OLanguage.French, text: 'trois' },
      { language: OLanguage.Spanish, text: 'tres' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/three.png',
  },
  {
    category: 'numbers',
    hanzi: '四',
    pinyin: 'sì',
    translations: [
      { language: OLanguage.English, text: 'four' },
      { language: OLanguage.French, text: 'quatre' },
      { language: OLanguage.Spanish, text: 'cuatro' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/four.png',
  },
  {
    category: 'numbers',
    hanzi: '五',
    pinyin: 'wŭ',
    translations: [
      { language: OLanguage.English, text: 'five' },
      { language: OLanguage.French, text: 'cinq' },
      { language: OLanguage.Spanish, text: 'cinco' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/five.png',
  },
  {
    category: 'numbers',
    hanzi: '六',
    pinyin: 'liù',
    translations: [
      { language: OLanguage.English, text: 'six' },
      { language: OLanguage.French, text: 'six' },
      { language: OLanguage.Spanish, text: 'seis' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/six.png',
  },
  {
    category: 'numbers',
    hanzi: '七',
    pinyin: 'qī',
    translations: [
      { language: OLanguage.English, text: 'seven' },
      { language: OLanguage.French, text: 'sept' },
      { language: OLanguage.Spanish, text: 'siete' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/seven.png',
  },
  {
    category: 'numbers',
    hanzi: '八',
    pinyin: 'bā',
    translations: [
      { language: OLanguage.English, text: 'eight' },
      { language: OLanguage.French, text: 'huit' },
      { language: OLanguage.Spanish, text: 'ocho' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/eight.png',
  },
  {
    category: 'numbers',
    hanzi: '九',
    pinyin: 'jiŭ',
    translations: [
      { language: OLanguage.English, text: 'nine' },
      { language: OLanguage.French, text: 'neuf' },
      { language: OLanguage.Spanish, text: 'nueve' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/nine.png',
  },
  {
    category: 'numbers',
    hanzi: '十',
    pinyin: 'shí',
    translations: [
      { language: OLanguage.English, text: 'ten' },
      { language: OLanguage.French, text: 'dix' },
      { language: OLanguage.Spanish, text: 'diez' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/ten.png',
  },
  {
    category: 'city',
    hanzi: '车',
    pinyin: 'chē',
    translations: [
      { language: OLanguage.English, text: 'car' },
      { language: OLanguage.French, text: 'voiture' },
      { language: OLanguage.Spanish, text: 'carro' },
    ],
    imageUrl: 'https://xielyng.s3.fr-par.scw.cloud/images/car.png',
  },
];

export default vocabulary;
