import { getMostRecentPhotoSampleByPhotoId } from '../utils/db';
import { IFlickrPhoto } from '../types';

export default async function shouldSamplePhoto(photo: IFlickrPhoto): Promise<boolean> {
    const recentSample = await getMostRecentPhotoSampleByPhotoId(photo.id);

    if (!recentSample) {
        return true;
    }

    const nowDate = new Date().toDateString();
    const lastSampledDate = recentSample.sampled.toDateString();

    return nowDate !== lastSampledDate;
}
