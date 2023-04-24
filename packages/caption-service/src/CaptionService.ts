import { Err, Ok, Result } from 'ts-results-es'

import { HttpError, HttpService } from '@sophire/http-service'
import { VideoCaptions } from '@sophire/youtube-api'

class CaptionService {
    private static youtubeUrl = 'https://youtube-subtitles-zjlkubqtfa-uc.a.run.app';

    static async getYoutubeCaptions(
        videoId: string,
        languageId: string,
    ): Promise<Result<VideoCaptions, HttpError>> {
        return HttpService.get<VideoCaptions>(`${CaptionService.youtubeUrl}/${videoId}/${languageId}`);
    }

    static async getAvailableYoutubeCaptions(videoId: string): Promise<Result<string[], HttpError>> {
        const response = await HttpService.get<{ languages: string[] }>(
            `${CaptionService.youtubeUrl}/${videoId}`);
        if (response.err) {
            return Err(response.val)
        }

        return Ok(response.val.languages.sort())
    }
}

export { CaptionService }
