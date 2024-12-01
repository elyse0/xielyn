import { Err, Ok, Result } from 'ts-results-es'

import { VideoCaptions } from '@sophire/youtube-api'
import { HttpService, HttpError } from '@sophire/http-service'

import envConfig from '@/config/env'

class SophireApiService {
    private static apiUrl = envConfig.apiServiceUrl;

    static async getAvailableYoutubeCaptions(videoId: string): Promise<Result<string[], HttpError>> {
        const response = await HttpService.get<{ languages: string[] }>(
            `${this.apiUrl}/captions/youtube/${videoId}`);
        if (response.err) {
            return Err(response.val)
        }

        return Ok(response.val.languages.sort())
    }

    static async getYoutubeCaptions(
        videoId: string,
        languageId: string,
    ): Promise<Result<VideoCaptions, HttpError>> {
        return HttpService.get<VideoCaptions>(
            `${this.apiUrl}/captions/youtube/${videoId}/${languageId}`);
    }
}

export default SophireApiService
