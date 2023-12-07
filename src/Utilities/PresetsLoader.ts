import * as fs from 'fs';
import path from 'path';

import { __dirname } from '../index.js';
import ExistsCheck from './ExistsCheck.js';

export default function PresetsLoader() {
    const items = fs.readdirSync(path.join(__dirname, '..', 'presets'))
                      .filter(item => fs.statSync(path.join(__dirname, '..', 'presets', item))
                      .isDirectory())
                      .filter(item => ExistsCheck(['..', 'presets', item, 'index.html']) &&
                                      ExistsCheck(['..', 'presets', item, 'metadata.json']));

    const presets = [];

    for ( const item of items ) {
        presets.push({ container: item, index: [ __dirname, '..', 'presets', item, 'index.html' ], metadata: [ __dirname, '..', 'presets', item, 'metadata.json'], meta: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'presets', item, 'metadata.json'), 'utf-8')) });
    }

    return presets;
}