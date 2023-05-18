import React from 'react';
import styled from 'styled-components/native';
const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  margin-vertical: 20px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${props => props.bgColor};
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
interface ButtonProps {
  onPress: () => void;
  bgColor: string;
  title: string;
}
const PressableButton = ({onPress, bgColor, title}: ButtonProps) => (
  <ButtonContainer
    onPress={onPress}
    bgColor={bgColor}
    title={title}
    testID="PressableButton">
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
export default PressableButton;
