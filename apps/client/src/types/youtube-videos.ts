export interface Caption {
  start: number,
  end: number,
  captions: {
    en?: string
    pinyin?: string[],
    'zh-Hans'?: string[],
  }
}

export interface YoutubeVideo {
  title: string,
  captions: Caption[]
  thumbnailUrl?: string,
}
