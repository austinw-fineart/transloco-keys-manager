import { readFileSync, statSync, utimesSync, writeFileSync } from 'fs';

import { stringify } from './object.utils';

export function readFile(file: string): string;
export function readFile(file: string, config: { parse: false }): string;
export function readFile(
  file: string,
  config: { parse: true },
): Record<string, any>;
export function readFile(
  file: string,
  { parse }: { parse: boolean } = { parse: false },
): string | object {
  const content = readFileSync(file, { encoding: 'utf-8' });

  if (parse) {
    return JSON.parse(content);
  }

  return content;
}

export function writeFile(
  fileName: string,
  content: object,
  preserve: boolean = false,
) {
  const stats = preserve
    ? statSync(fileName, { throwIfNoEntry: false })
    : undefined;
  writeFileSync(fileName, stringify(content), { encoding: 'utf-8' });
  if (stats) {
    utimesSync(fileName, stats.atime, stats.mtime);
  }
}
