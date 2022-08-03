/*
 * Copyright (c) 2022, Ilya Ordin (https://gitlab.com/os-team/libs/utils)
 *
 * SPDX-License-Identifier: MIT
 */

import { createReadStream, unlinkSync } from 'fs'
import { createInterface } from 'readline'
import { execSync } from 'child_process'
import crypto from 'crypto'
import path from 'path'

import { Err, Ok, Result } from 'ts-results-es'
import { Caption } from '@xielyng/youtube-api'

import { timeToMs } from '@/util/time.js'

interface Options {
    executable?: string;
    outputDir?: string;
}

interface GetCaptionListError {
    message: string;
}

interface GetCaptionsError {
    message: string;
}

class YoutubeDlService {
    static executable: string = "yt-dlp"

    static async getCaptionList(
        url: string,
        options?: Options,
    ): Promise<Result<string[], GetCaptionListError>> {
        let stdout = '';

        try {
            stdout = execSync(
                `${options?.executable ?? YoutubeDlService.executable} --list-subs '${url}'`,
            ).toString();
        } catch (e) {
            return Err({
                message: "Couldn't execute command",
            });
        }

        const languages: string[] = [];

        let readingStarted = false;
        stdout.split('\n').forEach((line) => {
            if (line.includes(`Available subtitles for`)) {
                readingStarted = true;
            }
            if (readingStarted) {
                const groups = line.match(
                    /^([a-z]{2,3}(-[a-z]{2,4})?)\s+\w+/i,
                );
                if (groups) {
                    languages.push(groups[ 1 ]);
                }
            }
        });

        if (!languages.length) {
            return Err({
                message: 'There are no captions available',
            })
        }

        return Ok(languages);
    };

    static async getCaptions(
        url: string,
        language: string,
        options?: Options,
    ): Promise<Result<Caption[], GetCaptionsError>> {
        const name = crypto.randomBytes(2).toString('hex');
        const filePath = path.resolve(options?.outputDir ?? '', name);

        // Save the file with subtitles
        try {
            execSync(
                `${options?.executable ?? YoutubeDlService.executable} --write-sub --sub-lang ${language} --convert-subs vtt -o ${filePath} --skip-download '${url}'`,
            ).toString();

            const fullFilePath = `${filePath}.${language}.vtt`;

            const readline = createInterface({
                input: createReadStream(fullFilePath),
                crlfDelay: Infinity,
            });

            const captions: Caption[] = [];
            let currentCaption: Caption | undefined;

            for await (const line of readline) {
                const trimmedLine = line.trim();
                const captionTimestamp = trimmedLine.match(
                    /^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/,
                );

                if (captionTimestamp) {
                    currentCaption = {
                        text: '',
                        start: timeToMs(captionTimestamp[ 1 ]),
                        end: timeToMs(captionTimestamp[ 2 ]),
                    };
                    continue;
                }

                if (currentCaption) {
                    if (trimmedLine) {
                        currentCaption.text += `${currentCaption.text} ${trimmedLine}`.trim();
                    } else {
                        captions.push(currentCaption);
                        currentCaption = undefined;
                    }
                }
            }

            if (!captions.length) {
                return Err({
                    message: "Couldn't find captions",
                });
            }

            // Delete file
            unlinkSync(fullFilePath);

            return Ok(captions);
        } catch (e) {
            return Err({
                message: "Couldn't execute command",
            });
        }
    };
}

export { YoutubeDlService }
