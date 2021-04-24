import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(process.cwd(), `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`),
});

import updateAndSample from './update-and-sample';

updateAndSample();
