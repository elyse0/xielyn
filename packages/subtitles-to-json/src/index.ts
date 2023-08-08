/*
 * Copyright (c) 2022, Ilya Ordin (https://gitlab.com/os-team/libs/utils)
 *
 * SPDX-License-Identifier: MIT
 */

import { Err, Ok, Result } from 'ts-results-es'
import srtToVtt from 'deno-srt-to-vtt'

import { Caption } from '@sophire/youtube-api'

const timeToMs = (time: string): number => {
    const timeMatch = time.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
    if (!timeMatch) {
        return 0;
    }
    const seconds = Number(timeMatch[ 1 ]) * 3600 + Number(timeMatch[ 2 ]) * 60 + Number(timeMatch[ 3 ]);
    return seconds * 1000 + Number(timeMatch[ 4 ]);
};

const subtitlesToJson = (subtitlesFile: string): Result<Caption[], { message: string }> => {
    // FIXME: Handle more subtitle formats, instead of assuming SRT
    if (!subtitlesFile.startsWith('WEBVTT')) {
        // @ts-ignore
        subtitlesFile = srtToVtt(subtitlesFile)
    }

    const lines = subtitlesFile.split('\n')

    const captions: Caption[] = [];
    let currentCaption: Caption | undefined;

    for (let line of lines) {
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
            message: "Couldn't convert captions",
        });
    }

    return Ok(captions);
}

export { subtitlesToJson }
