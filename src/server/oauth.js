import dotenv from 'dotenv';
import Flickr from 'flickr-sdk';
import open from 'open';

dotenv.config();

export const oAuth = new Flickr.OAuth(
    process.env.FLICKR_CONSUMER_KEY,
    process.env.FLICKR_CONSUMER_SECRET,
);

export async function getOAuthToken() {
    const res = await oAuth.request(`http://localhost:${port}/oauth/callback`);
    const requestToken = res.body.oauth_token;
    oAuthTokenSecret = res.body.oauth_token_secret;
    const url = oAuth.authorizeUrl(requestToken);
    open(url);
}
