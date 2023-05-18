import {useInfiniteQuery} from 'react-query';
import {getPhotos} from '../api/Client';

export const useAllPhotos = () => {
  return useInfiniteQuery({
    queryKey: ['photosByPage'],
    queryFn: ({pageParam = 1}) => getPhotos(pageParam),
    getNextPageParam: lastPage => {
      if (lastPage.photos.length < 20) {
        return undefined;
      }
      return lastPage.nextPage;
    },
  });
};
