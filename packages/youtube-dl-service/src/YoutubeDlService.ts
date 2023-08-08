/*
 * Copyright (c) 2022, Ilya Ordin (https://gitlab.com/os-team/libs/utils)
 *
 * SPDX-License-Identifier: MIT
 */

import { readFileSync, unlinkSync } from 'fs'
import { execSync } from 'child_process'
import crypto from 'crypto'
import path from 'path'

import { Err, Ok, Result } from 'ts-results-es'

import { Caption } from '@sophire/youtube-api'
import { subtitlesToJson } from '@sophire/subtitles-to-json'

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
            const captions = subtitlesToJson(readFileSync(fullFilePath).toString())

            // Delete file
            unlinkSync(fullFilePath);

            return captions;
        } catch (e) {
            return Err({
                message: "Couldn't execute command",
            });
        }
    };
}

export { YoutubeDlService }
