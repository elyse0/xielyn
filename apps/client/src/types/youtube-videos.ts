export interface Caption {
  start: number,
  end: number,
  captions: {
    en?: string
    pinyin?: string[],
    hanzi?: string[],
  }
}

export interface YoutubeVideo {
  title: string,
  captions: Caption[]
  thumbnailUrl?: string,
  offset?: number,
}
