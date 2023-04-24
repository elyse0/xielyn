import { Result } from 'ts-results-es'

import { HttpError, HttpService } from '@sophire/http-service'
import { VideoCaptions } from '@sophire/youtube-api'

class HanziPinyinCaptionsService {
    private static apiUrl = 'https://us-central1-amish-chinese.cloudfunctions.net/hanzi-pinyin-captions';

    static async getHanziPinyinCaptions(hanziCaptions: VideoCaptions): Promise<Result<VideoCaptions[], HttpError>> {
        return HttpService.post<VideoCaptions[]>(HanziPinyinCaptionsService.apiUrl, hanziCaptions);
    }
}

export { HanziPinyinCaptionsService }
