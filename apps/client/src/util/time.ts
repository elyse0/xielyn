/*
 * Copyright (c) 2022, Ilya Ordin (https://gitlab.com/os-team/libs/utils)
 *
 * SPDX-License-Identifier: MIT
 */

const timeToMs = (time: string): number => {
  const t = time.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);
  if (!t) return 0;
  const s = Number(t[1]) * 3600 + Number(t[2]) * 60 + Number(t[3]);
  return s * 1000 + Number(t[4]);
};

export { timeToMs };
