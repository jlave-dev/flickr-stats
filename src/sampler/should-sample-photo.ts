import { getMostRecentPhotoSampleByPhotoId } from '../utils/db';
import { FlickrAPIPhoto } from '../types';

export default async function shouldSamplePhoto(photo: FlickrAPIPhoto): Promise<boolean> {
    const recentSample = await getMostRecentPhotoSampleByPhotoId(photo.id);

    if (!recentSample) {
        return true;
    }

    const nowDate = new Date().toISOString().slice(0, 10);
    const lastSampledDate = recentSample.sampled.slice(0, 10);

    return nowDate !== lastSampledDate;
}
