import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import JStore from 'express-session-json';
import { createProxyMiddleware } from 'http-proxy-middleware';

import ExistsCheck from './Utilities/ExistsCheck.js';
import PresetsLoader from './Utilities/PresetsLoader.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

ExistsCheck('config.json');
ExistsCheck(['..', 'presets']);

const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));
const presets = PresetsLoader();

const presetFlags = {
    1: 'Requires HTTPS',
    2: 'For testing',
    3: 'Broken'
};

const JsonStore = JStore(session);
const app = express();

const discordApiUrl = 'https://discord.com/';

const discordProxy = createProxyMiddleware({
  target: discordApiUrl, changeOrigin: true,  
});

app.use('/api', discordProxy);
app.use('/assets', discordProxy);

app.use(cookieParser(config['secret']));
app.use(session({
    secret: config['secret'],
    resave: false,
    saveUninitialized: false,
    store: new JsonStore({
        path: `${__dirname}/..`
    })
}));

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render(`${__dirname}/../views/index.ejs`, { presets: presets.map(preset => preset.meta), presetFlags });
});

app.get('/__launch', (req, res) => {
    res.redirect('/');
})

app.get('/__launch/:id', (req, res, next) => {
    req.session.pid = req.params.id;

    res.redirect('/app');
});

app.get('/__reset', async (req, res, next) => {
    await new Promise<void>((resolve, reject) => {
        req.session.destroy(function (err) {
            reject(err);
        });

        resolve();
    });

    res.redirect('/');
})

app.get('*', async (req, res, next) => {
    if (!req.session.pid) return res.redirect('/');

    const preset = presets.find(preset => String(preset.meta.id) === req.session.pid);
    if (!preset) return res.redirect('/__reset');
    
    res.sendFile(path.join(...preset.index));
});

app.listen(config['port'], () => {
    console.log('Listening on port', config['port']);
});

export { __dirname };