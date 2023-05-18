import ApiConstants from './ApiConstants';
import RemoteData from './RemoteData';
import {Comment} from './model';

export const getPhotos = async (pageParam: number) => {
  const params = {
    page: pageParam ? pageParam : 1,
    limit: 20,
  };
  let res = await RemoteData.get(ApiConstants.PHOTOS_LIST, params);
  return {
    photos: res.data,
    nextPage: pageParam + 1,
  };
};
export const fetchSinglePhoto = async (photoId: string) => {
  const {data} = await RemoteData.get(`${ApiConstants.PHOTOS_LIST}/${photoId}`);
  return data;
};

export const updateCommentPhoto = async (photoId: string, comment: Comment) => {
  const {data} = await RemoteData.patch(
    `${ApiConstants.PHOTOS_LIST}/${photoId}`,
    {comment},
  );
  return data;
};
