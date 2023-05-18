import {useQuery} from 'react-query';
import {fetchSinglePhoto} from '../api/Client';

const usePhoto = (photoId: string) =>
  useQuery(['photo', photoId], () => fetchSinglePhoto(photoId));
export default usePhoto;
