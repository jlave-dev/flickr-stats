import express from 'express';
import Flickr from 'flickr-sdk';
import fs from 'fs';
import https from 'https';
import path from 'path';
import * as db from '../utils/db';

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.resolve(process.cwd(), 'src/server/public')));

const oAuth = new Flickr.OAuth(process.env.FLICKR_CONSUMER_KEY, process.env.FLICKR_CONSUMER_SECRET);
let oAuthToken;
let oAuthTokenSecret;

app.get('/api/users/:id/stats', async (req, res) => {
    const result = await db.getOrderedUserSamples(req.params.id);
    res.send(result);
});

app.get('/api/photos/all/views', async (req, res) => {
    const result = await db.pool
        .first(db.pool.raw('sampled, sum(views) as views'))
        .from('photo_samples')
        .groupByRaw('date(sampled)')
        .orderBy('sampled', 'desc');
    res.send(result);
});

app.get('/api/photos/all/views-diffs', async (req, res) => {
    const result = await db.pool
        .select(db.pool.raw('sampled_date, views, views - LAG(views) OVER (ORDER BY sampled_date) AS views_difference'))
        .from(
            db.pool.raw(`(
                SELECT
                DATE(sampled) as sampled_date,
                SUM(views) as views
                FROM photo_samples
                GROUP BY sampled_date
                ORDER BY sampled_date DESC
            ) AS x`),
        )
        .orderBy('sampled_date', 'desc');
    res.send(result);
});

app.get('/api/photos/all/photos-diffs', async (req, res) => {
    const result = await db.pool
        .select(
            db.pool.raw('sampled_date, photos, photos - LAG(photos) OVER (ORDER BY sampled_date) AS photos_difference'),
        )
        .from(
            db.pool.raw(`(
                SELECT
                DATE(sampled) as sampled_date,
                COUNT(*) as photos
                FROM photo_samples
                GROUP BY sampled_date
                ORDER BY sampled_date DESC
            ) AS x`),
        )
        .orderBy('sampled_date', 'desc');
    res.send(result);
});

app.get('/api/user/stats', async (req, res) => {
    const result = await db.pool.first().from('user_samples').orderBy('sampled', 'desc');
    res.send(result);
});

app.get('/api/photos/all/count', async (req, res) => {
    const result = await db.pool.first(db.pool.raw('count(*) as count')).from('photos');
    res.send(result);
});

app.get('/oauth/callback', async (req, res) => {
    oAuthToken = req.query.oauth_token;
    const oAuthVerifier = req.query.oauth_verifier;

    const oAuthVerifyResponse = await oAuth.verify(oAuthToken, oAuthVerifier, oAuthTokenSecret);
    oAuthToken = oAuthVerifyResponse.body.oauth_token;
    oAuthTokenSecret = oAuthVerifyResponse.body.oauth_token_secret;
    res.send();
});

const httpsOptions = {
    key: fs.readFileSync(path.resolve(process.cwd(), 'src/server/security/cert.key')),
    cert: fs.readFileSync(path.resolve(process.cwd(), 'src/server/security/cert.pem')),
};

https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`App listening at https://localhost:${port}`);
});
