import * as fs from 'fs';
import path from 'path';

import { __dirname } from '../index.js';

export default function ExistsCheck(dir: string | string[]) {
    const isArray = Array.isArray(dir);
    const pathList = [ __dirname ];

    // @ts-ignore
    if (!isArray) pathList.push(...(dir.split('/').filter(str => str)));
    else pathList.push(...dir);

    if (!fs.existsSync(path.join(...pathList))) throw new Error(`Required file/folder isn't found at ${path.join(...pathList)}`);
}