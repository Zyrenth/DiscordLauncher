import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { fileURLToPath } from 'node:url';

import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import JStore from 'express-session-json';
import ExistsCheck from './Utilities/ExistsCheck.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

ExistsCheck('.env');
ExistsCheck('config.json');
ExistsCheck(['..', 'presets']);

dotenv.config({ path: __dirname + '/.env' });
const config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));

const JsonStore = JStore(session);
const app = express();

app.use(cookieParser(config['secret']));
app.use(session({
    secret: config['secret'],
    resave: false,
    saveUninitialized: false,
    store: new JsonStore()
}));

app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render(`${__dirname}/../views/index.ejs`, { presets: [
        {
            name: 'Early 2018',
            index: '2018',
            id: 0
        }
    ] });
});

app.listen(3455, () => {
    console.log('Listening on port 3455');
});

export { __dirname };