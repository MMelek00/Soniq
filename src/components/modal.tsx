import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ListRenderItem,
} from 'react-native';
import usePhoto from '../hooks/usePhoto';
import styled from 'styled-components/native';
import Image from './Image';
import GenericText, {TextType} from './genericText';
import {updateCommentPhoto} from '../api/Client';
import {Comment} from '../api/model';

interface ModalProps {
  photoId: string;
  modalVisible: boolean;
  setModalVisible: () => void;
}
interface ItemProps {
  data: Comment;
  onEdit: () => void;
  onDelete: () => void;
}
const Item = ({data, onEdit, onDelete}: ItemProps) => (
  <CommentContainer>
    <Comments>
      <GenericText text={data.content} type={TextType.Normal} />
    </Comments>
    <IconContainer>
      <IconButton color="#32de84" onPress={onEdit}>
        <StyledImage source={require('../assets/edit.png')} />
      </IconButton>
      <IconButton color="#fd5c63" onPress={onDelete}>
        <StyledImage source={require('../assets/delete.png')} />
      </IconButton>
    </IconContainer>
  </CommentContainer>
);
const ModalComponent = ({
  photoId,
  modalVisible,
  setModalVisible,
}: ModalProps) => {
  const {data, isError, isSuccess, isLoading, refetch} = usePhoto(photoId);
  const [comment, setComment] = React.useState('');
  const [selectedComment, setSelectedComment] = React.useState<Comment>(
    {} as Comment,
  );

  useEffect(() => {
    if (data && data.comment) {
      setComment(data.comment);
    }
  }, [data]);

  // this is to update comment
  const updateComment = async () => {
    const tmpCommentsArray = data.comment;
    const selectedCommentIndex = tmpCommentsArray.findIndex(
      (obj: Comment) => obj.id === selectedComment.id,
    );
    tmpCommentsArray[selectedCommentIndex].content = comment;
    await updateCommentPhoto(photoId, tmpCommentsArray);
    setComment('');
    setSelectedComment({} as Comment);
    Keyboard.dismiss();
    refetch();
  };

  // this is to update comment
  const deleteComment = async (item: Comment) => {
    const tmpCommentsArray = data.comment;
    const selectedCommentIndex = tmpCommentsArray.findIndex(
      (obj: Comment) => obj.id === item.id,
    );
    tmpCommentsArray.splice(selectedCommentIndex, 1);
    await updateCommentPhoto(photoId, tmpCommentsArray);
    refetch();
  };
  const addComment = async () => {
    const tmpComments = data.comment;
    tmpComments.push({
      id: '' + Date.now(),
      content: comment,
    });
    await updateCommentPhoto(photoId, tmpComments);
    setComment('');
    Keyboard.dismiss();
    refetch();
  };
  const renderComments: ListRenderItem<Comment> = ({item}) => (
    <Item
      data={item}
      onEdit={() => {
        setSelectedComment(item);
        setComment(item.content);
      }}
      onDelete={() => deleteComment(item)}
    />
  );
  const renderItemHeader = () => (
    <>
      <Image url={data?.url as string} width={40} height={60} />
      <GenericText text="comment" type={TextType.Header} />
    </>
  );
  const renderFooterHeader = () => (
    <CommentContainer>
      <Input
        onChangeText={setComment}
        value={comment}
        placeholder="Write your Comment"
        multiline={false}
        numberOfLines={1}
        editable={true}
      />
      {selectedComment.id ? (
        <IconButton color="#32de84" onPress={updateComment}>
          <StyledImage source={require('../assets/edit.png')} />
        </IconButton>
      ) : (
        <IconButton color="#32de84" onPress={addComment}>
          <StyledImage source={require('../assets/add.png')} />
        </IconButton>
      )}
    </CommentContainer>
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible()}>
      <Container>
        <ModalContainer>
          {isLoading && <ActivityIndicator />}
          {isError && (
            <GenericText
              type={TextType.Error}
              text="An error occurred while fetching data"
            />
          )}
          {isSuccess && (
            <>
              <CloseButton onPress={setModalVisible}>
                <StyledImage source={require('../assets/cancel.png')} />
              </CloseButton>
              <CommentList
                data={data.comment as Comment[]}
                keyboardDismissMode={'none'}
                ListHeaderComponent={renderItemHeader}
                renderItem={renderComments}
                keyExtractor={(item: Comment) => item.id.toString()}
                numColumns={1}
                showsVerticalScrollIndicator={true}
              />
              {renderFooterHeader()}
            </>
          )}
        </ModalContainer>
      </Container>
    </Modal>
  );
};
const Modal = styled.Modal`
  flex: 1;
`;
const ModalContainer = styled.View`
  flex: 1;
  margin: 20px;
  border-radius: 20px;
  padding: 25px 25px 15px 25px;
  box-shadow: 0 10px 10px #000;
  background: #fff;
`;
const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
`;
const CommentList = styled(FlatList as new () => FlatList<Comment[]>)`
  padding: 10px;
  flex: 1;
`;
const IconContainer = styled.View`
  background: white;
`;
const Comments = styled.View`
  border: 1px #32a1ce;
  padding: 5px;
  border-radius: 5px;
  width: 85%;
  justify-content: center;
`;
const CommentContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
`;
const StyledImage = styled.Image`
  width: 15px;
  height: 15px;
`;
const IconButton = styled.TouchableOpacity<{color: string}>`
  background: ${props => props.color};
  padding: 5px;
  border-radius: 5px;
  justify-content: center;
  margin: 5px 5px;
  height: 30px;
`;
const CloseButton = styled.TouchableOpacity`
  background: #fd5c63;
  border-radius: 5px;
  padding: 5px;
  top: 10px;
  right: 10px;
  position: absolute;
`;
const Input = styled.TextInput`
  margin-top: 10px;
  color: black;
  border: #e5e5e5;
  border-radius: 5px;
  width: 80%;
`;

export default ModalComponent;
