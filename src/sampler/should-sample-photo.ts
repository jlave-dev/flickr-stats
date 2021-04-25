import { getMostRecentPhotoSampleByPhotoId } from '../utils/db';
import { FlickrAPIPhoto } from './types';

export default async function shouldSamplePhoto(photo: FlickrAPIPhoto): Promise<boolean> {
    const recentSample = await getMostRecentPhotoSampleByPhotoId(photo.id);

    if (!recentSample) {
        return true;
    }

    const nowDate = new Date().getUTCDate();
    const lastSampledDate = new Date(recentSample.sampled).getUTCDate();

    return nowDate !== lastSampledDate;
}
