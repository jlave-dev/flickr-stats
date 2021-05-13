import { nanoid } from 'nanoid';
import { UserSample } from '../types';

export default function createUserSampleData(userSample: Omit<UserSample, 'id' | 'sampled'>): UserSample {
    return {
        id: nanoid(20),
        sampled: new Date().toISOString(),
        ...userSample,
    };
}
