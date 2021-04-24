import dotenv from 'dotenv';
import express from 'express';
import Flickr from 'flickr-sdk';
import fs from 'fs';
import https from 'https';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const oAuth = new Flickr.OAuth(
    process.env.FLICKR_CONSUMER_KEY,
    process.env.FLICKR_CONSUMER_SECRET,
);
let oAuthToken;
let oAuthTokenSecret;

app.get('/oauth/callback', async (req, res) => {
    oAuthToken = req.query.oauth_token;
    const oAuthVerifier = req.query.oauth_verifier;

    const oAuthVerifyResponse = await oAuth.verify(
        oAuthToken,
        oAuthVerifier,
        oAuthTokenSecret,
    );
    oAuthToken = oAuthVerifyResponse.body.oauth_token;
    oAuthTokenSecret = oAuthVerifyResponse.body.oauth_token_secret;
    res.send();
});

const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem'),
};
https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
