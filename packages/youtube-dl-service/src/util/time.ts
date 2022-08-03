/*
 * Copyright (c) 2022, Ilya Ordin (https://gitlab.com/os-team/libs/utils)
 *
 * SPDX-License-Identifier: MIT
 */

const timeToMs = (time: string): number => {
    const timeMatch = time.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
    if (!timeMatch) {
        return 0;
    }
    const seconds = Number(timeMatch[ 1 ]) * 3600 + Number(timeMatch[ 2 ]) * 60 + Number(timeMatch[ 3 ]);
    return seconds * 1000 + Number(timeMatch[ 4 ]);
};

export { timeToMs }
