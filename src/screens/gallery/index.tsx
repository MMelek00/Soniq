import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useAllPhotos} from '../../hooks/usePhotos';
import styled from 'styled-components/native';
import {DefaultTheme} from '@react-navigation/native';

import {Photo} from '../../api/model';
import GenericText, {TextType} from '../../components/genericText';
import Spacing from '../../components/spacing';
import ModalComponent from '../../components/modal';
import Container from '../../components/container';
import Image from '../../components/Image';

const PhotoList = styled(FlatList as new () => FlatList<Array<Photo>>)`
  padding: 10px;
  flex: 1;
`;

const Item = ({data, onPress}: {data: Photo; onPress: () => void}) => (
  <Pressable onPress={() => onPress()}>
    <Image url={data.url} width={22} height={35} />
  </Pressable>
);
const renderItemSeparator = () => (
  <Spacing backgroundColor={DefaultTheme.colors.background} height={16} />
);
export const GalleryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {data, isError, isSuccess, fetchNextPage, hasNextPage, isLoading} =
    useAllPhotos();
  const flattenData = data?.pages.flatMap(page => page.photos);
  // this is to fetch more data
  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  // this is to fetch more data
  const onImagePress = (photoId: string) => {
    setSelectedImage(photoId);
    setModalVisible(!modalVisible);
  };
  const renderItem: ListRenderItem<Photo> = ({item}) => (
    <Item data={item} onPress={() => onImagePress(item.id)} />
  );
  return (
    <Container>
      {isLoading && <ActivityIndicator />}
      {isError && (
        <GenericText
          type={TextType.Error}
          text="An error occurred while fetching data"
        />
      )}
      {isSuccess && (
        <>
          <PhotoList
            data={flattenData}
            renderItem={renderItem}
            keyExtractor={(item: Photo) => item.id.toString()}
            numColumns={2}
            ItemSeparatorComponent={renderItemSeparator}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={true}
            estimatedItemSize={100}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.2}
            refreshing={isLoading}
          />
        </>
      )}
      {selectedImage && modalVisible && (
        <ModalComponent
          photoId={selectedImage as string}
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
        />
      )}
    </Container>
  );
};
const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  button: {
    elevation: 2,
  },
});
export default GalleryScreen;
