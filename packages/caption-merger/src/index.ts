import { uniqWith, isEqual } from 'lodash-es'

import { MergedVideoCaptions, VideoCaptions, MergedCaption } from '@sophire/youtube-api'

const getMergedVideoCaptions = (videoCaptions: VideoCaptions[]): MergedVideoCaptions[] => {
    const captions: MergedCaption[] = videoCaptions.map((languageCaptions) => languageCaptions.captions.map((item) => ({
        languageId: languageCaptions.languageId,
        ...item,
    }))).flat();

    const captionTimestamps = captions.map((caption) => ({start: caption.start, end: caption.end}));
    const uniqueCaptionTimestamps = uniqWith(captionTimestamps, isEqual);

    const sortedUniqueCaptionTimestamps = uniqueCaptionTimestamps.sort((a, b) => a.start - b.start);

    const mergedCaptions = sortedUniqueCaptionTimestamps.map((captionTimestamp) => {
        const captionsMatchingTimestamp: MergedCaption[] = captions.filter((caption) => isEqual({
            start: caption.start,
            end: caption.end,
        }, captionTimestamp));

        const captionsRecord: Record<string, string | string[]> = {};
        for (const captionsItemElement of captionsMatchingTimestamp) {
            captionsRecord[ captionsItemElement.languageId ] = captionsItemElement.text;
        }

        return {
            start: captionTimestamp.start,
            end: captionTimestamp.end,
            captions: captionsRecord,
        };
    });

    return mergedCaptions;
}

const shiftMergedVideoCaptions = (
    mergedVideoCaptions: MergedVideoCaptions[],
    shiftNumber: number
): MergedVideoCaptions[] => {
    const newMergedVideoCaptions: MergedVideoCaptions[] = [];

    for (const item of mergedVideoCaptions) {
        newMergedVideoCaptions.push({
            start: item.start + shiftNumber,
            end: item.start + shiftNumber,
            captions: item.captions,
        });
    }

    return newMergedVideoCaptions;
};

export { getMergedVideoCaptions, shiftMergedVideoCaptions }
