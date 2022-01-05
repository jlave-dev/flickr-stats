import logger from '../utils/logger';
import { insertUserSample } from '../utils/db';
import { IUserSample } from '../types';
import minimist from 'minimist';
import createUserSampleData from './create-user-sample-data';

const argv = minimist(process.argv.slice(2));

export default async function sampleUserStats(userStats: Omit<IUserSample, 'id' | 'sampled'>): Promise<void> {
    const userSample = createUserSampleData(userStats);
    logger.info(`Trying to insert user sample ${userSample.id}`);
    try {
        // if (!(await shouldSamplePhoto(photo))) {
        //     return logger.warn(`Photo ${photo.id} has already been sampled today. Skipping...`);
        // }

        if (argv['dry-run'] || process.env.DRY_RUN === 'true') {
            return logger.debug('Skipping database operation because argument --dry-run was passed');
        }
        await insertUserSample(userSample);
    } catch (error) {
        logger.error(`Could not insert user sample ${userSample.id}: ${error}`);
        throw error;
    }
}
