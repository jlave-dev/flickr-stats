import { nanoid } from 'nanoid';
import { IUserSample } from '../types';

export default function createUserSampleData(userSample: Omit<IUserSample, 'id' | 'sampled'>): IUserSample {
    return {
        id: nanoid(20),
        sampled: new Date(),
        ...userSample,
    };
}
