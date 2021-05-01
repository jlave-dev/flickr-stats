import logger from '../utils/logger';
import { insertUser } from '../utils/db';
import { User } from './types';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

export default async function updateUser(user: User): Promise<void> {
    logger.info(`Trying to insert user ${user.id} or update it if it exists`);
    try {
        if (argv['dry-run']) {
            return logger.debug('Skipping database operation because argument --dry-run was passed');
        }
        await insertUser(user);
    } catch (error) {
        logger.error(`Could not insert user ${user.id}: ${error}`);
        throw error;
    }
}
