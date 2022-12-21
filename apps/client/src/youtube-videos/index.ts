import { YoutubeVideo } from '@/types/youtube-videos';

import jmoe4Fz0sBY from './subtitles-jmoe4Fz0sBY.json';
import GNK7rPdabu8 from './subtitles-GNK7rPdabu8.json';
// eslint-disable-next-line camelcase
import GVg6vRY_vzs from './subtitles-GVg6vRY_vzs.json';
import irfd74z52Cw from './subtitles-irfd74z52Cw.json';
import j76Gz3g41jM from './subtitles-j76Gz3g41jM.json';
import NxITmnGIl7E from './subtitles-NxITmnGIl7E.json';
import R6r1B3Pxo_w from './subtitles-R6r1B3Pxo_w.json';

const youtubeVideos: Record<string, YoutubeVideo> = {
  jmoe4Fz0sBY: {
    title: '【VLOG in Chinese】Off to the US!',
    thumbnailUrl: 'http://i3.ytimg.com/vi/jmoe4Fz0sBY/hqdefault.jpg',
    captions: jmoe4Fz0sBY,
  },
  GNK7rPdabu8: {
    title: '【VLOG in Chinese】ROOM TOUR 2021',
    thumbnailUrl: 'http://i3.ytimg.com/vi/GNK7rPdabu8/hqdefault.jpg',
    captions: GNK7rPdabu8,
  },
  GVg6vRY_vzs: {
    title: 'Lunar New Year VLOG 🧨 // 一起回乡过年吧 🇲🇾 陪妈妈煮團圓飯🍡呆在家都在幹嘛？🥢🍲🥟 我的童年回憶🐶',
    thumbnailUrl: 'http://i3.ytimg.com/vi/GVg6vRY_vzs/hqdefault.jpg',
    captions: GVg6vRY_vzs,
  },
  irfd74z52Cw: {
    title: 'SK-II: Marriage Market Takeover',
    thumbnailUrl: 'http://i3.ytimg.com/vi/irfd74z52Cw/hqdefault.jpg',
    captions: irfd74z52Cw,
  },
  j76Gz3g41jM: {
    title: '【Vlog in Chinese】Heading Back to Taiwan! feat. @ABChinese',
    thumbnailUrl: 'http://i3.ytimg.com/vi/j76Gz3g41jM/hqdefault.jpg',
    captions: j76Gz3g41jM,
  },
  NxITmnGIl7E: {
      title: '【Mandarin VLOG】Helloooo Chicago!',
      thumbnailUrl: 'http://i3.ytimg.com/vi/NxITmnGIl7E/hqdefault.jpg',
      captions: NxITmnGIl7E,
  },
  R6r1B3Pxo_w: {
    title: 'You Are My Glory - EP14',
    thumbnailUrl: 'http://i3.ytimg.com/vi/R6r1B3Pxo_w/hqdefault.jpg',
    captions: R6r1B3Pxo_w,
    offset: 17321,
  },
};

export default youtubeVideos;
