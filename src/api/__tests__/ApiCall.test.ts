import {getPhotos, fetchSinglePhoto} from '../Client';
import {Photo} from '../model';

describe('Fetching Tests', () => {
  it('Should return correct First Page', async () => {
    const photos = await getPhotos(1);
    expect(photos.photos.length).toBe(20);
  });
  it('Should return correct single Photo', async () => {
    const photo = await fetchSinglePhoto('6');
    expect(photo).toBeTruthy();
  });
  it('Should return single Photo url', () => {
    fetchSinglePhoto('6').then((photo: Photo) => {
      expect(photo.url).toEqual(
        expect.stringContaining('sample-photos/6.jpeg'),
      );
    });
  });
});
